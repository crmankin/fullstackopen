const AddNameForm = ({ newName, newNumber, handleNameChange, handleNumberChange, handleAddButton }) => {
    return (
      <div>
        <form>
          <div>
            Name: <input value={newName} onChange={handleNameChange} /><br />
            Number: <input value={newNumber} onChange={handleNumberChange} />
          </div>
          <div>
            <button type="submit" onClick={handleAddButton}>Add</button>
          </div>
        </form>
      </div>
    );
  };

export default AddNameForm;