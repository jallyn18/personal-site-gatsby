module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: "detect" },
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  rules: {
    // Gatsby's JSX runtime makes the React import unnecessary, and prop-types
    // are redundant for a site whose data comes from local modules.
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
  ignorePatterns: ["public/", ".cache/", "node_modules/"],
  overrides: [
    {
      files: ["tests/**/*.js"],
      env: { node: true, browser: false },
    },
  ],
};
