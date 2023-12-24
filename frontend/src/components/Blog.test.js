import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  title: "React patterns",
  author: "Michael Chan",
  user: {
    name: "John Doe",
    username: "johnD",
    id: "652fe14972b0816f712d92c2",
  },
  url: "https://reactpatterns.com/",
  likes: 1023,
  id: "5a422a851b54a676234d17f7",
};

test("renders blog title", () => {
  render(
    <Blog
      key={blog.id}
      blog={blog}
      userName={""}
      updateBlog={() => {}}
      deleteBlog={() => {}}
    />
  );

  screen.getByText(/React patterns/i);
});

test("renders blog title, author, url, likes and user after view button is pressed", async () => {
  render(
    <Blog
      key={blog.id}
      blog={blog}
      userName={""}
      updateBlog={() => {}}
      deleteBlog={() => {}}
    />
  );

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  screen.getByText(/React patterns/i);
  screen.getByText(/Michael Chan/i);
  screen.getByText(/https:\/\/reactpatterns.com\//i);
  screen.getByText(/1023/i);
  screen.getByText(/John Doe/i);
});

test("updateBlog function is called every time the like button is clicked", async () => {
  const updateBlog = jest.fn();
  render(
    <Blog
      key={blog.id}
      blog={blog}
      userName={""}
      updateBlog={updateBlog}
      deleteBlog={() => {}}
    />
  );

  const user = userEvent.setup();
  const viewButton = screen.getByText("view");
  await user.click(viewButton);
  const likeButton = screen.getByText("like");

  for (let i = 0; i < 2; ++i) {
    await user.click(likeButton);
  }

  expect(updateBlog.mock.calls).toHaveLength(2);
});
