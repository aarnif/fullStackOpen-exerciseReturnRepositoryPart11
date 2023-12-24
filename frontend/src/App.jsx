import { useState, useEffect } from "react";
import LogIn from "./components/LogIn";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Blogservice from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const successMessageType = "success";
  const errorMessageType = "error";

  useEffect(() => {
    const getUser = window.localStorage.getItem("user");
    console.log(getUser);
    if (getUser) {
      const user = JSON.parse(getUser);
      setUser(user);
      console.log(user.token);
      Blogservice.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    Blogservice.getAll().then((blogs) => setBlogs(blogs));
  }, [blogs]);

  const handleLogin = async () => {
    event.preventDefault();
    console.log("logging credentials:");
    console.log("username:", username);
    console.log("password:", password);

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("user", JSON.stringify(user));
      Blogservice.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      displayMessage(exception.response.data.error, errorMessageType);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  const addNewBlog = async (blogObject) => {
    let result = false;
    try {
      const newBlog = await Blogservice.add(blogObject);
      displayMessage(
        `Added new blog titled: ${newBlog.title}`,
        successMessageType
      );
      result = true;
    } catch (exception) {
      displayMessage(exception.response.data.error, errorMessageType);
    }

    return result;
  };

  const updateBlog = async (blogObject) => {
    try {
      const updateBlog = await Blogservice.update(blogObject);
      displayMessage(
        `Updated likes for blog titled: ${updateBlog.title}`,
        successMessageType
      );
    } catch (exception) {
      displayMessage(exception.response.data.error, errorMessageType);
    }
  };

  const deleteBlog = async (blogObject) => {
    try {
      const deleteBlog = await Blogservice.remove(blogObject);
      displayMessage(
        `Removed blog titled: ${blogObject.title}`,
        successMessageType
      );
    } catch (exception) {
      displayMessage(exception.response.data.error, errorMessageType);
    }
  };

  const displayMessage = (message, type) => {
    setMessage(message);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 2000);
  };

  if (user === null) {
    return (
      <>
        <Notification message={message} type={messageType} />
        <LogIn
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={messageType} />
      <h3>
        {user.name} logged in <button onClick={handleLogout}>Log out</button>
      </h3>
      <Togglable buttonLabel={"new blog"}>
        <NewBlog addNewBlog={addNewBlog} />
      </Togglable>
      <h2>Blogs:</h2>
      {blogs // sort primary based on likes and secondary on author
        .sort((a, b) => b.likes - a.likes || a.author.localeCompare(b.author))
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            userName={user.username}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  );
};

export default App;
