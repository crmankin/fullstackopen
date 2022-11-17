import { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import Toggleable from "./components/Toggleable";
import BlogList from "./components/BlogList";
import blogService from "./services/blogs";


const App = () => {
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    const createFormRef = useRef();

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        );
    }, []);

    useEffect(() => {
        const loggedInUserJSON = window.localStorage.getItem("BlogUser");
        if (loggedInUserJSON) {
            const user = JSON.parse(loggedInUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const showNotification = (message, messageType, duration) => {
        setMessage(message);
        setMessageType(messageType);
        setTimeout(() => {
            setMessage(null);
            setMessageType("");
        }, duration || 5000);
    };

    const handleCreate = async (title, author, url) => {
        const newBlog = { title, author, url };
        const savedBlog = await blogService.create(newBlog);
        setBlogs(blogs.concat(savedBlog));
        createFormRef.current.toggleVisible();
    };

    const handleLike = async (blog) => {
        const updateBlog = {
            id: blog.id,
            user: blog.user.id,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url
        };
        const savedBlog = await blogService.update(updateBlog);
        setBlogs(blogs.map(b => b.id === blog.id ? savedBlog : b));
    };

    const handleRemove = async (blog) => {
        if (window.confirm(`Remove blog "${blog.title}"?`)) {
            try {
                await blogService.remove(blog);
                setBlogs(blogs.filter(b => b !== blog));
                showNotification(`Removed "${blog.title}"`, "success", 5000);
            } catch (exception) {
                showNotification(exception.response.data.error || "Error removing blog", "error", 5000);
            }
        }
    };

    return (
        <div>
            <Notification message={message} messageType={messageType} />

            <LoginForm user={user} setUser={setUser} showNotification={showNotification} />
            {user !== null &&
                <Toggleable buttonLabel="New Blog" ref={createFormRef}>
                    <CreateBlogForm handleCreate={handleCreate} showNotification={showNotification} />
                </Toggleable>
            }
            {user !== null && <BlogList blogs={blogs} handleLike={handleLike} handleRemove={handleRemove} />}
        </div>
    );
};

export default App;
