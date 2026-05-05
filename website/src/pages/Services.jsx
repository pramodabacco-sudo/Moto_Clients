import React, { useEffect, useRef, useState } from "react";
import {
  Car,
  Bike,
  ShieldCheck,
  CreditCard,
  Clock,
  CheckCircle,
  Gauge,
  Zap
} from "lucide-react";

const Services = () => {
  const [activeTab, setActiveTab] = useState("car");
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
      { threshold: 0.05 },
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal-service");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeTab]);

  const carServices = [
    {
      title: "Car Services",
      tag: "Comprehensive",
      desc: "Full-vehicle diagnostics including fluids, filters, and safety checkpoints for peak performance.",
    },
    {
      title: "Denting & Painting",
      tag: "Bodywork",
      desc: "Premium refinishing using color-matching technology and factory-grade paint booth systems.",
    },
    {
      title: "AC Service & Repair",
      tag: "Cooling",
      desc: "Gas recharging, compressor diagnostics, and cabin filter cleaning for optimal temperature control.",
    },
    {
      title: "Car SPA & Cleaning",
      tag: "Hygiene",
      desc: "Deep interior sanitization and multi-stage exterior washing using eco-friendly foam technology.",
    },
    {
      title: "Tyres & Wheel care",
      tag: "Safety",
      desc: "Precision balancing, 3D alignment, and high-performance tyre replacements for maximum grip.",
    },
    {
      title: "Detailing Services",
      tag: "Elite",
      desc: "Ceramic coating, paint protection films, and leather restoration for showroom-quality finishes.",
    },
    {
      title: "Batteries",
      tag: "Electrical",
      desc: "Voltage testing and authorized battery replacements with nationwide warranty coverage.",
    },
    {
      title: "Car Inspections",
      tag: "Audit",
      desc: "Thorough 150-point pre-purchase or safety inspections with detailed digital reports.",
    },
    {
      title: "Clutch & Body Parts",
      tag: "Mechanical",
      desc: "Expert assembly and repair of transmission systems and external structural components.",
    },
    {
      title: "Windshield & Lights",
      tag: "Visibility",
      desc: "Crystal clear glass replacement and LED/Halogen illumination alignment and repair.",
    },
    {
      title: "Suspension & Fitments",
      tag: "Chassis",
      desc: "Shock absorber replacement and bush diagnostics for a smooth, vibration-free ride.",
    },
    {
      title: "Insurance Claims",
      tag: "Support",
      desc: "End-to-end cashless claim facilitation through our Motor Desk network partners.",
    },
  ];

  const bikeServices = [
    {
      title: "Engine Maintenance",
      tag: "Core",
      desc: "Optimized oil changes and valve adjustments for maximum power delivery and longevity.",
    },
    {
      title: "Transmission & Clutch",
      tag: "Drive",
      desc: "Chain lubrication, sprocket replacement, and clutch plate calibration for smooth shifting.",
    },
    {
      title: "Fuel System",
      tag: "Combustion",
      desc: "Carburetor cleaning or injector diagnostics for improved mileage and throttle response.",
    },
    {
      title: "Brake System",
      tag: "Safety",
      desc: "Brake pad replacement and hydraulic fluid bleeding for instant stopping power.",
    },
    {
      title: "Electrical System",
      icon: <Zap />,
      tag: "Wiring",
      desc: "Harness diagnostics, spark plug replacement, and lighting circuit repairs.",
    },
    {
      title: "Suspension",
      tag: "Stability",
      desc: "Fork oil replacement and rear mono-shock adjustment for improved cornering stability.",
    },
    {
      title: "Engine Repair",
      tag: "Major",
      desc: "Complete engine overhaul and precision re-boring using certified Motor Konnect parts.",
    },
    {
      title: "Exterior Cleaning",
      tag: "Care",
      desc: "Pressure washing and chain-safe degreasing to maintain aesthetics and part life.",
    },
    {
      title: "Premium Detailing",
      tag: "Premium",
      desc: "Teflon coating and buffing for motorcycles to prevent oxidation and road grime buildup.",
    },
    {
      title: "Battery Service",
      tag: "Power",
      desc: "Charging system analysis and heavy-duty battery installations for high-cc engines.",
    },
    {
      title: "Tyre Service",
      tag: "Grip",
      desc: "Performance tyre fitment and nitrogen inflation for better high-speed heat management.",
    },
    {
      title: "General Inspection",
      tag: "Standard",
      desc: "Quick-check for daily commuters ensuring essential lights, brakes, and fluids are safe.",
    },
  ];

  return (
    <div ref={sectionRef} style={{ background: "#FFFFFF", minHeight: "100vh" }}>
      <style>{`
        .service-title { font-family: 'DM Serif Display', serif; font-size: clamp(2.5rem, 6vw, 4.25rem); color: #111827; letter-spacing: -0.02em; line-height: 1.1; }
        .reveal-service { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1); }
        .tab-btn { padding: 14px 28px; border-radius: 100px; font-weight: 700; font-size: 0.8rem; cursor: pointer; transition: all 0.3s; border: 1px solid #E5E7EB; background: #FFFFFF; color: #6B7280; display: flex; align-items: center; gap: 10px; text-transform: uppercase; letter-spacing: 0.05em; }
        .tab-btn.active { background: #111827; color: #FFFFFF; border-color: #111827; }
        
        .service-grid { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid #E5E7EB; border-radius: 20px; overflow: hidden; background: #FFFFFF; }
        .service-item { padding: 3rem 2.5rem; border: 0.5px solid #E5E7EB; transition: all 0.3s ease; display: flex; flexDirection: column; }
        .service-item:hover { background: #F9FAFB; }
        
        .number-label { font-family: 'DM Serif Display', serif; font-size: 3.5rem; color: #E5E7EB; margin-bottom: 1rem; line-height: 1; }
        .info-pill { background: #EFF6FF; color: #2563EB; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 10px; border-radius: 100px; display: inline-block; margin-bottom: 1.25rem; }
        .item-title { font-family: 'DM Serif Display', serif; font-size: 1.75rem; color: #111827; margin-bottom: 1rem; }
        .item-desc { color: #6B7280; font-size: 0.9rem; line-height: 1.6; margin: 0; }

        @media (max-width: 1024px) { .service-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .service-grid { grid-template-columns: 1fr; } }

        .trust-feature-dark { display: flex; gap: 1.25rem; align-items: flex-start; padding: 1.75rem; background: #1E293B; border-radius: 20px; border: 1px solid #334155; }
      `}</style>

      {/* Header */}
      <section style={{ padding: "8rem 0 4rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="reveal-service">
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#2563EB",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              Network Capabilities
            </span>
            <h1
              className="service-title"
              style={{ marginTop: "1rem", marginBottom: "3rem" }}
            >
              Expert Solutions for <br />
              Every <em>Component</em>.
            </h1>

            <div style={{ display: "flex", gap: "16px", marginBottom: "4rem" }}>
              <button
                className={`tab-btn ${activeTab === "car" ? "active" : ""}`}
                onClick={() => setActiveTab("car")}
              >
                <Car size={18} /> Car Services
              </button>
              <button
                className={`tab-btn ${activeTab === "bike" ? "active" : ""}`}
                onClick={() => setActiveTab("bike")}
              >
                <Bike size={18} /> Bike Services
              </button>
            </div>
          </div>

          {/* Screenshot-Matched Grid */}
          <div className="service-grid reveal-service">
            {(activeTab === "car" ? carServices : bikeServices).map((s, i) => (
              <div key={`${activeTab}-${i}`} className="service-item">
                <div className="number-label">
                  {(i + 1).toString().padStart(2, "0")}
                </div>
                <div>
                  <div className="info-pill">{s.tag}</div>
                  <h3 className="item-title">{s.title}</h3>
                  <p className="item-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Contrast Trust Center (Matches Motor Desk aesthetic) */}
      <section style={{ padding: "4rem 0 8rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <div
            className="reveal-service"
            style={{
              background: "#0F172A",
              borderRadius: "40px",
              padding: "5rem",
              border: "1px solid #1E293B",
              color: "#FFFFFF",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "5rem",
                alignItems: "center",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "2.75rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  Direct Booking. <br />
                  Direct Trust.
                </h2>
                <p
                  style={{
                    color: "#94A3B8",
                    marginBottom: "3.5rem",
                    lineHeight: 1.75,
                    fontSize: "1.1rem",
                  }}
                >
                  Our Pay-at-Garage model eliminates hidden markups. As an
                  architected network, we bridge the gap between verified hubs
                  and drivers.
                </p>
                <div style={{ display: "grid", gap: "1.25rem" }}>
                  <div className="trust-feature-dark">
                    <CheckCircle size={22} color="#60A5FA" />
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontWeight: 700,
                          fontSize: "1rem",
                          color: "#F8FAFC",
                        }}
                      >
                        0% User Markup
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.875rem",
                          color: "#64748B",
                          marginTop: "4px",
                        }}
                      >
                        Standardized pricing with zero platform commissions for
                        users.
                      </p>
                    </div>
                  </div>
                  <div className="trust-feature-dark">
                    <CreditCard size={22} color="#60A5FA" />
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontWeight: 700,
                          fontSize: "1rem",
                          color: "#F8FAFC",
                        }}
                      >
                        Post-Service Payment
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.875rem",
                          color: "#64748B",
                          marginTop: "4px",
                        }}
                      >
                        Inspect the results at the garage before settling your
                        bill directly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ position: "relative" }}>
                <div
                  style={{
                    background:
                      "linear-gradient(145deg, #2563EB 0%, #1D4ED8 100%)",
                    padding: "4rem",
                    borderRadius: "32px",
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      background: "rgba(255,255,255,0.15)",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "2rem",
                    }}
                  >
                    <Gauge size={28} color="#FFFFFF" />
                  </div>
                  <h4
                    style={{
                      fontSize: "1.85rem",
                      fontFamily: "'DM Serif Display', serif",
                      marginBottom: "1.25rem",
                    }}
                  >
                    Motor Desk Integration
                  </h4>
                  <p
                    style={{
                      color: "#BFDBFE",
                      fontSize: "1.05rem",
                      lineHeight: 1.6,
                      marginBottom: "2.5rem",
                    }}
                  >
                    Experience real-time bay availability and technician
                    dispatching through our proprietary CRM layer.
                  </p>
                  <button
                    style={{
                      background: "#FFFFFF",
                      color: "#1D4ED8",
                      padding: "12px 24px",
                      borderRadius: "12px",
                      border: "none",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                    }}
                  >
                    EXPLORE PARTNER HUBS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
