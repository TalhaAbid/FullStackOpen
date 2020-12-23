import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {
  const [countrySearch, setCountrySearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
      })
  },[])

  const handleSearchChange = (event) => {
    setCountrySearch(event.target.value);
  };

  const countriesToShow =
    countrySearch === ""
      ? []
      : countries.filter((country) =>
          country.name.toLowerCase().includes(countrySearch.toLowerCase())
        );

  return (
    <div>
      <p>
        find countries:{" "}
        <input
          name=""
          type="text"
          value={countrySearch}
          onChange={handleSearchChange}
        />
      </p>
      <Countries countries={countriesToShow} />
    </div>
  );
};

export default App;
