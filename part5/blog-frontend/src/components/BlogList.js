import Blog from './Blog'

const BlogList = ({ blogs, handleLike, handleRemove }) => {

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>Blogs</h2>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} />
      )}
    </div>
  )
}

export default BlogList;
