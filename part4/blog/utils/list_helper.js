
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


module.exports = {
    totalLikes,
    favoriteBlog
};
