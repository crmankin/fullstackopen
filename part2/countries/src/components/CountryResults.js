import CountryList from "./CountryList";
import CountryDetail from "./CountryDetail";

const CountryResults = ({ data }) => {
  if (data.message) {
    return (
      <div id="CountryResults">
        <span className="search-message">{data.message}</span>
      </div>
    );
  } else if (data.length === 1) {
    return (
      <div id="CountryResults">
        <CountryDetail country={data[0]} />
      </div>
    );
  } else {
    return (
      <div id="CountryResults">
        <CountryList data={data} />
      </div>
    );
  }
};

export default CountryResults;
