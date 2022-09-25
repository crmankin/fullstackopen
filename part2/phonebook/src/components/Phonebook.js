const PersonLine = ({ person }) => {
  return <tr><td>{person.name}</td><td>{person.number}</td></tr>;
};


export const Phonebook = ({ persons, nameFilter }) => {
  if (persons.length === 0)
    return <div>Your Phonebook is currently empty.</div>

  const shownPersons = nameFilter
    ? persons.filter(e => e.name.toLowerCase().includes(nameFilter))
    : persons;

  return (
    <table>
      <tbody>
        {shownPersons.map(p => <PersonLine key={p.id} person={p} />)}
      </tbody>
    </table>
  );
};

export default Phonebook;