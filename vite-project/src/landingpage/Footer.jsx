import React from "react";

function Footer() {
  return (
    <footer className="border-top text-center py-3" style={{ fontSize: "12px", color: "#6c757d", backgroundColor: "#f8f9fa"}}>
      
      {/* Tricolor bar */}
      <div
        className="mx-auto mb-3"
        style={{
          height: "3px",
          width: "200px",
          borderRadius: "50px",
          background: "linear-gradient(to right, orange, white, green)"
        }}
      ></div>

      {/* Text */}
      <div>
        Apna Election — Secure Online Voting Platform
      </div>

    </footer>
  );
}

export default Footer;