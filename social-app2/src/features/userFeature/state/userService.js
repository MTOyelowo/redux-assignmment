import axios from "axios";

const API_URL = "/api/users/";

// Get users
const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "all", config);

  return response.data.users;
};

// Get user
const getUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + `single?${userId}`, config);

  console.log(response.data);

  return response.data;
};

const userService = {
  getUsers,
  getUser,
};

export default userService;
