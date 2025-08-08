import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center">
      <Navbar />
      <ToastContainer position="top-center" autoClose={5000} theme="dark"/>
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
