import React from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MoreOption from "./components/Header/NavBar/MoreOption";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Header />
      <ToastContainer />
      <main className="py-3 flex-grow">
        <Outlet />
        <MoreOption />
      </main>
      <Footer />
    </div>
  );
};

export default App;
