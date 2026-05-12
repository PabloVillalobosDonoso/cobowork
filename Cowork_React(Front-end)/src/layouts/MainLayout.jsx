import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import "../styles/global.css";
import Footer from "../components/footer/Footer";

function MainLayout() {
  return (
    <>
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;
