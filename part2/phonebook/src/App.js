import { useState, useEffect } from "react";
import personService from "./services/persons";
import AddNameForm from "./components/AddNameForm";
import Phonebook from "./components/Phonebook";
import NameFilter from "./components/NameFilter";

const basicChangeListener = (setFunction) => (event) =>
  setFunction(event.target.value);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value.toLowerCase());
  };

  const handleAddButton = (event) => {
    event.preventDefault();

    if (persons.some((n) => n.name === newName)) {
      alert(`${newName} is already in the Phonebook.`);
    } else if (newNumber.length !== 12) {
      alert("Phone number should be of the format: 123-456-7890");
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };

      personService
        .create(newPerson)
        .then((data) => setPersons(persons.concat(data)));

      setNewName("");
      setNewNumber("");
    }
  };

  const handleRemoveButton = (id) => {
    const personToRemove = persons.find((p) => p.id === id);
    if (
      window.confirm(`Are you sure you want to delete ${personToRemove.name}?`)
    ) {
      personService.remove(id).then((data) => {
        const newPersons = persons.filter((p) => p.id !== id);
        setPersons(newPersons);
      });
    }
  };

  return (
    <div>
      <h2>Add to list</h2>
      <AddNameForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={basicChangeListener(setNewName)}
        handleNumberChange={basicChangeListener(setNewNumber)}
        handleAddButton={handleAddButton}
      />
      <h2>Phone Book</h2>
      <NameFilter
        nameFilter={nameFilter}
        handleNameFilterChange={handleNameFilterChange}
      />
      <Phonebook
        persons={persons}
        nameFilter={nameFilter}
        handleRemoveButton={handleRemoveButton}
      />
    </div>
  );
};

export default App;
