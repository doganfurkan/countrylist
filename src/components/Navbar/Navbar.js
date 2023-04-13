import React, { useEffect } from "react";
import "./style.css";
import { HiOutlineMoon } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme, setTheme } from "../../redux/countrySlice";

export default function Navbar() {
  const theme = useSelector(state => state.countries.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.classList.add(localStorage.theme)
  },[])

  useEffect(() => {
    localStorage.getItem("theme") && dispatch(setTheme(localStorage.theme));
  },[dispatch])

  useEffect(() => {
    localStorage.setItem("theme",theme);
  },[theme])

  return (
    <nav>
      <div id="navContainer">
        <h1 id="logo">Where in the world?</h1>
        <button id="themeChanger" onClick={() => {
          document.body.classList.toggle("dark");
          dispatch(changeTheme())
        }}><HiOutlineMoon/> Dark Mode</button>
      </div>
    </nav>
  );
}
