import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./country.css";
import { BsArrowLeft, BsArrowUpRightSquare } from "react-icons/bs";
import { fetchData } from "../redux/countrySlice";

export default function Country(params) {
  let { countryCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [cntry, setCntry] = useState({
    name: "name",
    flags: { png: "bayrak" },
  });
  const cntries = useSelector((state) => state.countries.countries);
  const dbLoading = useSelector((state) => state.countries.loading);
  const dispatch = useDispatch();

  const getCountry = useCallback(async () => {
    const res = await cntries.find((item) => item.alpha2Code === countryCode);
    setCntry(res);
    setLoading(false);
  }, [cntries, countryCode]);

  useEffect(() => {
    cntries.length > 0 ? getCountry() : dispatch(fetchData());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [cntries.length,dispatch,getCountry]);

  return (
    <main>
      <div id="backContainer">
        <Link to="../">
          <BsArrowLeft /> Main Page
        </Link>
      </div>
      {loading ? (
        "Loading..."
      ) : dbLoading ? "Loading..." : (
        <div className="main">
          <div id="flag">
            <img src={cntry.flag} alt={cntry.name} />
          </div>
          <div id="info">
            <h1>
              {cntry.name}{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.google.com/maps/place/${cntry.name.indexOf("(") >= 0 ? cntry.name.slice(0,cntry.name.indexOf("(")) + cntry.name.slice(cntry.name.indexOf(")")+2) : cntry.name}`}
              >
                <BsArrowUpRightSquare />
                See on Google Maps
              </a>
            </h1>
            <div id="infos">
              <div className="info">
                <b>Native Name:</b> {cntry.nativeName}
              </div>
              <div className="info">
                <b>Top Level Domain: </b>
                {cntry.topLevelDomain.map((item) => item)}
              </div>
              <div className="info">
                <b>Population:</b> {cntry.population.toLocaleString()}
              </div>
              <div className="info">
                <b>Currencies:</b> {cntry.currencies.map((item) => item.name)}
              </div>
              <div className="info">
                <b>Region:</b> {cntry.region}
              </div>
              <div className="info">
                <b>Languages:</b>{" "}
                {cntry.languages.map((item) => item.name + " ")}
              </div>
              <div className="info">
                <b>Sub Region:</b> {cntry.subregion}
              </div>
              <div className="info">
                <b>Capital:</b> {cntry.capital}
              </div>
              <div className="info">
                <b>Phone Code:</b> +{cntry.callingCodes}
              </div>
              <div className="info">
                <b>Timezone{cntry.timezones.length > 1 && "s"}:</b>{" "}
                {cntry.timezones.map((item) => item + " ")}
              </div>
            </div>
            <div id="borders">
              <b>Border Countries:</b>
              {cntry.borders
                ? cntry.borders.map((item,key) => {
                    return (
                      <Link key={key}
                        to={`../country/${
                          cntries.find(
                            (borderCountry) => borderCountry.alpha3Code === item
                          ).alpha2Code
                        }`}
                      >
                        {
                          cntries.find(
                            (borderCountry) => borderCountry.alpha3Code === item
                          ).name
                        }
                      </Link>
                    );
                  })
                : "This country doesn't share borders with any other country"}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
