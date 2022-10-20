const Blog = ({blog}) => (
  <div className="blogItem">
    <span className="blogTitle">{blog.title}</span> <span className="blogAuthor">{blog.author}</span>
  </div>  
)

export default Blog