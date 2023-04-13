import React from "react";
import "./Dropdown.css";
import { FaChevronDown } from 'react-icons/fa';

export default function Dropdown({
  type = "light",
  title = "title",
  options = ["option"],
  optionFunc,
}) {
  return (
    <div className="customDropdown" type={type} role="listbox" aria-roledescription="select">
      <div className="customDropdownTitle">{title} <span><FaChevronDown /></span> </div>
      <div className="customOptionContainer">
        <div className="customOptions">
          {options.map((item, key) => {
            return (
              <button key={key}
                className="customDropdownOption"
                onClick={(e) => optionFunc(e.target.innerHTML)}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
