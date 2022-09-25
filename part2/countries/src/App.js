import axios from "axios";
import { useState, useEffect } from "react";
import CountrySearch from "./components/CountrySearch";
import CountryResults from "./components/CountryResults";

const App = () => {
  const [countryData, setCountryData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getCountries = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((result) => setCountryData(result.data));
  };
  useEffect(getCountries, []);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  let data = searchText
    ? countryData.filter((c) =>
        c.name.common.toLowerCase().includes(searchText.toLowerCase())
      )
    : { message: "Start typing to search for countries..." };

  if (!data.message && data.length > 10)
    data = { message: "More than 10 results, please be more specific." };

  return (
    <div id="App">
      <CountrySearch
        searchText={searchText}
        handleSearchTextChange={handleSearchTextChange}
      />
      <CountryResults data={data} />
    </div>
  );
};

export default App;
