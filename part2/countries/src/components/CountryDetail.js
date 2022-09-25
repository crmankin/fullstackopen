const CountryDetail = ({ country }) => {
  return (
    <div className="country-detail">
      <h2>{country.name.common}</h2>
      <h3>Basic Info</h3>
      <dl>
        <dt>Capital:</dt>
        <dd>{country.capital[0]}</dd>
        <dt>Population:</dt>
        <dd>{country.population}</dd>
        <dt>
          Area (km<sup>2</sup>)
        </dt>
        <dd>{country.area}</dd>
      </dl>
      <h3>Languages</h3>
      <ul>
        {Object.keys(country.languages).map((l) => (
          <li key={l}>{country.languages[l]}</li>
        ))}
      </ul>
      <h3>Flag</h3>
      <img width="400" src={country.flags.svg} alt={country.name.common + " flag"} />
    </div>
  );
};

export default CountryDetail;
