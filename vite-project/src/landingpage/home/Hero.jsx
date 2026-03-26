import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="d-flex flex-column" style={{ backgroundColor: "#faf3e8" }}>

      <section className="d-flex flex-grow-1 align-items-center justify-content-center text-center py-5">

        <div>

          {/* Icon */}
          <div
            className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded"
            style={{
              height: "80px",
              width: "80px",
              backgroundColor: "rgba(198, 90, 17, 0.1)",
              borderRadius: "16px"
            }}
          >
            <i className="fa-solid fa-check-to-slot" style={{ fontSize: "32px", color: "#c65a11" }}></i>
          </div>

          {/* Title */}
          <h1 className="fw-bold mb-4" style={{ fontSize: "2.8rem", lineHeight: "1.1" }}>
            Apna Election
          </h1>

          {/* Description */}
          <p className="mx-auto mb-4 text-muted" style={{ maxWidth: "500px", fontSize: "1.1rem" }}>
            A secure, transparent online voting platform. Register with your Aadhar, cast your vote, and make your voice heard.
          </p>

          {/* Buttons */}
          <div className="d-flex flex-wrap justify-content-center gap-3">

            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="btn text-white px-4 py-2"
                style={{ backgroundColor: "#c65a11" }}
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="btn text-white px-4 py-2"
                  style={{ backgroundColor: "#c65a11" }}
                >
                  Register to Vote
                </Link>

                <Link
                  to="/login"
                  className="btn btn-outline-dark px-4 py-2"
                >
                  Login
                </Link>
              </>
            )}

          </div>

        </div>

      </section>

    </div>
  );
}

export default Hero;