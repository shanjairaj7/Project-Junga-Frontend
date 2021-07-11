import api from "./api";

export const user = () => {
  const saveUser = (userData) => {
    localStorage.setItem("jwt", userData.token);
  };

  const isAuthorised = () => {
    const jwt = localStorage.getItem("jwt");
    return jwt;
  };

  const logOut = () => {
    localStorage.removeItem("jwt");
  };

  const getUser = () => {
    const user = localStorage.getItem("jwt");
    return user;
  };

  return { saveUser, isAuthorised, getUser, logOut };
};

export const signUp = async (data) => {
  const response = await api.post("/user/signup", data);
  return response;
};

export const signIn = async (data) => {
  const response = await api.post("/user/signin", data);
  return response;
};
