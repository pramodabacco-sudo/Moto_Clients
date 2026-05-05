import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logoIcon from "../assets/IconOnly_Transparent.png";

const Layout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/sos", label: "Emergency SOS", highlight: true },
  ];

  return (
    <div
      className="min-h-screen bg-[#F5F5F3] text-[#1A1A1A]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=DM+Serif+Display:ital@0;1&display=swap');
        
        * { box-sizing: border-box; }
        
        .font-serif-display { font-family: 'DM Serif Display', serif; }
        .font-sans-ui { font-family: 'DM Sans', sans-serif; }

        .nav-link {
          position: relative;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: #4A4A4A;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #1A1A1A;
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: #1A1A1A; }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active { color: #1A1A1A; }
        .nav-link.active::after { width: 100%; }

        .sos-nav {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #CC3333;
          padding: 6px 14px;
          border: 1px solid #CC333330;
          border-radius: 6px;
          background: #CC333308;
          transition: all 0.2s;
        }
        .sos-nav:hover {
          background: #CC3333;
          color: white;
          border-color: #CC3333;
        }

        .cta-btn {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: #1A1A1A;
          color: #F5F5F3;
          padding: 10px 20px;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .cta-btn:hover {
          background: #2563EB;
        }

        /* Grain overlay */
        .grain-overlay::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 9999;
          opacity: 0.4;
        }

        /* IMPROVED FOOTER LINK STYLES */
        .footer-link {
          font-size: 0.875rem;
          color: #94A3B8; /* Light grayish-white for better visibility */
          letter-spacing: 0.01em;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .footer-link:hover { 
          color: #FFFFFF; /* Pure white on hover */
          transform: translateX(4px);
        }

        /* Mobile menu */
        .mobile-menu {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: #F5F5F3;
          z-index: 100;
          display: flex;
          flex-direction: column;
          padding: 2rem;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mobile-menu.open { transform: translateX(0); }
      `}</style>

      <div className="grain-overlay">
        {/* Navigation */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
          style={{
            background: scrolled
              ? "rgba(245, 245, 243, 0.95)"
              : "rgba(245, 245, 243, 0.8)",
            backdropFilter: "blur(12px)",
            borderBottom: scrolled
              ? "1px solid #E5E5E0"
              : "1px solid transparent",
          }}
        >
          <div
            className="max-w-7xl mx-auto px-6 flex items-center justify-between"
            style={{ height: "72px" }}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <div
                className="flex items-center justify-center "
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  //   overflow: "hidden", // Ensures the image stays inside the rounded corners
                }}
              >
                {/* Use the imported variable here */}
                <img
                  src={logoIcon}
                  alt="MotorKonnect Logo"
                  style={
                    {
                      // width: "100%",
                      // height: "100%",
                      // objectFit: "contain",
                    }
                  }
                />
              </div>
              <span
                className="font-serif-display text-xl tracking-tight"
                style={{ color: "#1A1A1A", letterSpacing: "-0.01em" }}
              >
                Motor<span style={{ color: "#2563EB" }}> Konnect</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) =>
                link.highlight ? (
                  <Link key={link.to} to={link.to} className="sos-nav">
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`nav-link ${location.pathname === link.to ? "active" : ""}`}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button className="cta-btn">Get App</button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span
                style={{
                  width: 22,
                  height: 1.5,
                  background: "#1A1A1A",
                  display: "block",
                  transform: menuOpen
                    ? "rotate(45deg) translateY(5px)"
                    : "none",
                  transition: "transform 0.2s",
                }}
              />
              <span
                style={{
                  width: 22,
                  height: 1.5,
                  background: "#1A1A1A",
                  display: "block",
                  opacity: menuOpen ? 0 : 1,
                  transition: "opacity 0.2s",
                }}
              />
              <span
                style={{
                  width: 22,
                  height: 1.5,
                  background: "#1A1A1A",
                  display: "block",
                  transform: menuOpen
                    ? "rotate(-45deg) translateY(-5px)"
                    : "none",
                  transition: "transform 0.2s",
                }}
              />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <div className="flex justify-between items-center mb-12">
            <span className="font-serif-display text-xl">MotorKonnect</span>
            <button
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: 28, lineHeight: 1 }}
            >
              ×
            </button>
          </div>
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  fontSize: "2rem",
                  fontFamily: "'DM Serif Display', serif",
                  color: link.highlight ? "#CC3333" : "#1A1A1A",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto">
            <button className="cta-btn w-full text-center py-4">
              Download App
            </button>
          </div>
        </div>

        {/* Page Content */}
        <main style={{ paddingTop: "72px" }}>{children}</main>

        {/* Footer */}
        <footer
          style={{
            background: "#0F172A",
            color: "#F8FAFC",
            borderTop: "1px solid #1E293B",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-2">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5">
                  <div
                    className="flex items-center justify-center p-1"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      backgroundColor:"white",
                        overflow: "hidden", // Ensures the image stays inside the rounded corners
                    }}
                  >
                    {/* Use the imported variable here */}
                    <img
                      src={logoIcon}
                      alt="MotorKonnect Logo"
                      style={
                        {
                          // width: "100%",
                          // height: "100%",
                          // objectFit: "contain",
                        }
                      }
                    />
                  </div>
                  <span
                    className="font-serif-display text-xl tracking-tight"
                    style={{ color: "#ffffff", letterSpacing: "-0.01em" }}
                  >
                    Motor<span style={{ color: "#2563EB" }}> Konnect</span>
                  </span>
                </Link>
                <p
                  style={{
                    color: "#94A3B8",
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    maxWidth: 320,
                  }}
                >
                  India's premier architected automotive network. Bridging the
                  gap between elite service hubs and modern vehicle owners.
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#ffffff",
                    marginBottom: 24,
                  }}
                >
                  Ecosystem
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    ["Home", "/"],
                    ["Services", "/services"],
                    ["Emergency SOS", "/sos"],
                  ].map(([label, to]) => (
                    <Link key={to} to={to} className="footer-link">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#ffffff",
                    marginBottom: 24,
                  }}
                >
                  Legal & Trust
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    ["Privacy Policy", "/privacy"],
                    ["Terms of Service", "/terms"],
                    ["Partner Portals", "/sos"],
                  ].map(([label, to]) => (
                    <Link key={to} to={to} className="footer-link">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                borderTop: "1px solid #1E293B",
                paddingTop: 32,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <p style={{ color: "#cfcfcf", fontSize: "0.85rem", margin: 0 }}>
                © {new Date().getFullYear()} Abacco Technology. All rights
                reserved.
              </p>
              <div style={{ display: "flex", gap: "24px" }}>
                {/* <p style={{ color: "#475569", fontSize: "0.8rem", margin: 0 }}>
                  CIN: U74999MH2024PTC000001
                </p> */}
                <p style={{ color: "#cfcfcf", fontSize: "0.8rem", margin: 0 }}>
                  Made with excellence in India
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
