import CountryEntry from "./CountryEntry";

const CountryList = ({ data, handleShowButton }) => {
  return (
    <div id="CountryList">
      {data.map((d) => (
        <CountryEntry key={d.name.common} country={d} handleShowButton={handleShowButton} />
      ))}
    </div>
  );
};

export default CountryList;
