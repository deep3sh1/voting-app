import React, { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

function Voting() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVotes = async () => {
    try {
      const res = await axios.get(`${API}/candidate/vote/count`);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load vote data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVotes();

    // 🔥 Auto refresh every 5 sec (live effect)
    const interval = setInterval(fetchVotes, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="container py-5"
      style={{ minHeight: "calc(100vh - 52px)" }}
    >
      <h2 className="text-center fw-bold mb-4">
        📊 Live Voting Results
      </h2>

      {loading ? (
        <p className="text-center">Loading results...</p>
      ) : data.length === 0 ? (
        <p className="text-center">No votes yet</p>
      ) : (
        <div className="row g-4">
          {data.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div
                className="card border-0 h-100"
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                }}
              >
                <div className="card-body text-center">

                  {/* Icon */}
                  <div
                    className="d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(198, 90, 17, 0.1)"
                    }}
                  >
                    <i className="fa-solid fa-chart-simple"></i>
                  </div>

                  <h5 className="fw-bold">{item.party}</h5>

                  <p className="text-muted mb-2">
                    Votes: <strong>{item.count}</strong>
                  </p>

                  {/* Progress Bar */}
                  <div
                    style={{
                      height: "8px",
                      background: "#e5e7eb",
                      borderRadius: "10px",
                      overflow: "hidden"
                    }}
                  >
                    <div
                      style={{
                        width: `${item.count * 10}%`, // simple scaling
                        background: "#c2410c",
                        height: "100%"
                      }}
                    ></div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Voting;