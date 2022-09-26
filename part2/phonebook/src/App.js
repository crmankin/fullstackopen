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

    const existingPerson = persons.find((p) => p.name === newName);

    if (existingPerson) {
      if (existingPerson.number === newNumber) {
        alert(`${newName} is already in the Phonebook.`);
      } else if (
        window.confirm(
          `Do you want to update the number for ${existingPerson.name}?`
        )
      ) {
        const newPerson = { ...existingPerson, number: newNumber };
        personService.update(newPerson.id, newPerson).then((data) => {
          const newPersons = persons.map((p) => (p.id === data.id ? data : p));
          setPersons(newPersons);
        });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };

      personService
        .create(newPerson)
        .then((data) => setPersons(persons.concat(data)));
    }
    setNewName("");
    setNewNumber("");
  };

  const handleEditButton = (id) => {
    const personToEdit = persons.find((p) => p.id === id);
    setNewName(personToEdit.name);
    setNewNumber(personToEdit.number);
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
        handleEditButton={handleEditButton}
        handleRemoveButton={handleRemoveButton}
      />
    </div>
  );
};

export default App;
