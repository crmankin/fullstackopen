import { useState } from "react";
import PropType from "prop-types";

const CreateBlogForm = ({ handleCreate, showNotification }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setURL] = useState("");


    const handleAdd = async (event) => {
        event.preventDefault();
        try {
            await handleCreate(title, author, url);
            showNotification(`Add new blog: ${title}`, "success", 3000);
            setTitle("");
            setAuthor("");
            setURL("");
        } catch (exception) {
            showNotification(exception.response.data.error || "Error creating blog", "error", 5000);
        }
    };

    return (
        <div>
            <h2>Add New</h2>
            <form onSubmit={handleAdd}>
                <label htmlFor="Title">Title:</label> <input type="text" name="Title" placeholder="Title" value={title} onChange={({ target }) => setTitle(target.value)}></input><br />
                <label htmlFor="Author">Author:</label> <input type="text" name="Author" placeholder="Author" value={author} onChange={({ target }) => setAuthor(target.value)}></input><br />
                <label htmlFor="URL">URL:</label> <input type="text" name="URL" placeholder="URL" value={url} onChange={({ target }) => setURL(target.value)}></input><br />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

CreateBlogForm.propTypes = {
    handleCreate: PropType.func.isRequired,
    showNotification: PropType.func.isRequired
};

export default CreateBlogForm;
