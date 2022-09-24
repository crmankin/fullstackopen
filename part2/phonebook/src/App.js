import { useState } from 'react';
import AddNameForm from './components/AddNameForm'
import Phonebook from './components/Phonebook'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123-456-7890' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleAddButton = (event) => {
    event.preventDefault();

    if (persons.some(n => n.name === newName)) {
      alert(`${newName} is already in the Phonebook.`);
    } else if (newNumber.length !== 12) {
      alert('Phone number should be of the format: 123-456-7890');
    } else {
      const newPersons = persons.concat({ name: newName, number: newNumber });
      setPersons(newPersons);
      setNewName('');
      setNewNumber('');
    }
  };

  return (
    <div>
      <h2>Add to list</h2>
      <AddNameForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleAddButton={handleAddButton} />
      <h2>Phone Book</h2>
      <Phonebook persons={persons} />
    </div>
  );

};

export default App;
