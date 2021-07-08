import { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
        .then((res) => setCountry({ data: res.data, found: true }))
        .catch((e) => {
          setCountry({ found: false });
          console.log("error", e.message);
        });
    }
  }, [name]);

  return country;
};

export { useField, useCountry };
