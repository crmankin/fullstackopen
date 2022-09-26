const PersonLine = ({ person, handleRemoveButton }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={handleRemoveButton}>delete</button></td>
    </tr>
  );
};

export default PersonLine;
