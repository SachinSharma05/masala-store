import React from 'react';
import { useEffect, useState } from "react";
import { productApi } from "../api/productApi";
import { categoryApi } from "../api/categoryApi";
import { userApi } from "../api/userApi";

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0, users: 0 });

  useEffect(() => {
    Promise.all([productApi.getAll(), categoryApi.getAll(), userApi.getAll()]).then(([p, c, u]) => {
      setStats({
        products: p.data.length,
        categories: c.data.length,
        users: u.data.length,
      });
    });
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <div style={{ padding: 20, background: "#eee", borderRadius: 8 }}>
          <h3>Products</h3>
          <p>{stats.products}</p>
        </div>

        <div style={{ padding: 20, background: "#eee", borderRadius: 8 }}>
          <h3>Categories</h3>
          <p>{stats.categories}</p>
        </div>

        <div style={{ padding: 20, background: "#eee", borderRadius: 8 }}>
          <h3>Users</h3>
          <p>{stats.users}</p>
        </div>
      </div>
    </div>
  );
}
