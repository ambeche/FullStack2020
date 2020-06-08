import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [clickedCountry, setClickedCountry] = useState([]);
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState("Espoo");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("https://restcountries.eu/rest/v2/all");

        const api_key = process.env.REACT_APP_API_KEY;
        console.log("apiKey", api_key);

        const weather = await axios.get(` http://api.weatherstack.com/current?access_key=${api_key}&query=${query}`);

        console.log("fetched data", res.data);
        setCountries(res.data);
        setWeather(weather.data);
        console.log("res", res);
      } catch (e) {
        console.error(e.message);
      }
    };
    getData();
  }, [query]);

  const filteredCountries = countries.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const countriesToShow = clickedCountry.length > 0
    ? clickedCountry
    : searchText.length !== 0
    ? filteredCountries
    : [];

  const searchCountry = (e) => {
    console.log("searchText", e.target.value);
    setSearchText(e.target.value);
    setClickedCountry([])
  };

  const showCountry = (country) => {
    const toShow = countriesToShow.filter((p) =>
      p.name.toLowerCase().includes(country.name.toLowerCase())
    );
    setClickedCountry(toShow);
    console.log("clicked country", toShow);
  };

  const provideQuery = (country) => setQuery(country.capital)

  return (
    <div>
      <Filter searchCountry={searchCountry} searchText={searchText} />
      <Countries data={[countriesToShow, showCountry, provideQuery, weather]} />
    </div>
  );
};

export default App;
