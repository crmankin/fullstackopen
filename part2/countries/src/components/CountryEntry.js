
const CountryEntry = ({country}) => {
    return (
        <div className="country-entry">
            {country.name.common}
        </div>
    );
};

export default CountryEntry;