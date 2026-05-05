import React, { useEffect, useRef } from "react";
import {
  Smartphone,
  Monitor,
  ArrowRight,
  Zap,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

const Ecosystem = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: "#F5F5F3", padding: "8rem 0" }}
    >
      <style>{`
        .eco-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          color: #111827;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .eco-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1.5rem;
          margin-top: 4rem;
        }
        .eco-card {
          border-radius: 32px;
          overflow: hidden;
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          opacity: 0;
          transform: translateY(40px);
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
        }
        
        /* Motor Konnect - White Card */
        .eco-c1 { 
          grid-column: span 7; 
          background: #FFFFFF; 
          border: 1px solid #E5E7EB; 
        }
        
        /* Motor Desk - Black Card */
        .eco-c2 { 
          grid-column: span 5; 
          background: #0F172A; 
          color: #FFFFFF; 
          border: 1px solid #1E293B;
        }

        .eco-c3 { 
          grid-column: span 12; 
          background: #E5E7EB; 
          padding: 2.5rem 3rem; 
          border-radius: 24px;
        }

        @media (max-width: 1024px) {
          .eco-c1, .eco-c2 { grid-column: span 12; }
        }

        .feature-tag {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #2563EB;
          margin-bottom: 1rem;
          display: block;
        }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ maxWidth: 650 }}>
          <span className="feature-tag">Integrated Ecosystem</span>
          <h2 className="eco-title">One Unified Network.</h2>
          <p
            style={{ color: "#4B5563", fontSize: "1.125rem", lineHeight: 1.6 }}
          >
            Bridging the gap between vehicle owners and service providers with a
            real-time data layer for unmatched transparency.
          </p>
        </div>

        <div className="eco-grid">
          {/* Motor Konnect App - White Card */}
          <div className="eco-card eco-c1 animate-on-scroll">
            <div style={{ padding: "3.5rem" }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  background: "#EFF6FF",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "2rem",
                }}
              >
                <Smartphone size={22} className="text-blue-600" />
              </div>
              <h3
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "2.25rem",
                  marginBottom: "1.25rem",
                  color: "#111827",
                }}
              >
                Motor Konnect
              </h3>
              <p
                style={{
                  color: "#4B5563",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                  maxWidth: "420px",
                  marginBottom: "2.5rem",
                }}
              >
                The digital companion for drivers. Real-time booking, automated
                service history, and instant SOS dispatching.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "2rem",
                  marginBottom: "4rem",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      marginBottom: "6px",
                    }}
                  >
                    <Zap size={16} className="text-blue-600" />
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        color: "#111827",
                      }}
                    >
                      Instant SOS
                    </span>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>
                    GPS-linked recovery in minutes.
                  </p>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      marginBottom: "6px",
                    }}
                  >
                    <ShieldCheck size={16} className="text-blue-600" />
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        color: "#111827",
                      }}
                    >
                      Verified Hubs
                    </span>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>
                    Vetted and high-rated partners.
                  </p>
                </div>
              </div>

              {/* Refined Mockup Container */}
              <div
                style={{
                  background: "#F8FAFC",
                  borderRadius: "24px 24px 0 0",
                  border: "1px solid #E2E8F0",
                  borderBottom: "none",
                  height: "260px",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "180px",
                    height: "90%",
                    background: "#111827",
                    borderRadius: "24px 24px 0 0",
                    border: "4px solid #334155",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      color: "#d6d6d6",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                    }}
                  >
                    [ App Mockup ]
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Motor Desk CRM - Black Card */}
          <div
            className="eco-card eco-c2 animate-on-scroll"
            style={{ transitionDelay: "0.15s" }}
          >
            <div
              style={{
                padding: "3.5rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "2rem",
                }}
              >
                <Monitor size={22} color="#60A5FA" />
              </div>
              <h3
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "2.25rem",
                  marginBottom: "1.25rem",
                  color: "#F8FAFC",
                }}
              >
                Motor Desk
              </h3>
              <p
                style={{
                  color: "#94A3B8",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                  marginBottom: "2.5rem",
                }}
              >
                Professional CRM built specifically for garage owners to
                streamline workflow and maximize revenue.
              </p>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 3rem 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                {[
                  "Smart Inventory Control",
                  "Staff & Payroll Management",
                  "Auto-Service Retainers",
                ].map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      fontSize: "0.95rem",
                      color: "#CBD5E1",
                    }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: "rgba(37, 99, 235, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ArrowRight size={10} color="#60A5FA" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Revenue Widget */}
              <div
                style={{
                  marginTop: "auto",
                  background: "#1E293B",
                  padding: "1.5rem",
                  borderRadius: "20px",
                  border: "1px solid #334155",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.25rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#94A3B8",
                    }}
                  >
                    Daily Revenue
                  </span>
                  <BarChart3 size={16} color="#60A5FA" />
                </div>
                <div
                  style={{
                    height: "60px",
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "6px",
                  }}
                >
                  {[35, 60, 40, 85, 55, 75, 95].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        background: i === 6 ? "#2563EB" : "#334155",
                        height: `${h}%`,
                        borderRadius: "3px",
                        transition: "height 1s ease",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Integration Bar */}
          <div
            className="eco-card eco-c3 animate-on-scroll"
            style={{ transitionDelay: "0.3s" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "2rem",
              }}
            >
              <div style={{ flex: 1, minWidth: "300px" }}>
                <h4
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1.5rem",
                    marginBottom: "0.25rem",
                    color: "#111827",
                  }}
                >
                  Real-time Sync Active
                </h4>
                <p style={{ color: "#4B5563", margin: 0, fontSize: "0.95rem" }}>
                  Direct API link ensures bookings from users appear in the CRM
                  within &lt;2 seconds.
                </p>
              </div>
              <div
                style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}
              >
                <div
                  style={{
                    padding: "10px 20px",
                    background: "#FFFFFF",
                    borderRadius: "100px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    border: "1px solid #D1D5DB",
                    color: "#111827",
                  }}
                >
                  Node Status: <span style={{ color: "#059669" }}>Healthy</span>
                </div>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: "#2563EB",
                    boxShadow: "0 0 12px rgba(37, 99, 235, 0.5)",
                    animation: "pulse-anim 2s infinite",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
