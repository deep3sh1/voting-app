import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  // Fetch user profile
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${API}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  // Change password
  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${API}/user/profile/password`,
        passwordForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      setShowChangePassword(false);
      setPasswordForm({ currentPassword: "", newPassword: "" });

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || "Failed to change password");
    }
  };

  return (
    <header className="sticky-top" style={{ borderBottom: "1px solid #e5e7eb", background: "#fff" }}>

      {/* Top Tricolor Line */}
      <div style={{
        height: "5px",
        background: "linear-gradient(to right, orange 33%, white 33%, white 66%, green 66%)",
      }} />

      <div
        style={{
          width: "100%",
          padding: "10px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        {/* Left Logo */}
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <i
              className="fa-solid fa-check-to-slot"
              style={{ color: "#ea580c", fontSize: "20px" }}
            ></i>

            <span
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#111827",
                letterSpacing: "-0.5px"
              }}
            >
              Apna Election
            </span>
          </div>
        </Link>

        {/* Right Side */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>

          {isLoggedIn ? (
            <>
              {/* Dashboard */}
              <Link
                to="/dashboard"
                style={{
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#111827"
                }}
              >
                Dashboard
              </Link>

              {/* Live Voting */}
              <Link
                to="/voting"
                style={{
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#111827"
                }}
              >
                Live Voting
              </Link>

              {/* Profile */}
              <div style={{ position: "relative" }}>
                <i
                  className="fa-solid fa-user"
                  style={{ fontSize: "18px", cursor: "pointer" }}
                  onClick={() => setShowProfile(!showProfile)}
                ></i>

                {showProfile && user && (
                  <div
                    style={{
                      position: "absolute",
                      top: "30px",
                      right: "0",
                      background: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      padding: "12px",
                      width: "220px",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.08)"
                    }}
                  >
                    <p><strong>{user.name}</strong></p>
                    <p style={{ fontSize: "13px" }}>Aadhar: {user.aadharNumber}</p>
                    <p style={{ fontSize: "13px" }}>Role: {user.role}</p>
                    <p style={{ fontSize: "13px" }}>Age: {user.age}</p>

                    <hr />

                    {/* Change Password Button */}
                    <button
                      onClick={() => setShowChangePassword(!showChangePassword)}
                      style={{
                        width: "100%",
                        marginBottom: "8px",
                        background: "#111827",
                        color: "#fff",
                        border: "none",
                        padding: "6px",
                        borderRadius: "6px"
                      }}
                    >
                      Change Password
                    </button>

                    {/* Change Password Form */}
                    {showChangePassword && (
                      <form onSubmit={handleChangePassword}>

                        <input
                          type="password"
                          placeholder="Current Password"
                          className="form-control mb-2"
                          value={passwordForm.currentPassword}
                          onChange={(e) =>
                            setPasswordForm({
                              ...passwordForm,
                              currentPassword: e.target.value,
                            })
                          }
                          required
                        />

                        <input
                          type="password"
                          placeholder="New Password"
                          className="form-control mb-2"
                          value={passwordForm.newPassword}
                          onChange={(e) =>
                            setPasswordForm({
                              ...passwordForm,
                              newPassword: e.target.value,
                            })
                          }
                          required
                        />

                        <button
                          type="submit"
                          style={{
                            width: "100%",
                            background: "#c2410c",
                            color: "#fff",
                            border: "none",
                            padding: "6px",
                            borderRadius: "6px"
                          }}
                        >
                          Update Password
                        </button>

                      </form>
                    )}

                    <hr />

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      style={{
                        width: "100%",
                        background: "#c2410c",
                        color: "#fff",
                        border: "none",
                        padding: "6px",
                        borderRadius: "6px"
                      }}
                    >
                      Logout
                    </button>

                  </div>
                )}
              </div>

            </>
          ) : (
            <>
              <a
                className="btn btn-outline-dark px-4 py-2"
                href="/login"
                style={{
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500"
                }}
              >
                Login
              </a>

              <a
                href="/register"
                style={{
                  backgroundColor: "#c2410c",
                  color: "#fff",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  textDecoration: "none"
                }}
              >
                Register
              </a>
            </>
          )}

        </div>
      </div>
    </header>
  );
}

export default Navbar;