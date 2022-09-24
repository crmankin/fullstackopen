import { useState } from 'react';
import AddNameForm from './components/AddNameForm'
import Phonebook from './components/Phonebook'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleAddButton = (event) => {
    event.preventDefault();

    if (persons.some(n => n.name === newName)) {
      alert(`${newName} is already in the Phonebook.`);
    } else {
      const newPersons = persons.concat({ name: newName });
      setPersons(newPersons);
      setNewName('');
    }
  };

  return (
    <div>
      <h2>Add to list</h2>
      <AddNameForm newName={newName} handleNameChange={handleNameChange} handleAddButton={handleAddButton} />
      <h2>Phone Book</h2>
      <Phonebook persons={persons} />
    </div>
  );

};

export default App;
