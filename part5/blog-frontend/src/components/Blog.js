import { useState } from 'react';

const Blog = ({ blog, handleLike }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className="blogItem">
      <div className="blogTitle">{blog.title}</div>
      <div className="blogAuthor">{blog.author}</div>
      <button onClick={toggleVisible}>{visible ? "hide" : "show"}</button>
      <div className="blogDetails" style={visible ? { display: 'block' } : { display: 'none' }}>
        <div className="blogUrl">URL: <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a></div>
        <div className="blogLikes">Likes: {blog.likes} <button onClick={() => handleLike(blog)}>Like</button></div>
        <div className="blogCreator">Added by: {blog.user.name}</div>
      </div>
    </div>
  );
}

export default Blog;
