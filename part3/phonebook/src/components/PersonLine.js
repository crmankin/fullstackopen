const PersonLine = ({ person, handleRemoveButton, handleEditButton }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={handleEditButton}>edit</button></td>
      <td><button onClick={handleRemoveButton}>delete</button></td>
    </tr>
  );
};

export default PersonLine;
