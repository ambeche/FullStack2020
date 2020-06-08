import React from "react";

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

const Country = ({ country, countriesToShow, showCountry }) => {

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
      </div>
    );
  } else if (countriesToShow.length <= 10) {
    return (
      <div>
        {country.name}
        <button onClick={ () => showCountry(country)}>Show</button>
      </div>
    );
  }
};

const Countries = ({ countriesToShow, showCountry }) => {
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
        />
      ))}
    </div>
  );
};

export default Countries;
