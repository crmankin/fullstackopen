export const Phonebook = ({ persons }) => {
  return (
    <ul>
      {persons.map(p => <li key={p.name}>{p.name}</li>)}
    </ul>
  );
};

export default Phonebook;