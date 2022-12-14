import PersonLine from "./PersonLine";

export const Phonebook = ({ persons, nameFilter, handleEditButton, handleRemoveButton }) => {
  if (persons.length === 0)
    return <div>Your Phonebook is currently empty.</div>;

  const shownPersons = nameFilter
    ? persons.filter((e) => e.name.toLowerCase().includes(nameFilter))
    : persons;

  return (
    <table>
      <tbody>
        {shownPersons.map((p) => (
          <PersonLine
            key={p.id}
            person={p}
            handleEditButton={() => handleEditButton(p.id)}
            handleRemoveButton={() => handleRemoveButton(p.id)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Phonebook;
