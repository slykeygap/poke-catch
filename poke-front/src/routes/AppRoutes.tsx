// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      {/* Redirige cualquier otra ruta al login */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
