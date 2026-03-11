import { useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await api.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);

    window.location.replace("/dashboard");
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
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          StockFlow Login
        </h2>

        <form onSubmit={handleLogin}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button style={loginBtn}>Login</button>
        </form>

        {/* TEST USER SECTION */}
        <div
          style={{
            marginTop: "18px",
            padding: "10px",
            background: "#f9fafb",
            borderRadius: "6px",
            fontSize: "13px",
            color: "#6b7280",
            textAlign: "center",
          }}
        >
          <p style={{ margin: "4px 0", fontWeight: "600", color: "#374151" }}>
            Test Login
          </p>
          <p style={{ margin: "2px 0" }}>Email: test@test.com</p>
          <p style={{ margin: "2px 0" }}>Password: 123456</p>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            fontSize: "14px",
          }}
        >
          Don't have an account?
          <Link to="/signup"> Sign up</Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const loginBtn = {
  width: "100%",
  padding: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Login;
