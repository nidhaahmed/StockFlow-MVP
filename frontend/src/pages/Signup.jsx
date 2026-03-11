import { useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    organizationName: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/auth/signup", form);

    alert("Signup successful");

    window.location.href = "/";
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f4f6",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "30px",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Create Account
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <input
            placeholder="Organization Name"
            onChange={(e) =>
              setForm({ ...form, organizationName: e.target.value })
            }
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <button
            style={{
              width: "100%",
              padding: "10px",
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Signup
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            fontSize: "14px",
          }}
        >
          Already have an account?
          <Link to="/"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
