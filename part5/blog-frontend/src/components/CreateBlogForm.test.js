import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlogForm from "./CreateBlogForm";

describe("CreateBlogForm component", () => {
    let blog, createFn, notifyFn;

    beforeEach(() => {
        blog = {
            title: "My Blog Title",
            author: "The Author",
            url: "https://www.google.com"
        };

        createFn = jest.fn();
        notifyFn = jest.fn();
    });

    test("renders three inputs and a button", () => {
        render(<CreateBlogForm handleCreate={createFn} showNotification={notifyFn} />);

        const textboxes = screen.getAllByRole("textbox");
        const buttons = screen.getAllByRole("button");

        expect(textboxes).toHaveLength(3);
        expect(buttons).toHaveLength(1);
    });

    test("calls create handler with the provided details", async () => {
        render(<CreateBlogForm handleCreate={createFn} showNotification={notifyFn} />);

        const titleText = screen.getByPlaceholderText("Title");
        const authorText = screen.getByPlaceholderText("Author");
        const urlText = screen.getByPlaceholderText("URL");
        const createButton = screen.getByRole("button");

        const user = userEvent.setup();
        await user.type(titleText, blog.title);
        await user.type(authorText, blog.author);
        await user.type(urlText, blog.url);
        await user.click(createButton);

        expect(createFn).toBeCalledTimes(1);
        expect(createFn).toBeCalledWith(blog.title, blog.author, blog.url);
    });
});


