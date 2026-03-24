import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;


function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    aadhar: "",
    age: "",
    address: "",
    password: "",
    confirm: "",
  });

  const validateAadhar = (v) => /^\d{12}$/.test(v);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fullName.trim()) return alert("Full name is required");
    if (!validateAadhar(form.aadhar)) return alert("Aadhar must be 12 digits");
    if (!form.age || form.age < 18) return alert("Age must be 18 or above");
    if (!form.address.trim()) return alert("Address is required");
    if (form.password.length < 6) return alert("Password must be at least 6 characters");
    if (form.password !== form.confirm) return alert("Passwords don't match");

    try {
      setLoading(true);

      const res = await axios.post(`${API}/user/register`, {
        name: form.fullName,
        aadharNumber: form.aadhar,
        age: form.age,
        address: form.address,
        password: form.password,
      });

      alert("Registration successful!");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" >

      <div className="card shadow p-4 mt-5 mb-5" style={{ width: "80%", height: "80%", maxWidth: "500px" }}>

        {/* Header */}
        <div className="text-center mb-3">
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

          <h4 className="fw-bold">Create Account</h4>
          <p className="text-muted">Register to participate in elections</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />
          </div>

          {/* Aadhar */}
          <div className="mb-3">
            <label className="form-label">Aadhar Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter 12-digit Aadhar"
              value={form.aadhar}
              onChange={(e) =>
                setForm({
                  ...form,
                  aadhar: e.target.value.replace(/\D/g, "").slice(0, 12),
                })
              }
              required
            />
            <small className="text-muted">{form.aadhar.length}/12 digits</small>
          </div>

          {/* Age */}
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter your age"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              required
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Min 6 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Re-enter password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn w-100 text-white"
            style={{ backgroundColor: "#c2410c" }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-center mt-3" style={{ fontSize: "14px" }}>
          Already registered?{" "}
          <a href="/login" style={{ color: "#c2410c", textDecoration: "none", fontWeight: "500" }}>
            Login here
          </a>
        </p>

      </div>
    </div>
  );
}

export default Register;