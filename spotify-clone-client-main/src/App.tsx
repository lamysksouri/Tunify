import "./App.css";

import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SuccessPage from "./pages/SuccessPage"; // Add this import



const App = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;