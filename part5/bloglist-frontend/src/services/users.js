import axios from "axios";

const baseUrl = "/api/users";

const getUser = (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

export default {getUsers, getUser}