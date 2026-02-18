import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import ForgotPasswordPage from "./auth/ForgotPasswordPage";
import SidebarDemo from "./examples/SidebarDemo";
import CatalystSidebarDemo from "./examples/CatalystSidebarDemo";
import SidebarWithHeaderDemo from "./examples/SidebarWithHeaderDemo";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgot" element={<ForgotPasswordPage />} />
        <Route path="/examples/sidebar" element={<SidebarDemo />} />
        <Route
          path="/examples/sidebar-with-header"
          element={<SidebarWithHeaderDemo />}
        />
        <Route
          path="/examples/catalyst-sidebar"
          element={<CatalystSidebarDemo />}
        />
      </Routes>
    </BrowserRouter>
  );
}
