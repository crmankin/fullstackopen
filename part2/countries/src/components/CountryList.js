import CountryEntry from "./CountryEntry";

const CountryList = ({ data }) => {
  return (
    <div id="CountryList">
      {data.map((d) => (
        <CountryEntry key={d.name.common} country={d} />
      ))}
    </div>
  );
};

export default CountryList;
