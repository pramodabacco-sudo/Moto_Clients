import { useEffect, useRef } from "react";

const StepCards = () => {
  const steps = [
    {
      num: "01",
      title: "Discover",
      text: "Find top-rated garages near your current location using our real-time proximity engine and verified review system.",
      tag: "GPS-Powered",
    },
    {
      num: "02",
      title: "Select Service",
      text: "Choose from general maintenance to major repairs. See live pricing, technician availability, and estimated completion times.",
      tag: "Transparent Pricing",
    },
    {
      num: "03",
      title: "Book a Slot",
      text: "Real-time scheduling with instant confirmation. Receive a QR-coded booking pass and SMS reminders before your appointment.",
      tag: "Instant Confirmation",
    },
    {
      num: "04",
      title: "SOS Support",
      text: "Access 24/7 emergency roadside assistance at the tap of a button. A verified technician is dispatched to your GPS coordinates.",
      tag: "24/7 Available",
    },
    {
      num: "05",
      title: "Track Progress",
      text: "Monitor your vehicle's service status through the app with real-time updates, photo reports from the workshop, and ETA tracking.",
      tag: "Live Updates",
    },
    {
      num: "06",
      title: "Pay at Garage",
      text: "Inspect the completed work in person. Pay directly at the garage with 0% platform markup — no hidden fees, ever.",
      tag: "Zero Commission",
    },
  ];

  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".step-card");
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 },
    );
    cards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(24px)";
      card.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
      observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#F5F5F3",
        padding: "6rem 0",
        borderTop: "1px solid #E5E5E0",
      }}
    >
      <style>{`
        .steps-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 3rem;
        }
        .steps-eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #2563EB;
          margin-bottom: 8px;
        }
        .steps-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          letter-spacing: -0.02em;
          color: #1A1A1A;
          line-height: 1.15;
        }
        .step-card {
          background: #FFFFFF;
          border: 1px solid #E5E5E0;
          border-radius: 16px;
          padding: 2rem;
          position: relative;
          transition: box-shadow 0.2s, border-color 0.2s;
          cursor: default;
        }
        .step-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          border-color: #D0D0CA;
        }
        .step-num {
          font-family: 'DM Serif Display', serif;
          font-size: 3.5rem;
          color: #EAEAE6;
          line-height: 1;
          margin-bottom: 1rem;
          transition: color 0.2s;
        }
        .step-card:hover .step-num {
          color: #DBEAFE;
        }
        .step-tag {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #2563EB;
          background: #EFF6FF;
          padding: 3px 10px;
          border-radius: 100px;
          margin-bottom: 10px;
        }
        .step-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.375rem;
          color: #1A1A1A;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }
        .step-text {
          font-size: 0.875rem;
          color: #6A6A6A;
          line-height: 1.7;
        }
        .step-connector {
          position: absolute;
          top: 2.5rem;
          right: -1px;
          width: 1px;
          height: 40%;
          background: linear-gradient(to bottom, #E5E5E0, transparent);
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: #E5E5E0;
          border: 1px solid #E5E5E0;
          border-radius: 16px;
          overflow: hidden;
        }
        .step-cell {
          background: #F5F5F3;
          padding: 0;
        }
        @media (max-width: 1024px) {
          .steps-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .steps-grid { grid-template-columns: 1fr; }
          .steps-header { flex-direction: column; align-items: flex-start; gap: 12px; }
        }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <div className="steps-header">
          <div>
            <p className="steps-eyebrow">Process</p>
            <h2 className="steps-title">How It Works</h2>
          </div>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#888",
              maxWidth: 260,
              textAlign: "right",
              lineHeight: 1.6,
            }}
          >
            From discovery to final payment — a seamless, six-step experience.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step, idx) => (
            <div className="step-cell" key={idx}>
              <div
                className="step-card"
                style={{ borderRadius: 0, border: "none" }}
              >
                <div className="step-num">{step.num}</div>
                <div className="step-tag">{step.tag}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-text">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepCards;
