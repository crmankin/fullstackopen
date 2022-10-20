import { useState } from 'react';

const CreateBlogForm = ({ handleCreate, showNotification }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');


  const handleAdd = (event) => {
    event.preventDefault();
    try {
      handleCreate(title, author, url);
      setTitle('');
      setAuthor('');
      setURL('');
      showNotification("Blog added", "success");
    } catch (exception) {
      showNotification(exception.response.data.error || "Error creating blog", "error", 5000);
    }
  };

  return (
    <div>
      <h2>Add New</h2>
      <form onSubmit={handleAdd}>
        <label htmlFor="Title">Title:</label> <input type="text" name="Title" value={title} onChange={({ target }) => setTitle(target.value)}></input><br />
        <label htmlFor="Author">Author:</label> <input type="text" name="Author" value={author} onChange={({ target }) => setAuthor(target.value)}></input><br />
        <label htmlFor="URL">URL:</label> <input type="text" name="URL" value={url} onChange={({ target }) => setURL(target.value)}></input><br />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm;
