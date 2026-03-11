import { useEffect, useState } from "react";
import api from "../api/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    quantity: 0,
    low_stock_threshold: 5,
  });

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await api.get("/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadProducts();
  }, [token]);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEditingId(null);
      } else {
        await api.post("/products", form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setForm({
        name: "",
        sku: "",
        quantity: 0,
        low_stock_threshold: 5,
      });

      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      sku: product.sku,
      quantity: product.quantity,
      low_stock_threshold: product.low_stock_threshold,
    });

    setEditingId(product.id);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <button
        onClick={() => (window.location.href = "/dashboard")}
        style={backBtn}
      >
        ← Back to Dashboard
      </button>

      <h1 style={{ marginBottom: "20px" }}>Products</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "30px",
          display: "flex",
          gap: "15px",
          alignItems: "flex-end",
          flexWrap: "wrap",
        }}
      >
        <div style={field}>
          <label style={label}>Product Name</label>
          <input
            placeholder="e.g. Laptop"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div style={field}>
          <label style={label}>SKU</label>
          <input
            placeholder="e.g. LAP123"
            value={form.sku}
            onChange={(e) => setForm({ ...form, sku: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div style={field}>
          <label style={label}>Quantity</label>
          <input
            type="number"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: Number(e.target.value) })
            }
            style={inputStyle}
          />
        </div>

        <div style={field}>
          <label style={label}>Low Stock Threshold</label>
          <input
            type="number"
            value={form.low_stock_threshold}
            onChange={(e) =>
              setForm({
                ...form,
                low_stock_threshold: Number(e.target.value),
              })
            }
            style={inputStyle}
          />
        </div>

        <button style={createBtn}>
          {editingId ? "Update Product" : "Create Product"}
        </button>
      </form>

      <table style={tableStyle}>
        <thead style={{ background: "#f3f4f6" }}>
          <tr>
            <th style={th}>Name</th>
            <th style={th}>SKU</th>
            <th style={th}>Quantity</th>
            <th style={th}>Threshold</th>
            <th style={th}>Edit</th>
            <th style={th}>Delete</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td style={td}>{p.name}</td>
              <td style={td}>{p.sku}</td>
              <td style={td}>{p.quantity}</td>
              <td style={td}>{p.low_stock_threshold}</td>

              <td style={td}>
                <button onClick={() => handleEdit(p)} style={editBtn}>
                  Edit
                </button>
              </td>

              <td style={td}>
                <button onClick={() => handleDelete(p.id)} style={deleteBtn}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const inputStyle = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const createBtn = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "5px",
  cursor: "pointer",
};

const backBtn = {
  marginBottom: "20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "5px",
  cursor: "pointer",
};

const editBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "white",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
};

const th = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #eee",
  textAlign: "center",
};

const field = {
  display: "flex",
  flexDirection: "column",
};

const label = {
  fontSize: "13px",
  marginBottom: "4px",
  color: "#374151",
  fontWeight: "500",
};

export default Products;
