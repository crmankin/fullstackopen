import { useState, useEffect } from "react";
import axios from "axios";
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

  const loadData = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  };

  useEffect(loadData, []);

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
        id: persons.length + 1,
        name: newName,
        number: newNumber
      };

      axios
        .post("http://localhost:3001/persons", newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data));
        });

      setNewName("");
      setNewNumber("");
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
      <Phonebook persons={persons} nameFilter={nameFilter} />
    </div>
  );
};

export default App;
