import axios from "axios";

const api = axios.create({
  baseURL: "https://ancient-caverns-91841.herokuapp.com/api",
  withCredentials: false,
  headers: getHeaders(),
});

api.defaults.headers.common = getAuthHeader();

export default api;

function getHeaders() {
  const headers = {
    "Content-Type": "application/json",
  };

  return { ...headers };
}

export function getAuthHeader() {
  const jwt = localStorage.getItem("jwt");

  if (jwt) {
    return {
      "auth-token": jwt,
    };
  }

  return {};
}
