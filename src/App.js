import { useEffect, useCallback } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { fetchData } from "./redux/countrySlice";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import {FaRegArrowAltCircleUp} from "react-icons/fa";

function App() {
  const dispatch = useDispatch();
  

  const watchScroll = useCallback(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 100
        ? document.getElementById("goTop").classList.remove("hidden")
        : document.getElementById("goTop").classList.add("hidden");
    });
  },[])


  useEffect(() => {
    dispatch(fetchData());
    watchScroll()
  }, [dispatch,watchScroll]);
  return (
    <>
      <Navbar />
      <button id="goTop" className="hidden" onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}><FaRegArrowAltCircleUp/> Go Top</button>
      <Outlet />
    </>
  );
}

export default App;
