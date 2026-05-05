import React, { useEffect, useRef } from "react";
import Hero from "../components/Hero";
import BentoSOS from "../components/BentoSOS";
import StepCards from "../components/StepCards";
import Ecosystem from "../components/Ecosystem";
import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

const Home = () => {
  const scrollRef = useRef(null);

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

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: "#F5F5F3", overflow: "hidden" }}>
      <style>{`
        .section-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2.25rem, 4vw, 3rem);
          color: #1A1A1A;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .solution-card {
          border-radius: 24px;
          padding: 3.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .cta-box {
          background: #111111;
          border-radius: 40px;
          padding: 6rem 2rem;
          position: relative;
          overflow: hidden;
          border: 1px solid #2A2A2A;
          text-align: center;
        }
        .btn-glass {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          backdrop-filter: blur(10px);
          padding: 14px 32px;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s;
        }
        .btn-glass:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Problem/Solution Section */}
      <section style={{ padding: "8rem 0", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <div
            className="reveal"
            style={{ textAlign: "center", marginBottom: "5rem" }}
          >
            <p
              style={{
                color: "#2563EB",
                fontWeight: 700,
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "12px",
              }}
            >
              The Market Gap
            </p>
            <h2 className="section-title">
              Modern Solutions for <br />
              Modern Drivers
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            {/* The Challenge */}
            <div
              className="solution-card reveal"
              style={{ background: "#F9F9F7", border: "1px solid #E5E5E0" }}
            >
              <div
                style={{
                  color: "#CC3333",
                  marginBottom: "2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <AlertCircle size={32} strokeWidth={1.5} />
                <span
                  style={{
                    fontWeight: 800,
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  The Challenge
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.8rem",
                  marginBottom: "1.5rem",
                  color: "#1A1A1A",
                }}
              >
                The Frustrations of Traditional Repair
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                {[
                  "Hidden markups and opaque commission models.",
                  "Breakdowns on rural routes with no tracking.",
                  "Zero accountability for part quality or labor.",
                ].map((text, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: "12px",
                      color: "#5A5A5A",
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: "#CC3333", fontWeight: "bold" }}>
                      —
                    </span>{" "}
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* The Solution */}
            <div
              className="solution-card reveal"
              style={{
                background: "#111111",
                color: "white",
                transitionDelay: "0.2s",
              }}
            >
              <div
                style={{
                  color: "#2563EB",
                  marginBottom: "2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <CheckCircle2 size={32} strokeWidth={1.5} />
                <span
                  style={{
                    fontWeight: 800,
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  The Solution
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.8rem",
                  marginBottom: "1.5rem",
                }}
              >
                The Motor Konnect Advantage
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                {[
                  "Direct 'Pay at Garage' model with 0% platform markup.",
                  "Precision GPS dispatching for roadside SOS.",
                  "Certified 'Motor Desk' network of vetted workshops.",
                ].map((text, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: "12px",
                      color: "#A1A1A1",
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: "#2563EB", fontWeight: "bold" }}>
                      +
                    </span>{" "}
                    {text}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
                <div
                  style={{
                    padding: "12px 20px",
                    background: "#1A1A1A",
                    borderRadius: "12px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    border: "1px solid #2A2A2A",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "#2563EB",
                      fontWeight: 700,
                    }}
                  >
                    98%
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#888" }}>
                    Customer Satisfaction Rate
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How It Works */}
      <StepCards />

      {/* 4. Emergency Support */}
      <BentoSOS />

      {/* 5. Ecosystem */}
      <Ecosystem />

      {/* 6. Final CTA */}
      <section style={{ padding: "6rem 0 10rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="cta-box reveal">
            {/* Background Glow */}
            <div
              style={{
                position: "absolute",
                top: "-10%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                height: "40%",
                background:
                  "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            ></div>

            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "white",
                marginBottom: "1.5rem",
                position: "relative",
              }}
            >
              Ready to hit the road <br />
              with <em>total</em> confidence?
            </h2>
            <p
              style={{
                color: "#888",
                fontSize: "1.1rem",
                maxWidth: "600px",
                margin: "0 auto 3rem",
                lineHeight: 1.6,
              }}
            >
              Join 12,000+ drivers who have switched to a more transparent,
              reliable way of maintaining their vehicles.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <button
                style={{
                  background: "#2563EB",
                  color: "white",
                  padding: "14px 32px",
                  borderRadius: "12px",
                  fontWeight: "700",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                Download App <ArrowRight size={18} />
              </button>
              <button className="btn-glass">Partner With Us</button>
            </div>

            {/* Sub-footer inside CTA */}
            <div
              style={{
                marginTop: "4rem",
                paddingTop: "2rem",
                borderTop: "1px solid #2A2A2A",
                display: "flex",
                justifyContent: "center",
                gap: "3rem",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <p
                  style={{
                    color: "white",
                    fontWeight: 700,
                    margin: 0,
                    fontSize: "1.1rem",
                  }}
                >
                  180+
                </p>
                <p
                  style={{
                    color: "#c4c4c4",
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  Cities Covered
                </p>
              </div>
              <div style={{ textAlign: "left" }}>
                <p
                  style={{
                    color: "white",
                    fontWeight: 700,
                    margin: 0,
                    fontSize: "1.1rem",
                  }}
                >
                  24/7
                </p>
                <p
                  style={{
                    color: "#cacaca",
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  Support Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
