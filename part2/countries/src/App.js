import axios from "axios";
import { useState, useEffect } from "react";
import CountrySearch from "./components/CountrySearch";
import CountryResults from "./components/CountryResults";

const App = () => {
  // App state
  const [countryData, setCountryData] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Initial load of data from REST (stored in memory for local use)
  const getCountries = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((result) => setCountryData(result.data));
  };
  useEffect(getCountries, []);

  // Event handlers
  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleShowButton = (countryName) => {
    setSearchText(countryName);
  };

  // Perform current search. Will attempt to find an exact match, and failing that will
  // return up to 10 results
  let data = null;
  if (!searchText) {
    data = { message: "Start typing to search for countries..." };
  } else {
    data = countryData.find(
      (c) => c.name.common.toLowerCase() === searchText.toLowerCase()
    );

    if (!data) {
      data = countryData.filter((c) =>
        c.name.common.toLowerCase().includes(searchText.toLowerCase())
      );
      if (data.length > 10)
        data = { message: "More than 10 results, please be more specific." };
    } else {
      data = [data];
    }
  }

  // Render

  return (
    <div id="App">
      <CountrySearch
        searchText={searchText}
        handleSearchTextChange={handleSearchTextChange}
      />
      <CountryResults data={data} handleShowButton={handleShowButton} />
    </div>
  );
};

export default App;
