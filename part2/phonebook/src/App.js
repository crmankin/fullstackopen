import { useState } from 'react';
import AddNameForm from './components/AddNameForm'
import Phonebook from './components/Phonebook'
import NameFilter from './components/NameFilter'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Christopher Mankin', number: '419-346-3470' },
    { id: 2, name: 'Jack Mankin Sr', number: '614-491-6636' },
    { id: 3, name: 'Kevin Schultz', number: '563-881-9123' },
    { id: 4, name: 'Michelle Callahan', number: '888-888-8888' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value.toLowerCase());
  };

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
      <NameFilter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange} />
      <Phonebook persons={persons} nameFilter={nameFilter} />
    </div>
  );

};

export default App;
