import { useEffect, useState } from "react";
import api from "../api/api";

function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");

      const res = await api.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data);
    };

    fetchStats();
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ marginBottom: "30px" }}>Dashboard</h1>

        <button
          onClick={() => (window.location.href = "/")}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Products</h3>
          <p>{stats.total_products}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Quantity</h3>
          <p>{stats.total_quantity}</p>
        </div>

        <div style={cardStyle}>
          <h3>Low Stock Items</h3>
          <p>{stats.low_stock_items}</p>
        </div>
      </div>

      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <button
          onClick={() => (window.location.href = "/products")}
          style={{
            padding: "12px 25px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Manage Products
        </button>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  width: "200px",
  textAlign: "center",
};

export default Dashboard;
