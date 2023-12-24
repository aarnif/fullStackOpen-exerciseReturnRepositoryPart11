import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const add = (newBlogContent) => {
  console.log(token);
  const config = {
    headers: { Authorization: token },
  };
  console.log(config);
  console.log(newBlogContent);
  const request = axios.post(baseUrl, newBlogContent, config);
  return request.then((response) => response.data);
};

const update = (updateBlogContent) => {
  console.log(token);
  const config = {
    headers: { Authorization: token },
  };
  console.log(config);
  console.log(updateBlogContent);
  const request = axios.put(
    `${baseUrl}/${updateBlogContent.id}`,
    updateBlogContent,
    config
  );
  return request.then((response) => response.data);
};

const remove = (blogToBeDeleted) => {
  console.log(token);
  const config = {
    headers: { Authorization: token },
  };
  console.log(config);
  console.log(blogToBeDeleted);
  const request = axios.delete(`${baseUrl}/${blogToBeDeleted.id}`, config);
  return request.then((response) => response.data);
};

export default { setToken, getAll, add, update, remove };
