import React from "react";
import "./style.css";
import { CiSearch } from "react-icons/ci";
import { GrHistory } from "react-icons/gr";

export default function Searchbox({
  type = "text",
  value = "",
  searchChangeFunc,
  tags = "All",
  outline,
  placeHolder = "Search",
  theme = "light",
  lastSearches,
}) {
  return (
    <div className={"customSearchbox " + theme}>
      <span className="searchIcon">
        <CiSearch />
      </span>
      <input
        type={type}
        className={outline === "none" && "outlineNone"}
        value={value}
        onChange={(e) => {searchChangeFunc(e.target.value)}}
        onKeyDown={(e) => {if(e.keyCode === 13){
          e.target.blur()
        }}}
        placeholder={placeHolder}
      />
      <div className="searchTag">
        <span>{tags}</span>
      </div>

      {lastSearches.length !== 0 && (
        <div className="lastSearches">
          {lastSearches.map((item, key) => {
            return (
              <div key={key} onClick={(e) => {searchChangeFunc(item)}}>
                <span>
                  <GrHistory />
                </span>
                {item}
              </div>
            );
          })}
          <h4>Last visited</h4>
        </div>
      )}
    </div>
  );
}
