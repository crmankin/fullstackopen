import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

describe("Blog component", () => {
    let blog, likeFn, removeFn;

    beforeEach(() => {
        blog = {
            title: "My Blog Title",
            author: "The Author",
            url: "https://www.google.com",
            likes: 7,
            user: {
                username: "testUserA",
                name: "Test User A",
                id: "63481f137a728b121144326d"
            },
            id: "63483f433ec87a53a428e444"
        };

        likeFn = jest.fn();
        removeFn = jest.fn();
    });

    test("renders only title and author initially", () => {
        render(<Blog blog={blog} handleLike={likeFn} handleRemove={removeFn} />);

        const title = screen.getByText(blog.title, { exact: false });
        const author = screen.getByText(blog.author, { exact: false });
        const url = screen.queryByText(blog.url, { exact: false });
        const likes = screen.queryByText(blog.likes, { exact: false });

        expect(title).toBeDefined();
        expect(author).toBeDefined();
        expect(url).toBeNull();
        expect(likes).toBeNull();
    });
});


