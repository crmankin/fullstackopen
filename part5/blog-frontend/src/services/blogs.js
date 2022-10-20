import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
}


const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token
    }
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
}

const update = async (updateBlog) => {
  const response = await axios.put(`${baseUrl}/${updateBlog.id}`, updateBlog);
  return response.data;
};

const blogService = {
  setToken,
  getAll,
  create,
  update
}

export default blogService;