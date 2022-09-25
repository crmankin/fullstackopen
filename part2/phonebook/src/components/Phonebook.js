export const Phonebook = ({ persons, nameFilter }) => {
  if (persons.length === 0)
    return <div>Your Phonebook is currently empty.</div>

  const shownPersons = nameFilter
    ? persons.filter(e => e.name.toLowerCase().includes(nameFilter))
    : persons;

  return (
    <ul>
      {shownPersons.map(p => <li key={p.id}>{p.name}: {p.number}</li>)}
    </ul>
  );
};

export default Phonebook;