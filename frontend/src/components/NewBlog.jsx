import React, { useState } from "react";
import PropTypes from "prop-types";

const NewBlog = ({ addNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleNewBlogSubmit = () => {
    event.preventDefault();

    const newBlogContent = {
      title: title,
      author: author,
      url: url,
    };

    console.log("Try to add new blog...");
    console.log(newBlogContent);
    console.log("result:");

    addNewBlog(newBlogContent).then((result) => {
      if (result) {
        setTitle("");
        setAuthor("");
        setUrl("");
      }
    });
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlogSubmit}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="submit-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

NewBlog.propTypes = {
  addNewBlog: PropTypes.func.isRequired,
};

export default NewBlog;
