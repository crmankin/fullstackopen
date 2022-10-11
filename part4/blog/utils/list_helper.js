
const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((sum, next) => sum + next.likes, 0);
};


module.exports = {
    dummy,
    totalLikes
};
