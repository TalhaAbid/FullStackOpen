import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const add = (object) => {
  const request = axios.post(baseUrl, object);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const update = (id, changedUser) => {
  const request = axios.put(`${baseUrl}/${id}`, changedUser);
  return request.then((response) => response.data);
};

export default { getAll, add, remove, update };
