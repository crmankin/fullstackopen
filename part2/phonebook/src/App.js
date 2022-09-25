import { useState } from 'react';
import AddNameForm from './components/AddNameForm'
import Phonebook from './components/Phonebook'
import NameFilter from './components/NameFilter'

const basicChangeLister = (setFunction) => (event) => setFunction(event.target.value);

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
      const newPersons = persons.concat({ id: persons.length + 1, name: newName, number: newNumber });
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
        handleNameChange={basicChangeLister(setNewName)}
        handleNumberChange={basicChangeLister(setNewNumber)}
        handleAddButton={handleAddButton} />
      <h2>Phone Book</h2>
      <NameFilter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange} />
      <Phonebook persons={persons} nameFilter={nameFilter} />
    </div>
  );

};

export default App;
