import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const statsRef = useRef(null);

  const stats = [
    { value: "50K+", label: "Verified Garages" },
    { value: "98%", label: "Response Rate" },
    { value: "12.5m", label: "Avg. Dispatch" },
    { value: "180+", label: "Cities Covered" },
  ];

  return (
    <section
      style={{
        background: "#F5F5F3",
        paddingTop: "4rem",
        paddingBottom: "0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: #EAEAE6;
          border: 1px solid #D8D8D2;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #4A4A4A;
          margin-bottom: 24px;
        }
        .pulse-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #2563EB;
          animation: pulse-anim 2s infinite;
        }
        @keyframes pulse-anim {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        .hero-heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(3rem, 6vw, 5.5rem);
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: #1A1A1A;
          margin-bottom: 1.5rem;
        }
        .hero-heading em {
          font-style: italic;
          color: #2563EB;
        }
        .hero-body {
          font-size: 1.0625rem;
          line-height: 1.75;
          color: #5A5A5A;
          max-width: 440px;
          margin-bottom: 2.5rem;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1A1A1A;
          color: #F5F5F3;
          padding: 14px 28px;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-primary:hover { background: #2563EB; transform: translateY(-1px); }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #CC3333;
          padding: 14px 28px;
          border-radius: 10px;
          border: 1.5px solid #CC333340;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-secondary:hover { background: #CC3333; color: white; border-color: #CC3333; }

        .hero-image-wrap {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #E0E0DB;
          box-shadow: 0 24px 80px rgba(0,0,0,0.10);
        }
        .hero-image-wrap img {
          width: 100%;
          height: 480px;
          object-fit: cover;
          display: block;
        }
        .hero-floating-card {
          position: absolute;
          bottom: 24px;
          left: 24px;
          background: rgba(245, 245, 243, 0.92);
          backdrop-filter: blur(16px);
          border: 1px solid #E0E0DB;
          border-radius: 12px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .hero-floating-card-sos {
          position: absolute;
          top: 24px;
          right: 24px;
          background: #CC3333;
          border-radius: 10px;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .stats-bar {
          border-top: 1px solid #E5E5E0;
          margin-top: 5rem;
          padding: 2rem 0;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 640px) {
          .stats-bar { grid-template-columns: repeat(2, 1fr); }
        }
        .stat-item {
          padding: 1.5rem;
          border-right: 1px solid #E5E5E0;
          text-align: center;
        }
        .stat-item:last-child { border-right: none; }
        .stat-value {
          font-family: 'DM Serif Display', serif;
          font-size: 2rem;
          color: #1A1A1A;
          line-height: 1;
          margin-bottom: 4px;
        }
        .stat-label {
          font-size: 0.75rem;
          color: #888;
          letter-spacing: 0.04em;
          font-weight: 500;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-image-wrap img { height: 340px; }
        }
      `}</style>

      <div className="hero-grid">
        {/* Left */}
        <div>
          <div className="hero-tag">
            <span className="pulse-dot"></span>
            Real-time Garage Discovery Active
          </div>
          <h1 className="hero-heading">
            Your Complete
            <br />
            Vehicle <em>Service</em>
            <br />& SOS Support.
          </h1>
          <p className="hero-body">
            Find verified local garages instantly. Experience a transparent "Pay
            at Garage" model with 24/7 roadside emergency assistance across 180+
            cities.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <Link to="/services" className="btn-primary">
              Explore Services
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  d="M8 3l5 5-5 5M3 8h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </Link>
            <Link to="/sos" className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M8 5v3l2 2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Emergency SOS
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="hero-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200"
            alt="Modern Vehicle Service"
          />
          <div className="hero-floating-card">
            <div
              style={{
                width: 36,
                height: 36,
                background: "#2563EB",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 4v5l3 3"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#1A1A1A",
                  margin: 0,
                }}
              >
                84 Technicians Active
              </p>
              <p style={{ fontSize: "0.7rem", color: "#888", margin: 0 }}>
                Within 15km of your location
              </p>
            </div>
          </div>
          <div className="hero-floating-card-sos">
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "white",
                display: "inline-block",
                animation: "pulse-anim 1.5s infinite",
              }}
            ></span>
            SOS Live
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="stats-bar" ref={statsRef}>
          {stats.map((s, i) => (
            <div className="stat-item" key={i}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
