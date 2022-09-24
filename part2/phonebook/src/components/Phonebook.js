export const Phonebook = ({ persons }) => {
  if (persons.length === 0)
    return <div>Your Phonebook is currently empty.</div>

  return (
    <ul>
      {persons.map(p => <li key={p.name}>{p.name}</li>)}
    </ul>
  );
};

export default Phonebook;