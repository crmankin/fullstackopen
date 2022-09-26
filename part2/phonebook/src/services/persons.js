import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((result) => result.data);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((result) => result.data);
};

const update = (id, updatedPerson) => {
  return axios
    .put(`${baseUrl}/${id}`, updatedPerson)
    .then((result) => result.data);
};

const remove = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then((result) => result.data);
}

const personService = { getAll, create, update, remove };

export default personService;
