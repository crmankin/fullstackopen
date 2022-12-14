const listHelper = require("../utils/list_helper");

describe("total likes", () => {
    const listWithOneBlog = [
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        }
    ];

    const listWithFourBlogs = [
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
        }
    ];

    test("of empty list is zero", () => {
        const result = listHelper.totalLikes([]);
        expect(result).toBe(0);
    });

    test("of single items list equals that item's likes", () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });

    test("of multiple items list equals the sum", () => {
        const result = listHelper.totalLikes(listWithFourBlogs);
        expect(result).toBe(34);
    });

});

describe("favorite blog", () => {
    const blogA = {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    };

    const blogB = {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    };

    const blogC = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    };

    const blogD = {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 12,
        __v: 0
    };

    test("of empty list is null", () => {
        const result = listHelper.favoriteBlog([]);
        expect(result).toBeNull();
    });

    test("of single item list equals that item", () => {
        const result = listHelper.favoriteBlog([blogB]);
        expect(result).toEqual(blogB);
    });

    test("of multiple items list equals the one with most likes", () => {
        const result = listHelper.favoriteBlog([blogA, blogB, blogC]);
        expect(result).toEqual(blogC);
    });

    test("of multiple items with the same max likes to be any of them", () => {
        const result = listHelper.favoriteBlog([blogA, blogB, blogC, blogD]);
        expect([blogC, blogD]).toContainEqual(result);
    });

});


describe("most blogs", () => {
    const blogA = {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    };

    const blogB = {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    };

    const blogC = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    };

    const blogD = {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 12,
        __v: 0
    };

    test("of empty list is null", () => {
        const result = listHelper.mostBlogs([]);
        expect(result).toBeNull();
    });

    test("of single item list equals that author", () => {
        const result = listHelper.mostBlogs([blogB]);
        expect(result).toEqual({ author: "Michael Chan", blogs: 1 });
    });

    test("of multiple items list equals the author with most blogs", () => {
        const result = listHelper.mostBlogs([blogA, blogB, blogC, blogD]);
        expect(result).toEqual({ author: "Edsger W. Dijkstra", blogs: 2 });
    });

    test("of multiple authors with the same count to be any of them", () => {
        const result = listHelper.mostBlogs([blogA, blogB, blogD]);
        expect([
            { author: "Edsger W. Dijkstra", blogs: 1 },
            { author: "Michael Chan", blogs: 1 },
            { author: "Robert C. Martin", blogs: 1 }
        ]).toContainEqual(result);
    });

});


describe("most likes", () => {
    const blogA = {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    };

    const blogB = {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 13,
        __v: 0
    };

    const blogC = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    };

    const blogD = {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 17,
        __v: 0
    };

    test("of empty list is null", () => {
        const result = listHelper.mostLikes([]);
        expect(result).toBeNull();
    });

    test("of single item list equals that author", () => {
        const result = listHelper.mostLikes([blogB]);
        expect(result).toEqual({ author: "Michael Chan", likes: 13 });
    });

    test("of multiple items list equals the author with most likes", () => {
        const result = listHelper.mostLikes([blogA, blogB, blogC]);
        expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 17 });
    });

    test("of multiple authors with the same count to be any of them", () => {
        const result = listHelper.mostLikes([blogA, blogB, blogC, blogD]);
        expect([
            { author: "Edsger W. Dijkstra", likes: 17 },
            { author: "Robert C. Martin", likes: 17 }
        ]).toContainEqual(result);
    });

});
