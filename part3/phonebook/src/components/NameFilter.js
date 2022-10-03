const NameFilter = ({ nameFilter, handleNameFilterChange }) => {
    return (
        <div>
            Find a name: <input type="text" value={nameFilter} onChange={handleNameFilterChange} />
        </div>
    );
};

export default NameFilter;
