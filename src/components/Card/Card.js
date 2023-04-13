import React from "react";
import "./style.css";

export default function Card({ country }) {
  return (
    <section className="countryCard">
      <div className="cardImg">
        <img src={country.flags.png} alt={country.name} />
      </div>
      <div className="cardText">
        <h2>{country.name}</h2>
        <div className="stats">
          <div>
            <b>Population: </b>
           {country.population.toLocaleString()}
          </div>
          <div>
            <b>Region: </b>
            {country.region}
          </div>
          <div>
            <b>Capital: </b>
            {country.capital}
          </div>
        </div>
      </div>
    </section>
  );
}
