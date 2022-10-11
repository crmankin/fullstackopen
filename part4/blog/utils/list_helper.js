const _ = require("lodash");


const totalLikes = (blogs) => {
    return blogs.reduce((sum, next) => sum + next.likes, 0);
};

const favoriteBlog = (blogs) => {
    if (!blogs || blogs.length === 0) return null;

    let maxLikes = -1;
    let fb = null;

    for (let i in blogs) {
        let b = blogs[i];
        if (b.likes > maxLikes) {
            fb = b;
            maxLikes = b.likes;
        }
    }

    return fb;
};

const mostBlogs = (blogs) => {
    if (!blogs || blogs.length === 0) return null;

    // produce blog count by author
    const counts = _.countBy(blogs, b => b.author);

    // loop through counts by author, tracking the one with the highest count
    const maxCount = _.reduce(counts, (result, value, key) => {
        if (result.blogs < value) {
            result.blogs = value;
            result.author = key;
        }
        return result;
    }, { author: "", blogs: -1 });

    return maxCount;
};


module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs
};
