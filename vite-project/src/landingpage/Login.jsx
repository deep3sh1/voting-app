import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "./mainpage/Dashboard";
const API = import.meta.env.VITE_API_URL;


function Login() {
  const [form, setForm] = useState({
    aadhar: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.aadhar.length !== 12) {
    return alert("Aadhar must be 12 digits");
  }

  if (form.password.length < 6) {
    return alert("Password must be at least 6 characters");
  }

  try {
    setLoading(true);

    const res = await axios.post(`${API}/user/login`, {
      aadharNumber: form.aadhar,
      password: form.password,
    });

    // store token
    localStorage.setItem("token", res.data.token);

    alert("Login successful");

    // redirect
   navigate("/dashboard"); 

  } catch (err) {
    console.log(err)
    alert(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      className="d-flex align-items-center justify-content-center px-3 py-5"
      style={{ minHeight: "calc(100vh - 52px)", background: "#f9fafb" }}
    >
      <div
        className="card border-0"
        style={{
          maxWidth: "420px",
          width: "100%",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          animation: "fadeUp 0.5s ease",
        }}
      >
        <div className="card-body text-center p-4">

          {/* Icon */}
          <div
            className="d-flex align-items-center justify-content-center mx-auto mb-2"
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "50%",
              backgroundColor: "rgba(198, 90, 17, 0.1)"
            }}
          >
            <i className="fa-solid fa-check-to-slot"></i>
          </div>

          <h3 style={{ fontWeight: "600" }}>Welcome Back</h3>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            Login with your Aadhar number
          </p>

          <form onSubmit={handleSubmit} className="mt-3 text-start">

            {/* Aadhar */}
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: "500" }}>
                Aadhar Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter 12-digit Aadhar number"
                value={form.aadhar}
                onChange={(e) =>
                  setForm({
                    ...form,
                    aadhar: e.target.value.replace(/\D/g, "").slice(0, 12),
                  })
                }
                style={{
                  borderRadius: "8px",
                  padding: "10px",
                  border: "1px solid #e5e7eb",
                }}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: "500" }}>
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                style={{
                  borderRadius: "8px",
                  padding: "10px",
                  border: "1px solid #e5e7eb",
                }}
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: "#c2410c", // primary color
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "8px",
                fontWeight: "500",
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <p style={{ marginTop: "16px", fontSize: "14px", color: "#6b7280" }}>
            New voter?{" "}
            <Link
              to="/Register"
              style={{
                color: "#c2410c",
                fontWeight: "500",
                textDecoration: "none",
              }}
            >
              Register here
            </Link>
          </p>
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Login;