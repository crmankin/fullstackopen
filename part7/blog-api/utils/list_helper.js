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

const mostLikes = (blogs) => {
    if (!blogs || blogs.length === 0) return null;

    // produce sum of likes by author
    const counts = blogs.reduce((prev, next) => {
        prev[next.author] = (prev[next.author] || 0) + next.likes;
        return prev;
    }, {});

    // loop through likes by author, tracking the one with the highest
    const maxLikes = _.reduce(counts, (result, value, key) => {
        if (result.likes < value) {
            result.likes = value;
            result.author = key;
        }
        return result;
    }, { author: "", likes: -1 });

    return maxLikes;
};


module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};
