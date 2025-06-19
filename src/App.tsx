import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Main/Home";
import About from "./pages/Main/About";
import Contact from "./pages/Main/Blog";
import Login from "./pages/Main/Login";
import Planing from "./pages/Main/Planing";
import Register from "./pages/Main/Register";
import Blog from "./pages/Main/Blog";
import Signalement from "./pages/Main/Signalement";
import Dons from "./pages/Main/Dons";
import ResetPassWord from "./pages/Main/ResetPassWord";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element ={<MainLayout/>}>
          <Route path="/" index element={<Home/>} />
          <Route path="/about" index element={<About/>} />
          <Route path="/dons" index element={<Dons/>} />
          <Route path="/login" index element={<Login/>} />
          <Route path="/planing" index element={<Planing/>} />
          <Route path="/faq" index element={<Home/>} />
          <Route path="/signalement" index element={<Signalement/>} />
          <Route path="/blog" index element={<Blog/>} />
          <Route path="/register" index element={<Register/>} />
          <Route path="/reset-password" index element={<ResetPassWord/>} />
        </Route>
        
        <Route/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
