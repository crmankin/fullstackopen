import { useState, useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";
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
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  const showNotification = (message, messageType, duration) => {
    setMessage(message);
    setMessageType(messageType);
    setTimeout(() => {
      setMessage(null);
      setMessageType("");
    }, duration);
  };

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
        showNotification(`${newName} is already in the Phonebook.`, "error", 5000);
      } else if (
        window.confirm(
          `Do you want to update the number for ${existingPerson.name}?`
        )
      ) {
        const newPerson = { ...existingPerson, number: newNumber };
        personService.update(newPerson.id, newPerson)
          .then((data) => {
            const newPersons = persons.map((p) => (p.id === data.id ? data : p));
            setPersons(newPersons);
            showNotification(`Updated ${data.name}`, "success", 5000);
          })
          .catch(error => {
            console.log(error);
            if (error.response.status === 400) {
              showNotification(error.response.data.error, "error", 8000);
            } else {
              const newPersons = persons.filter((p) => p.id !== newPerson.id);
              setPersons(newPersons);
              showNotification(`Information on ${newPerson.name} has already been removed from the server.`, "error", 5000);
            }
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };

      personService
        .create(newPerson)
        .then((data) => {
          setPersons(persons.concat(data));
          showNotification(`Added ${data.name}`, "success", 5000);
        })
        .catch(error => {
          showNotification(error.response.data.error, "error", 8000);
        });
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
      <Notification message={message} messageType={messageType} />
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
