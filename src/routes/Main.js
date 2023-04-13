import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Dropdown from "../components/Dropdown/Dropdown";
import Searchbox from "../components/Searchbox/Searchbox";
import Card from "../components/Card/Card";
import "./main.css";
import Loader from "../components/Loader/Loader";
import { Link } from "react-router-dom";

export default function Main() {
  const [searchTerm, setSearchTerm] = useState("");
  const countries = useSelector((state) => state.countries.countries);
  const theme = useSelector((state) => state.countries.theme);
  const loading = useSelector((state) => state.countries.loading);
  const regions = useSelector((state) => state.countries.regions);
  const [continents, setContinents] = useState(regions);
  const [region, setRegion] = useState("All");
  var lastSearches = localStorage.getItem("lastSearches")
    ? JSON.parse(localStorage.lastSearches)
    : [];

  const handleRegionFilter = (selected) => {
    setRegion(selected);
  };

  useEffect(() => {
    continents[0] !== "All" &&
      setContinents((oldValues) => ["All", ...oldValues]);
  }, [continents]);

  const handleSearch = (searchText) => {
    setSearchTerm(searchText);
  };

  return (
    <main>
          <header>
            <Searchbox
              type="search"
              value={searchTerm}
              searchChangeFunc={handleSearch}
              tags={region}
              outline="none"
              placeHolder="Search for a country..."
              theme={theme}
              lastSearches={lastSearches}
            />
            <Dropdown
              title="Filter by Region"
              options={continents}
              optionFunc={handleRegionFilter}
              type={theme === "dark" ? "dark" : "light"}
            />
          </header>

          {loading ? (
        <Loader />
      ) : (
          <section>
            {countries
              .filter((item) =>
                region === "All" ? item : item.region.includes(region)
              )
              .filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item, key) => (
                <Link
                  key={key}
                  to={`./country/${item.alpha2Code}`}
                  onClick={() => {
                    if (!lastSearches.find((aranan) => aranan === item.name)) {
                      if (lastSearches.length >= 5) {
                        lastSearches = lastSearches.slice(1);
                      }
                      lastSearches.push(item.name);
                    } else {
                      lastSearches.splice(
                        lastSearches.findIndex(
                          (aranan) => aranan === item.name
                        ),
                        1
                      );
                      lastSearches.push(item.name);
                    }
                    localStorage.setItem(
                      "lastSearches",
                      JSON.stringify(lastSearches)
                    );
                  }}
                >
                  <Card country={item} />
                </Link>
              ))}
          </section>
      )}
    </main>
  );
}
