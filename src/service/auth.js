import axios from "axios";
import { API_URL } from "./url";

export const login = async (values) => {
  return axios.post(`${API_URL}/auth/login`, values);
};

export const register = async (value, config) => {
  return axios.post(`${API_URL}/auth/register`, value, config);
};

export const allEmp = async (config) => {
  return axios.get(`${API_URL}/auth/get-employee`, config);
};

export const updateEmp = async (id, data, config) => {
  return axios.put(`${API_URL}/auth/update-employee/${id}`, data, config);
};

export const deleteEmp = async (id, config) => {
  return axios.delete(`${API_URL}/auth/delete-employee/${id}`, config);
};

export const addDepartment = async (value, config) => {
  return axios.post(`${API_URL}/department/add`, value, config);
};

export const getAllDepartment = async (config) => {
  return axios.get(`${API_URL}/department`, config);
};

export const editDepartment = async (id, data, config) => {
  return axios.put(`${API_URL}/department/${id}`, data, config);
};

export const deleteDpt = async (id, config) => {
  return axios.delete(`${API_URL}/department/${id}`, config);
};
