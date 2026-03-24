import React from "react";
const API = import.meta.env.VITE_API_URL;

function Features() {
  const features = [
    {
      icon: "fa-shield-halved",
      title: "Secure Voting",
      desc: "One vote per Aadhar — tamper-proof and auditable",
    },
    {
      icon: "fa-user-plus",
      title: "Easy Registration",
      desc: "Register with your Aadhar number in seconds",
    },
    {
      icon: "fa-circle-check",
      title: "Transparent Results",
      desc: "Real-time vote tallying visible to administrators",
    },
  ];

  return (
    <section className="border-top py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container text-center">

        <div className="row justify-content-center">
          {features.map((f, i) => (
            <div className="col-md-4 mb-4" key={i}>
              
              {/* Icon Box */}
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(198, 90, 17, 0.1)",
                }}
              >
                <i
                  className={`fa-solid ${f.icon}`}
                  style={{ color: "#c2410c", fontSize: "20px" }}
                ></i>
              </div>

              {/* Title */}
              <h5 className="fw-semibold">{f.title}</h5>

              {/* Description */}
              <p className="text-muted" style={{ fontSize: "14px" }}>
                {f.desc}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;