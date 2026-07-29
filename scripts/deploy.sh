#!/usr/bin/env bash
#
# Deploy from your machine. Mirrors .github/workflows/deploy.yml step for step,
# so you can publish and iterate before GitHub Actions is wired up -- and use it
# afterwards when you want a change live without waiting for CI.
#
#   ./scripts/deploy.sh              build and deploy
#   ./scripts/deploy.sh --skip-build deploy whatever is already in public/
#
# Where to deploy is read from SSM Parameter Store, exactly as the workflow does.
# Nothing about the infrastructure is hardcoded here.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

SSM_PREFIX="${SSM_PREFIX:-/personal-site}"
AWS_REGION="${AWS_REGION:-us-east-1}"
SKIP_BUILD=0

for arg in "$@"; do
  case "$arg" in
    --skip-build) SKIP_BUILD=1 ;;
    -h | --help)
      # Print the header comment, stopping at the first line that is not one,
      # so this stays correct when the header is edited.
      awk 'NR>1 && /^#/ { sub(/^# ?/, ""); print; next } NR>1 { exit }' "$0"
      exit 0
      ;;
    *)
      printf 'unknown argument: %s\n' "$arg" >&2
      exit 2
      ;;
  esac
done

bold() { printf '\033[1m%s\033[0m\n' "$*"; }
info() { printf '  %s\n' "$*"; }
die() {
  printf '\033[31merror: %s\033[0m\n' "$*" >&2
  exit 1
}
step() {
  printf '\n'
  bold "==> $*"
}

# --- preflight ----------------------------------------------------------------

step "Checking prerequisites"

command -v aws >/dev/null || die "aws CLI not found."
command -v node >/dev/null || die "node not found."

aws sts get-caller-identity >/dev/null 2>&1 ||
  die "no working AWS credentials. Run 'aws configure' or 'aws sso login' first."

info "node $(node -v)"

# --- where does this go -------------------------------------------------------

step "Resolving the deploy target"

read_param() {
  aws ssm get-parameter \
    --region "$AWS_REGION" \
    --name "${SSM_PREFIX}/$1" \
    --query 'Parameter.Value' \
    --output text 2>/dev/null ||
    die "could not read ${SSM_PREFIX}/$1. Has the infrastructure been applied yet?"
}

BUCKET="$(read_param site_bucket)"
DISTRIBUTION="$(read_param distribution_id)"
SITE_URL="$(read_param site_url)"

info "bucket       ${BUCKET}"
info "distribution ${DISTRIBUTION}"
info "url          ${SITE_URL}"

# --- build --------------------------------------------------------------------

if [ "$SKIP_BUILD" -eq 0 ]; then
  step "Building"

  if [ ! -d node_modules ]; then
    info "installing dependencies"
    npm ci
  fi

  # Feed the build the same metadata GitHub Actions would, taken from git.
  # GITHUB_ACTIONS is deliberately left unset: the commit shown will be real,
  # but the page will correctly say it was not built by a pipeline.
  GITHUB_SHA="$(git rev-parse HEAD)" \
  GITHUB_REF_NAME="$(git rev-parse --abbrev-ref HEAD)" \
  GITHUB_REPOSITORY="${GITHUB_REPOSITORY:-jallyn18/personal-site-gatsby}" \
  GITHUB_ACTOR="$(git config user.name 2>/dev/null || echo local)" \
  SITE_URL="$SITE_URL" \
  NODE_ENV=production \
    npm run build
else
  step "Skipping build"
  [ -d public ] || die "public/ does not exist. Run without --skip-build."
fi

# --- publish ------------------------------------------------------------------

# Two passes. Content-hashed assets can be cached forever; HTML and page data
# must revalidate or a visitor keeps the previous deploy until their cache
# expires.
step "Uploading immutable assets"

aws s3 sync public/ "s3://${BUCKET}/" \
  --region "$AWS_REGION" \
  --delete \
  --no-progress \
  --exclude "*.html" \
  --exclude "page-data/*" \
  --exclude "*.json" \
  --exclude "*.xml" \
  --exclude "*.txt" \
  --exclude "sw.js" \
  --cache-control "public,max-age=31536000,immutable"

step "Uploading revalidated files"

aws s3 sync public/ "s3://${BUCKET}/" \
  --region "$AWS_REGION" \
  --delete \
  --no-progress \
  --exclude "*" \
  --include "*.html" \
  --include "page-data/*" \
  --include "*.json" \
  --include "*.xml" \
  --include "*.txt" \
  --include "sw.js" \
  --cache-control "public,max-age=0,must-revalidate"

step "Invalidating CloudFront"

INVALIDATION="$(aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION" \
  --paths '/*' \
  --query 'Invalidation.Id' \
  --output text)"

info "invalidation ${INVALIDATION}"
info "waiting for it to complete (usually under a minute)"

aws cloudfront wait invalidation-completed \
  --distribution-id "$DISTRIBUTION" \
  --id "$INVALIDATION"

# --- prove it worked ----------------------------------------------------------

step "Verifying the live site serves this commit"

SHORT_SHA="$(git rev-parse --short=7 HEAD)"

for attempt in 1 2 3 4 5; do
  body="$(curl -fsSL --max-time 20 "${SITE_URL}/pipeline/" || true)"

  if printf '%s' "$body" | grep -q "$SHORT_SHA"; then
    printf '\n'
    bold "Live: ${SITE_URL}"
    info "serving ${SHORT_SHA}"
    exit 0
  fi

  info "attempt ${attempt}: ${SHORT_SHA} not visible yet, retrying in 10s"
  sleep 10
done

printf '\n'
die "deployed, but ${SHORT_SHA} never appeared at ${SITE_URL}/pipeline/.
  If the distribution was created in the last few minutes it may still be
  deploying -- check the CloudFront console and re-run with --skip-build."
