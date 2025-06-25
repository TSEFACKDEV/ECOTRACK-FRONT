
import SideBar from "./SideBar";
import Header from "./Header";
import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <section className="min-h-screen bg-gray-50 flex flex-col md:grid md:grid-cols-[250px_1fr]">
      {/* Sidebar en haut sur mobile, à gauche sur desktop */}
      <div className="md:col-span-1">
        <SideBar />
      </div>
      <main className="flex-1">
        <Header />
        <Outlet />
      </main>
    </section>
  );
};

export default AdminLayout;