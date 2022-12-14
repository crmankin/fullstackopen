import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    test("renders url and like after clicking show", async () => {
        render(<Blog blog={blog} handleLike={likeFn} handleRemove={removeFn} />);

        const user = userEvent.setup();
        const button = screen.getByText("show");
        await user.click(button);

        const url = screen.getByText(blog.url, { exact: false });
        const likes = screen.getByText(blog.likes, { exact: false });
        const likeButton = screen.getByText("like");

        expect(url).toBeDefined();
        expect(likes).toBeDefined();
        expect(likeButton).toBeDefined();
    });

    test("calls appropriate handler each time like button is clicked", async () => {
        render(<Blog blog={blog} handleLike={likeFn} handleRemove={removeFn} />);

        const user = userEvent.setup();
        const showButton = screen.getByText("show");
        await user.click(showButton);
        const likeButton = screen.getByText("like");

        expect(likeFn).toBeCalledTimes(0);
        await user.click(likeButton);
        expect(likeFn).toBeCalledTimes(1);
        await user.click(likeButton);
        expect(likeFn).toBeCalledTimes(2);
    });
});


