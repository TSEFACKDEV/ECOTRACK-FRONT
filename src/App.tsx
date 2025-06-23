import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Main/Home";
import About from "./pages/Main/About";
import Login from "./pages/Main/Login";
import Planing from "./pages/Main/Planing";
import Register from "./pages/Main/Register";
import Blog from "./pages/Main/Blog";
import Signalement from "./pages/Main/Signalement";
import Dons from "./pages/Main/Dons";
import ResetPassWord from "./pages/Main/ResetPassWord";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Admin/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/Main/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dons" element={<Dons />} />
          <Route path="login" element={<Login />} />
          <Route path="planing" element={<Planing />} />
          <Route path="faq" element={<Home />} />
          <Route path="signalement" element={<Signalement/>} />
          <Route path="blog" element={<Blog />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassWord />} />
        </Route>
        <Route element={<PrivateRoute roles={["ADMIN"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
