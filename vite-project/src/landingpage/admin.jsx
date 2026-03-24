import React, { useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

function Admin() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    party: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API}/candidate`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      // clear form
      setForm({
        name: "",
        age: "",
        party: "",
        address: "",
      });

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to add candidate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "500px" }}>
      <h3 className="text-center fw-bold mb-4">➕ Add Candidate</h3>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Name</label>
          <input
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label>Age</label>
          <input
            type="number"
            className="form-control"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label>Party</label>
          <input
            className="form-control"
            value={form.party}
            onChange={(e) => setForm({ ...form, party: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <input
            className="form-control"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
          />
        </div>

        <button
          className="btn w-100 text-white"
          style={{ backgroundColor: "#c2410c" }}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Candidate"}
        </button>

      </form>
    </div>
  );
}

export default Admin;