import React, { useEffect } from "react";

const Legal = ({ type }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const isPrivacy = type === "privacy";

  return (
    <div
      style={{
        background: "#F5F5F3",
        minHeight: "100-screen",
        padding: "8rem 0",
      }}
    >
      <style>{`
        .legal-card {
          background: #FFFFFF;
          border: 1px solid #E0E0DB;
          border-radius: 32px;
          padding: 5rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.02);
        }
        .legal-header {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          color: #1A1A1A;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .legal-meta {
          font-size: 0.75rem;
          font-weight: 700;
          color: #2563EB;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 2rem;
          display: block;
        }
        .legal-section {
          margin-bottom: 4rem;
        }
        .legal-section h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 1.75rem;
          color: #1A1A1A;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .legal-section p {
          color: #5A5A5A;
          line-height: 1.8;
          font-size: 1.05rem;
          margin-bottom: 1.5rem;
        }
        .legal-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .legal-list li {
          padding-left: 1.5rem;
          position: relative;
          margin-bottom: 1rem;
          color: #5A5A5A;
          line-height: 1.6;
        }
        .legal-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 10px;
          width: 6px;
          height: 6px;
          background: #2563EB;
          border-radius: 50%;
        }
        .trust-badge {
          background: #F9F9F7;
          border: 1px solid #E0E0DB;
          padding: 1.5rem;
          border-radius: 16px;
          margin-top: 2rem;
        }
      `}</style>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.5rem" }}>
        <div className="legal-card">
          <span className="legal-meta">Compliance Document v2.4</span>
          <h1 className="legal-header">
            {isPrivacy ? "Privacy Policy" : "Terms of Service"}
          </h1>
          <p
            style={{ color: "#888", marginBottom: "4rem", fontSize: "0.9rem" }}
          >
            Last updated: May 2026. This document governs the use of the Motor
            Konnect App and Motor Desk CRM ecosystem.
          </p>

          <div className="legal-section">
            <h2>
              01. {isPrivacy ? "Data Architecture" : "Platform Licensing"}
            </h2>
            <p>
              {isPrivacy
                ? "Motor Konnect utilizes high-precision geofencing to facilitate SOS dispatch. We do not sell your movement data to third-party advertisers. Your location is encrypted and only visible to the assigned technician during an active service window."
                : "By accessing Motor Konnect, you are granted a non-exclusive, non-transferable license to use our garage discovery and booking tools. Unauthorized scraping or reverse-engineering of our technician network is strictly prohibited."}
            </p>
            <ul className="legal-list">
              <li>End-to-end encryption on all personal identifiers.</li>
              <li>Automated data purging after 12 months of inactivity.</li>
              <li>Compliance with global data protection standards.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>
              02. {isPrivacy ? "The SOS Exception" : "Emergency Usage Terms"}
            </h2>
            <p>
              In the event of an SOS trigger, certain privacy constraints are
              bypassed to ensure user safety. This includes sharing your
              real-time GPS coordinates with emergency responders and our
              verified recovery partners.
            </p>
            <div className="trust-badge">
              <p
                style={{
                  margin: 0,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#1A1A1A",
                }}
              >
                Important: Fraudulent SOS alerts or platform misuse may lead to
                permanent hardware-level bans from the Motor Konnect network.
              </p>
            </div>
          </div>

          <div className="legal-section">
            <h2>03. Direct Payment Governance</h2>
            <p>
              Our "Pay at Garage" model is designed for maximum transparency.
              Motor Konnect is a facilitator, not a payment processor for
              maintenance fees.
            </p>
            <ul className="legal-list">
              <li>
                All financial disputes must be settled directly with the garage
                owner.
              </li>
              <li>
                The price quoted in the app is an estimate; final invoices are
                issued by the service provider.
              </li>
              <li>
                Motor Konnect does not take commissions from your service total.
              </li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>04. Technician Liability</h2>
            <p>
              Every technician on our platform is vetted via the Motor Desk CRM
              verification process. However, Motor Konnect acts as a discovery
              layer and is not liable for mechanical failures or secondary
              damage occurring during service.
            </p>
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #EEE",
              margin: "4rem 0",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ color: "#888", fontSize: "0.8rem" }}>
              Questions? Reach our compliance team at <br />
              <span style={{ color: "#2563EB", fontWeight: 600 }}>
                support@motorkonnect.com
              </span>
            </div>
            <button
              onClick={() => window.print()}
              style={{
                background: "#1A1A1A",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                fontSize: "0.8rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Print Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;
