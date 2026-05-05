import React, { useEffect, useRef } from "react";
import {
  Phone,
  MapPin,
  ShieldAlert,
  Zap,
  Droplets,
  Search,
  Settings,
  Truck,
  Waves,
  AlertOctagon,
  Fuel,
  FileText,
  ChevronRight,
  Activity,
  Bell,
  Radio,
} from "lucide-react";

const SOS = () => {
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

    const elements = sectionRef.current?.querySelectorAll(".sos-reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const roadside = [
    { title: "Tyre Puncture", icon: <Settings size={20} />, color: "blue" },
    { title: "Fuel Assistance", icon: <Fuel size={20} />, color: "blue" },
    { title: "Battery Jumpstart", icon: <Zap size={20} />, color: "blue" },
    { title: "Wrong Fuel", icon: <AlertOctagon size={20} />, color: "red" },
  ];

  return (
    <div ref={sectionRef} style={{ background: "#F5F5F3", minHeight: "100vh" }}>
      <style>{`
        .sos-header {
          background: #111111;
          padding: 8rem 0 10rem;
          color: white;
          position: relative;
          overflow: hidden;
        }
        .sos-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(3rem, 6vw, 4.5rem);
          line-height: 1.05;
          letter-spacing: -0.02em;
        }
        .sos-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .emergency-btn {
          background: #CC3333;
          color: white;
          padding: 1.5rem 2.5rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          text-decoration: none;
          transition: all 0.3s;
          box-shadow: 0 20px 40px rgba(204, 51, 51, 0.3);
        }
        .emergency-btn:hover {
          background: #B22D2D;
          transform: translateY(-4px);
        }
        .sos-card {
          background: white;
          border: 1px solid #E0E0DB;
          border-radius: 28px;
          padding: 2.5rem;
          height: 100%;
        }
        .sos-grid-btn {
          background: #F9F9F7;
          border: 1px solid #E0E0DB;
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.2s;
          cursor: pointer;
          width: 100%;
        }
        .sos-grid-btn:hover {
          border-color: #2563EB;
          background: white;
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
      `}</style>

      {/* Hero Header */}
      <section className="sos-header">
        <div
          style={{
            position: "absolute",
            right: "-5%",
            top: "10%",
            opacity: 0.05,
          }}
        >
          <Radio size={500} color="white" />
        </div>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 1.5rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "3rem",
            }}
          >
            <div className="sos-reveal" style={{ maxWidth: 700 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    background: "#CC3333",
                    borderRadius: "50%",
                    animation: "pulse-anim 2s infinite",
                  }}
                ></span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#888",
                  }}
                >
                  Emergency Command Center
                </span>
              </div>
              <h1 className="sos-title">
                Breakdown <br />
                Support <span style={{ color: "#2563EB" }}>Priority.</span>
              </h1>
            </div>
            <div className="sos-reveal" style={{ transitionDelay: "0.2s" }}>
              <a href="tel:8904594400" className="emergency-btn">
                <Phone size={28} fill="white" />
                <div>
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      opacity: 0.8,
                    }}
                  >
                    Emergency Hotline
                  </span>
                  <span style={{ fontSize: "1.75rem", fontWeight: 800 }}>
                    +91 89045 94400
                  </span>
                </div>
              </a>
              <p
                style={{
                  marginTop: "1rem",
                  color: "#666",
                  fontSize: "0.85rem",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                Avg. Dispatch: 12.5 Minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <div
        style={{
          maxWidth: 1280,
          margin: "-5rem auto 0",
          padding: "0 1.5rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "1.5rem",
          }}
        >
          {/* Main Roadside Card */}
          <div className="sos-reveal" style={{ gridColumn: "span 8" }}>
            <div className="sos-card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "2.5rem",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1.75rem",
                  }}
                >
                  Roadside Essentials
                </h2>
                <Zap size={24} className="text-blue-600" />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                {roadside.map((item, i) => (
                  <button key={i} className="sos-grid-btn">
                    <div
                      style={{
                        background:
                          item.color === "red" ? "#FEE2E2" : "#EFF6FF",
                        color: item.color === "red" ? "#DC2626" : "#2563EB",
                        padding: "10px",
                        borderRadius: "12px",
                      }}
                    >
                      {item.icon}
                    </div>
                    <span
                      style={{
                        fontWeight: 700,
                        color: "#1A1A1A",
                        fontSize: "0.95rem",
                      }}
                    >
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Network Load Card */}
          <div
            className="sos-reveal"
            style={{ gridColumn: "span 4", transitionDelay: "0.1s" }}
          >
            <div
              className="sos-card"
              style={{
                background: "#111",
                color: "white",
                borderColor: "#2A2A2A",
              }}
            >
              <Activity
                size={32}
                className="text-blue-500"
                style={{ marginBottom: "2rem" }}
              />
              <h3
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                Live Network
              </h3>
              <p
                style={{
                  color: "#888",
                  fontSize: "0.9rem",
                  marginBottom: "2.5rem",
                }}
              >
                84 Technicians active within 15km of your location.
              </p>

              <div
                style={{
                  background: "#222",
                  padding: "1.5rem",
                  borderRadius: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    marginBottom: "0.75rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  <span style={{ color: "#666" }}>System Load</span>
                  <span style={{ color: "#22C55E" }}>Optimized</span>
                </div>
                <div
                  style={{ height: 6, background: "#333", borderRadius: 10 }}
                >
                  <div
                    style={{
                      width: "65%",
                      height: "100%",
                      background: "#2563EB",
                      borderRadius: 10,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Mechanical Grid */}
          <div className="sos-reveal" style={{ gridColumn: "span 7" }}>
            <div className="sos-card">
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.75rem",
                  marginBottom: "2.5rem",
                }}
              >
                Mechanical & Technical
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1rem",
                }}
              >
                {[
                  { icon: <Droplets />, t: "Fluid Leak" },
                  { icon: <Search />, t: "OBD Scan" },
                  { icon: <Zap />, t: "Starter" },
                  { icon: <Settings />, t: "Clutch" },
                  { icon: <AlertOctagon />, t: "Brakes" },
                  { icon: <ShieldAlert />, t: "Dashboard" },
                ].map((item, i) => (
                  <button
                    key={i}
                    className="sos-grid-btn"
                    style={{
                      flexDirection: "column",
                      padding: "1.5rem",
                      textAlign: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div style={{ color: "#2563EB" }}>
                      {React.cloneElement(item.icon, { size: 20 })}
                    </div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                      {item.t}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recovery/Towing Card */}
          <div
            className="sos-reveal"
            style={{ gridColumn: "span 5", transitionDelay: "0.2s" }}
          >
            <div
              className="sos-card"
              style={{
                background: "#2563EB",
                color: "white",
                borderColor: "#1D4ED8",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "2rem",
                }}
              >
                <Truck size={24} />
                <h2
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1.75rem",
                  }}
                >
                  Recovery Units
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {[
                  "Wheel-Lift Towing",
                  "Flat-Bed Recovery",
                  "Flood Assistance",
                  "Accident Recovery",
                ].map((text, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      padding: "1rem 1.5rem",
                      borderRadius: "12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                      {text}
                    </span>
                    <ChevronRight size={16} />
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: "2rem",
                  padding: "1rem",
                  border: "1px dashed rgba(255,255,255,0.3)",
                  borderRadius: "12px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.75rem",
                    fontStyle: "italic",
                    opacity: 0.8,
                  }}
                >
                  Flat-bed towing is highly recommended for premium segment
                  vehicles.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Support Info */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "4rem",
            padding: "8rem 0",
          }}
        >
          {[
            {
              i: <Bell />,
              h: "Real-time Alerts",
              p: "Receive encrypted SMS updates with technician GPS coordinates and contact details.",
            },
            {
              i: <MapPin />,
              h: "Precise Geofencing",
              p: "Using ultra-wideband location data to locate your vehicle on unnamed rural routes.",
            },
            {
              i: <ShieldAlert />,
              h: "Verified Partners",
              p: "Every SOS responder is background-checked and Motor Konnect certified.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="sos-reveal"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: "white",
                  border: "1px solid #E0E0DB",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                  color: "#2563EB",
                }}
              >
                {item.i}
              </div>
              <h4
                style={{
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  marginBottom: "0.75rem",
                  color: "#1A1A1A",
                }}
              >
                {item.h}
              </h4>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#666",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {item.p}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SOS;
