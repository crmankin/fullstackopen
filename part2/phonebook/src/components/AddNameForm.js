const AddNameForm = ({ newName, handleNameChange, handleAddButton }) => {
    return (
      <div>
        <form>
          <div>
            Name: <input value={newName} onChange={handleNameChange} />
          </div>
          <div>
            <button type="submit" onClick={handleAddButton}>Add</button>
          </div>
        </form>
      </div>
    );
  };

export default AddNameForm;