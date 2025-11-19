import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./components/layouts/AdminLayout.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import ProductList from "./pages/products/ProductList";
import ProductCreate from "./pages/products/ProductCreate";
import ProductEdit from "./pages/products/ProductEdit";

import CategoryList from "./pages/categories/CategoryList";
import CategoryCreate from "./pages/categories/CategoryCreate";
import CategoryEdit from "./pages/categories/CategoryEdit";

import UserList from "./pages/users/UserList";
import UserCreate from "./pages/users/UserCreate";
import UserEdit from "./pages/users/UserEdit";

import OrdersList from "./pages/orders/OrdersList";
import OrderDetail from "./pages/orders/OrderDetail";

import Settings from "./pages/settings/Settings";
import AppSettingsPage from "./pages/settings/AppSettings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />

        {/* Products */}
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/create" element={<ProductCreate />} />
        <Route path="/products/edit/:id" element={<ProductEdit />} />

        {/* Categories */}
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/create" element={<CategoryCreate />} />
        <Route path="/categories/edit/:id" element={<CategoryEdit />} />

        {/* Users */}
        <Route path="/users" element={<UserList />} />
        <Route path="/users/create" element={<UserCreate />} />
        <Route path="/users/edit/:id" element={<UserEdit />} />

        <Route path="/orders" element={<OrdersList />} />
        <Route path="/orders/:id" element={<OrderDetail />} />

        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/app" element={<AppSettingsPage />} />

      </Routes>
    </BrowserRouter>
  );
}
