import React, { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Edit state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    age: "",
    party: "",
  });

  // 🔥 Detect admin
  const token = localStorage.getItem("token");
  let isAdmin = false;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      isAdmin = payload.role === "admin";
    } catch (err) {
      console.log(err);
    }
  }

  const fetchCandidates = async () => {
    try {
      const res = await axios.get(`${API}/candidate/cadidates`);
      setCandidates(res.data.data);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to load candidates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // 🔥 Start editing
  const startEdit = (c) => {
    setEditingId(c._id);
    setEditForm({
      name: c.name,
      age: c.age,
      party: c.party || "",
    });
  };

  // 🔥 Update candidate
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${API}/candidate/${editingId}`,
        editForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      // update UI
      setCandidates((prev) =>
        prev.map((item) =>
          item._id === editingId ? res.data.data : item
        )
      );

      setEditingId(null);

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="container py-5" style={{ minHeight: "calc(100vh - 52px)" }}>
      <h2 className="mb-4 fw-bold text-center">🗳️ Candidates List</h2>

      {loading ? (
        <p className="text-center">Loading candidates...</p>
      ) : candidates.length === 0 ? (
        <p className="text-center">No candidates found</p>
      ) : (
        <div className="row g-4">
          {candidates.map((c) => (
            <div className="col-md-4" key={c._id}>
              <div
                className="card h-100 border-0"
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                }}
              >
                <div className="card-body">

                  {/* Icon */}
                  <div
                    className="d-flex align-items-center justify-content-center mb-3"
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(198, 90, 17, 0.1)",
                    }}
                  >
                    <i className="fa-solid fa-user"></i>
                  </div>

                  {/* 🔥 If editing */}
                  {editingId === c._id ? (
                    <>
                      <input
                        className="form-control mb-2"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                      />

                      <input
                        type="number"
                        className="form-control mb-2"
                        value={editForm.age}
                        onChange={(e) =>
                          setEditForm({ ...editForm, age: e.target.value })
                        }
                      />

                      <input
                        className="form-control mb-2"
                        value={editForm.party}
                        onChange={(e) =>
                          setEditForm({ ...editForm, party: e.target.value })
                        }
                      />

                      <button
                        className="btn w-100 text-white mb-2"
                        style={{ backgroundColor: "#c2410c" }}
                        onClick={handleUpdate}
                      >
                        Save
                      </button>

                      <button
                        className="btn w-100"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <h5 className="fw-bold">{c.name}</h5>

                      <p className="mb-1 text-muted">
                        <strong>Age:</strong> {c.age}
                      </p>

                      <p className="mb-1 text-muted">
                        <strong>Party:</strong> {c.party || "Independent"}
                      </p>

                      {/* Vote Button */}
                      <button
                        className="btn w-100 text-white"
                        style={{ backgroundColor: "#c2410c" }}
                        onClick={async () => {
                          try {
                            const token = localStorage.getItem("token");

                            const res = await axios.post(
                              `${API}/candidate/vote/${c._id}`,
                              {},
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              }
                            );

                            alert(res.data.message);

                          } catch (err) {
                            console.log(err);
                            alert(err.response?.data?.message || "Vote failed");
                          }
                        }}
                      >
                        Vote
                      </button>

                      {/* 🔥 Admin Controls */}
                      {isAdmin && (
                        <>
                          <button
                            className="btn w-100 mt-2"
                            style={{ backgroundColor: "#111827", color: "#fff" }}
                            onClick={() => startEdit(c)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn w-100 mt-2"
                            style={{ backgroundColor: "#000", color: "#fff" }}
                            onClick={async () => {
                              try {
                                const confirmDelete = window.confirm(`Delete ${c.name}?`);
                                if (!confirmDelete) return;

                                const token = localStorage.getItem("token");

                                const res = await axios.delete(
                                  `${API}/candidate/${c._id}`,
                                  {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  }
                                );

                                alert(res.data.message);

                                setCandidates((prev) =>
                                  prev.filter((item) => item._id !== c._id)
                                );

                              } catch (err) {
                                console.log(err);
                                alert(err.response?.data?.message || "Delete failed");
                              }
                            }}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;