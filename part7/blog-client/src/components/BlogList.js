import Blog from "./Blog";
import PropType from "prop-types";

const BlogList = ({ blogs, handleLike, handleRemove }) => {

    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

    return (
        <div id="blogList">
            <h2>Blogs</h2>
            {sortedBlogs.map(blog =>
                <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} />
            )}
        </div>
    );
};

BlogList.propTypes = {
    blogs: PropType.arrayOf(PropType.object).isRequired,
    handleLike: PropType.func.isRequired,
    handleRemove: PropType.func.isRequired
};

export default BlogList;
