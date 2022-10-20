import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, handleLike, handleRemove }) => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        setVisible(!visible);
    };

    return (
        <div className="blogItem">
            <div className="blogTitle">{blog.title}</div>
            <div className="blogAuthor">{blog.author}</div>
            <button onClick={toggleVisible}>{visible ? "hide" : "show"}</button>
            <div className="blogDetails" style={visible ? { display: "block" } : { display: "none" }}>
                <div className="blogUrl">URL: <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a></div>
                <div className="blogLikes">Likes: {blog.likes} <button onClick={() => handleLike(blog)}>Like</button></div>
                <div className="blogCreator">Added by: {blog.user.name}</div>
                <div><button onClick={() => handleRemove(blog)}>Remove</button></div>
            </div>
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired
};

export default Blog;
