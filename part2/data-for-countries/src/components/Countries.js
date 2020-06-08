import React, { useEffect } from "react";

const Languages = ({ languages }) => {
  return (
    <div>
      <ul>
        {languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
    </div>
  );
};

const Weather = ({ weather }) => {
  return (
    <div>
      <strong> Temperature: </strong> {weather.temperature} Celsius
      <div>
        <img
          src={weather.weather_icons[0]}
          alt={weather.weather_descriptions[0]}
          height="100"
          width="100"
        />
      </div>
      <div>{weather.weather_descriptions[0]}</div>
      <strong>Wind: </strong> {weather.wind_speed} mph, direction{" "}
      {weather.wind_dir}
    </div>
  );
};

const Country = ({
  country,
  countriesToShow,
  showCountry,
  provideQuery,
  weather,
}) => {
  useEffect(() => provideQuery(country));

  if (countriesToShow.length === 1) {
    return (
      <div>
        <h2> {country.name} </h2>
        <div> Capital: {country.capital} </div>
        <div> Population: {country.population} </div>
        <h3>Languages</h3>
        <Languages languages={country.languages} />
        <img
          src={country.flag}
          alt={country.alpha2Code}
          height="100"
          width="100"
        />
        <h3>Weather in {country.capital}</h3>
        <Weather weather={weather} />
      </div>
    );
  } else if (countriesToShow.length <= 10) {
    return (
      <div>
        {country.name}
        <button onClick={() => showCountry(country)}>Show</button>
      </div>
    );
  }
};

const Countries = ({ data }) => {
  const [countriesToShow, showCountry, provideQuery, weather] = data;

  if (countriesToShow.length > 10) {
    return <div>Too many matches, specify another filter.</div>;
  }

  return (
    <div>
      {countriesToShow.map((country) => (
        <Country
          key={country.name}
          country={country}
          countriesToShow={countriesToShow}
          showCountry={showCountry}
          provideQuery={provideQuery}
          weather={weather.current}
        />
      ))}
    </div>
  );
};

export default Countries;
