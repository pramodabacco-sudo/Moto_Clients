import React, { useEffect, useRef } from "react";

const BentoSOS = () => {
  const ref = useRef(null);

  useEffect(() => {
    const cards = ref.current?.querySelectorAll(".bento-card");
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.05 },
    );
    cards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.1}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.1}s`;
      observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "#0A0A0B", // Deepest black base
        padding: "8rem 0",
        color: "#F8FAFC",
      }}
    >
      <style>{`
        .bento-eyebrow {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #60A5FA; /* Brighter Blue */
          margin-bottom: 16px;
          display: block;
        }
        .bento-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2.5rem, 5vw, 3.75rem);
          letter-spacing: -0.02em;
          color: #FFFFFF; /* Pure White */
          line-height: 1.1;
        }
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 24px;
          margin-top: 5rem;
        }

        .bento-card {
          border-radius: 32px;
          overflow: hidden;
          background: #121214;
          border: 1px solid #9d9d9d; /* Lightened Border */
          transition: border-color 0.4s ease, transform 0.4s ease;
        }

        .bento-card:hover {
          border-color: #60A5FA;
          transform: translateY(-4px);
        }

        .bento-card-inner {
          padding: 3rem;
          height: 100%;
          min-height: 260px;
        }

        .bento-c1 { grid-column: span 7; }
        .bento-c2 { grid-column: span 5; }
        .bento-c3 { grid-column: span 4; }
        .bento-c4 { grid-column: span 4; }
        .bento-c5 { grid-column: span 4; }

        @media (max-width: 1024px) {
          .bento-c1, .bento-c2, .bento-c5 { grid-column: span 12; }
          .bento-c3, .bento-c4 { grid-column: span 6; }
        }
        @media (max-width: 640px) {
          .bento-c3, .bento-c4 { grid-column: span 12; }
        }

        .bento-icon-wrap {
          width: 52px; height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          background: rgba(96, 165, 250, 0.15);
          color: #60A5FA;
        }

        .bento-card-title {
          font-family: 'DM Serif Display', serif;
          font-size: 2rem;
          margin-bottom: 1.25rem;
          color: #FFFFFF;
          line-height: 1.2;
        }

        .bento-card-body {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #CBD5E1; /* Light Slate-White */
        }

        .btn-bento {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-top: 2.5rem;
          padding: 14px 28px;
          border-radius: 14px;
          font-size: 0.9rem;
          font-weight: 800;
          text-transform: uppercase;
          background: #FFFFFF;
          color: #0F172A;
          text-decoration: none;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
        }

        .btn-bento:hover {
          background: #60A5FA;
          color: #FFFFFF;
        }

        .live-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(34, 197, 94, 0.15);
          border: 1px solid rgba(34, 197, 94, 0.4);
          border-radius: 100px;
          padding: 8px 20px;
          font-size: 0.8rem;
          font-weight: 800;
          color: #4ADE80;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stat-box {
          padding: 16px;
          background: #1A1A1E;
          border-radius: 16px;
          margin-bottom: 12px;
          border: 1px solid #333338;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <div>
            <p className="bento-eyebrow">Emergency Infrastructure</p>
            <h2 className="bento-title">Command Center Response</h2>
          </div>
          <div className="live-badge">
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#22C55E",
                animation: "pulse-anim 1.5s infinite",
                display: "inline-block",
              }}
            ></span>
            Priority Response: 14m
          </div>
        </div>

        <div className="bento-grid">
          {/* Card 1 — Hero */}
          <div
            className="bento-card bento-c1"
            style={{ background: "linear-gradient(145deg, #2563EB, #1D4ED8)" }}
          >
            <div className="bento-card-inner" style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  right: -30,
                  top: -30,
                  opacity: 0.12,
                }}
              >
                <svg width="320" height="320" viewBox="0 0 24 24" fill="white">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  className="bento-icon-wrap"
                  style={{
                    background: "rgba(255,255,255,0.25)",
                    color: "white",
                  }}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="bento-card-title">Critical Roadside Recovery</h3>
                <p
                  className="bento-card-body"
                  style={{ color: "#EFF6FF", maxWidth: "460px" }}
                >
                  Battery restoration, emergency tyre changes, and precision
                  fuel logistics. Dispatched to your precise coordinates within
                  the Motor Konnect ecosystem.
                </p>
                <a href="/sos" className="btn-bento">
                  Activate SOS
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Card 2 — Live Network */}
          <div className="bento-card bento-c2">
            <div className="bento-card-inner">
              <div className="bento-icon-wrap">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <h3 className="bento-card-title">Real-time Grid</h3>
              <p className="bento-card-body" style={{ marginBottom: "2rem" }}>
                84 Motor Desk certified technicians active within your immediate
                radius.
              </p>

              <div
                style={{
                  marginBottom: 14,
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  color: "#94A3B8",
                  textTransform: "uppercase",
                }}
              >
                <span>Network Capacity</span>
                <span style={{ color: "#4ADE80" }}>Healthy</span>
              </div>
              <div
                style={{
                  background: "#2D2D33",
                  height: 10,
                  borderRadius: 100,
                  overflow: "hidden",
                  marginBottom: "2.5rem",
                }}
              >
                <div
                  style={{
                    width: "72%",
                    height: "100%",
                    background: "#60A5FA",
                    borderRadius: 100,
                  }}
                ></div>
              </div>

              {[
                { label: "Tyre & Battery", count: "12 Hubs", color: "#4ADE80" },
                {
                  label: "Recovery Units",
                  count: "5 Active",
                  color: "#FBBF24",
                },
              ].map((item, i) => (
                <div key={i} className="stat-box">
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: item.color,
                      }}
                    ></span>
                    <span
                      style={{
                        fontSize: "1rem",
                        color: "#F8FAFC",
                        fontWeight: 600,
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: "#94A3B8",
                    }}
                  >
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3 — Diagnostics */}
          <div className="bento-card bento-c3">
            <div className="bento-card-inner">
              <div className="bento-icon-wrap">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <h3 className="bento-card-title" style={{ fontSize: "1.6rem" }}>
                Mobile Diagnostics
              </h3>
              <p className="bento-card-body">
                Advanced system scanning to determine roadworthiness and
                structural safety.
              </p>
            </div>
          </div>

          {/* Card 4 — Towing */}
          <div className="bento-card bento-c4">
            <div className="bento-card-inner">
              <div className="bento-icon-wrap">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <h3 className="bento-card-title" style={{ fontSize: "1.6rem" }}>
                Premium Towing
              </h3>
              <p className="bento-card-body">
                Specialized flatbed transport with live GPS tracking for
                high-value vehicles.
              </p>
            </div>
          </div>

          {/* Card 5 — Location */}
          <div className="bento-card bento-c5">
            <div
              className="bento-card-inner"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2.5rem",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1, minWidth: "280px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginBottom: "1.25rem",
                  }}
                >
                  <div className="bento-icon-wrap" style={{ marginBottom: 0 }}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <h3
                    className="bento-card-title"
                    style={{ margin: 0, fontSize: "1.6rem" }}
                  >
                    Geofencing Tech
                  </h3>
                </div>
                <p className="bento-card-body">
                  Our proprietary tech layer localizes you on naming-absent
                  highways and rural corridors instantly.
                </p>
              </div>
              <div
                style={{
                  width: 240,
                  height: 130,
                  background: "#0F0F11",
                  border: "1px solid #333338",
                  borderRadius: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#60A5FA"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#F8FAFC",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                  }}
                >
                  COMMAND MAP ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Improved Footer Row */}
        <div
          style={{
            marginTop: "6rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "4rem",
            borderTop: "1px solid #d1d1d1",
            paddingTop: "5rem",
          }}
        >
          {[
            {
              title: "Command Alerts",
              body: "End-to-end encrypted SMS updates containing active technician status and live proximity.",
            },
            {
              title: "Precision Mapping",
              body: "Pinpoint localization engineered for highway recovery and rural roadside dispatch.",
            },
            {
              title: "Vetted Technicians",
              body: "Background-verified Motor Konnect partners with elite mechanical certifications.",
            },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "1.5rem" }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  background: "#121214",
                  border: "1px solid #ffffff",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: "#60A5FA",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h4
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    marginBottom: "0.75rem",
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#CBD5E1",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoSOS;
