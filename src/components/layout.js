import React from "react";
import { Link } from "gatsby";

import profile from "../data/profile";
import "../styles/global.css";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Resume", to: "/resume/" },
  { label: "Projects", to: "/projects/" },
  { label: "How this ships", to: "/pipeline/" },
];

const Layout = ({ children }) => {
  const footerLinks = profile.links.filter((link) => link.primary);

  return (
    <div className="page">
      {/* Keyboard users should not have to tab through the nav on every page. */}
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="wrap">
          <Link to="/" className="brand">
            {profile.name}
          </Link>
          <nav className="nav" aria-label="Primary">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} activeClassName="active">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main id="main">
        <div className="wrap">{children}</div>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <div>
            <div>
              &copy; {new Date().getFullYear()} {profile.name}
            </div>
            <div className="small" style={{ marginTop: "0.35rem" }}>
              Built with Gatsby, deployed to AWS by{" "}
              <a href={profile.repositories.automation}>Terraform and GitHub Actions</a>
              .
            </div>
          </div>

          <div className="footer-links">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
