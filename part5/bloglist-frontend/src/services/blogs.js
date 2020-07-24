import axios from "axios";

const baseUrl = "/api/blogs";

let token;

const setToken = (newToken) => (token = `bearer ${newToken}`);

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((response) => response.data);
};

const createBlog = async (blog) => {
  const res = await axios.post(baseUrl, blog, {
    headers: { Authorization: token },
  });
  return res.data;
};

const updateBlog = async (blog, id) => {
  const res = await axios.put(`${baseUrl}/${id}`, blog);
  return res.data;
};

export default { getAll, createBlog, updateBlog, setToken };
