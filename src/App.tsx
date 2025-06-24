import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Main/Home";
import About from "./pages/Main/About";
import Login from "./pages/Main/Login";
import Planing from "./pages/Main/Planing";
import Register from "./pages/Main/Register";
import Conseils from "./pages/Main/Conseils";
import Signalement from "./pages/Main/Signalement";
import ResetPassWord from "./pages/Main/ResetPassWord";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Admin/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/Main/ForgotPassword";
import Faqs from "./pages/Main/Faqs";
import AdminLayout from "./layout/AdminLayout";
import User from "./pages/Admin/User";
import Reports from "./pages/Admin/Report";
import Conseil from "./pages/Main/Conseil";
import Tips from "./pages/Admin/Tips";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="planing" element={<Planing />} />
          <Route path="faq" element={<Faqs />} />
          <Route path="signalement" element={<Signalement />} />
          <Route path="conseils" element={<Conseils />} />
          <Route path="/conseils/:id" element={<Conseil />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassWord />} />
        </Route>

        <Route element={<PrivateRoute roles={["ADMIN"]} />}>
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="user" element={<User />} />
            <Route path="reports" element={<Reports />} />
            <Route path="astuces" element={<Tips/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
