
const CountryEntry = ({country, handleShowButton}) => {
    return (
        <div className="country-entry">
            <button onClick={() => handleShowButton(country.name.common)}>show</button> {country.name.common}
        </div>
    );
};

export default CountryEntry;