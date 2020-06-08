import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [clickedCountry, setClickedCountry] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await axios.get("https://restcountries.eu/rest/v2/all");
        console.log("fetched data", res.data);
        setCountries(res.data);
        console.log("res", res);
      } catch (e) {
        console.error(e.message);
      }
    };
    getCountries();
  }, []);

  const filteredCountries = countries.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const countriesToShow =
  clicked ? clickedCountry : searchText.length !== 0 ? filteredCountries : [];

  const searchCountry = (e) => {
    console.log("searchText", e.target.value);
    setSearchText(e.target.value);
    setClicked(false)
  };

  const showCountry = (country) => {
    const toShow = countriesToShow.filter((p) => p.name.toLowerCase().includes(country.name.toLowerCase()));
    setClicked(true)
    setClickedCountry(toShow)
    console.log('clicked country', toShow); 
  }

  return (
    <div>
      <Filter searchCountry={searchCountry} searchText={searchText} />
      <Countries countriesToShow={countriesToShow} showCountry={showCountry} />
    </div>
  );
};

export default App;
