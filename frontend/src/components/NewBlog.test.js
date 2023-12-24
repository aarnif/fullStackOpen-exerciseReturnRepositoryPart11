import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBlog from "./NewBlog";

test("Create new blog form calls callback function with right info", async () => {
  const addNewBlog = jest.fn(() => Promise.resolve());
  const { container } = render(<NewBlog addNewBlog={addNewBlog} />);

  const titleInput = container.querySelector("#title");
  const authorInput = container.querySelector("#author");
  const urlInput = container.querySelector("#url");

  const user = userEvent.setup();

  await user.type(titleInput, "React is awesome!");
  await user.type(authorInput, "Jane Doe");
  await user.type(urlInput, "http://www.fakeblogaddress.com");

  const createBlogButton = container.querySelector("#submit-button");
  await user.click(createBlogButton);

  expect(addNewBlog.mock.calls).toHaveLength(1);
  expect(titleInput.value).toBe("React is awesome!");
  expect(authorInput.value).toBe("Jane Doe");
  expect(urlInput.value).toBe("http://www.fakeblogaddress.com");
});
