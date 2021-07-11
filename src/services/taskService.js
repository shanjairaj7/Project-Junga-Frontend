import api from "./api";

export const getAllTasks = () => {
  const response = api.get("/tasks");
  return response;
};

export const createNewTask = (data) => {
  const response = api.post("/task/create", data);
  return response;
};

export const getTask = (id) => {
  const response = api.get(`/task/${id}`);
  return response;
};

export const updateTask = (id, data) => {
  const response = api.put(`/task/${id}`, data);
  return response;
};

export const deleteTask = (id) => {
  const response = api.delete(`/task/${id}`);
  return response;
};

export const addComment = (id, data) => {
  const response = api.put(`/task/${id}/comment`, data);
  return response;
};
