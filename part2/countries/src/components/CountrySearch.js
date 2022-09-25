const CountrySearch = ({ searchText, handleSearchTextChange }) => {
  return (
    <div id="CountrySearch">
      Find countries:
      <input type="search" value={searchText} onChange={handleSearchTextChange} />
    </div>
  );
};

export default CountrySearch;
