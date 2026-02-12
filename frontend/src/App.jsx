import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Login from "./page/Login";

import Frontpage from "./page//sliders/Frontpage";
import Signup from "./page/Signup";
import Home from "./page/Home";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useSelector } from "react-redux";

function App() {
  let [isAuth, setisAuth] = useState(false);
const [showSplash, setShowSplash] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setShowSplash(false);
  }, 2000); // 👈 2 seconds

  return () => clearTimeout(timer);
}, []);

if (showSplash) {
  return <Frontpage/>;
}
  let Homeprivate = ({ setisAuth }) => {
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
      if (localStorage.getItem("token")) {
        setisAuth(true);
        if (
          location.pathname === "/" ||
          location.pathname === "/login" ||
          location.pathname === "/signup" ||
          location.pathname === "/signup?name=&email=&password="
        ) {
          navigate("/home", { replace: false });
        }
      }
      
    }, [setisAuth, location, navigate]);

    return null;
  };
  let Privale = ({ element }) => {
    return isAuth ? element : <Navigate to="/login" />;
  };
  return (
    <>
      <div>
        <ToastContainer position="top-right" autoClose={1000} />
      </div>
      <Homeprivate setisAuth={setisAuth} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Privale element={<Home />} />} />
        <Route path="/signup" element={<Signup />} />
       
      </Routes>
    </>
  );
}

export default App;
