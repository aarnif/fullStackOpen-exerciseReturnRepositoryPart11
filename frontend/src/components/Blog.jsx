import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, userName, updateBlog, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const handleUpdateBlog = () => {
    event.preventDefault();
    console.log("Try to update blog...");
    updateBlog({ ...blog, likes: likes + 1 });
    setLikes(likes + 1);
  };

  const handleRemoveBlog = () => {
    event.preventDefault();
    const deleteBlogConfirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (deleteBlogConfirm) {
      console.log("Try to remove blog...");
      deleteBlog(blog);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid 1px",
    marginBottom: 5,
  };

  const showBlogInfo = () => {
    if (showDetails) {
      return (
        <>
          <div>{blog.url}</div>
          <div>
            like {blog.likes} <button onClick={handleUpdateBlog}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.username === userName && (
            <button onClick={handleRemoveBlog}>Remove</button>
          )}
        </>
      );
    }
  };

  return (
    <div style={blogStyle} className="blog">
      {" "}
      <div id={blog.id}>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "hide" : "view"}
        </button>
        {showBlogInfo()}
      </div>
    </div>
  );
};

Blog.propTypes = {
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
