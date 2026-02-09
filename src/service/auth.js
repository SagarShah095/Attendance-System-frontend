import axios from "axios";
import { API_URL } from "./url";

export const login = async (values) => {
  return axios.post(`${API_URL}/auth/login`, values);
};

export const register = async (value) => {
  return axios.post(`${API_URL}/auth/register`, value);
};

export const allEmp = async (token) => {
  return axios.get(`${API_URL}/auth/get-employee`, token);
};

export const updateEmp = async (id, data, token) => {
  return axios.put(`${API_URL}/auth/update-employee/${id}`, data, token);
};

export const deleteEmp = async (id, token) => {
  return axios.delete(`${API_URL}/auth/delete-employee/${id}`, token);
};

export const addDepartment = async (value, token) => {
  return axios.post(`${API_URL}/department/add`, value, token);
};

export const getAllDepartment = async (token) => {
  return axios.get(`${API_URL}/department`, token);
};

export const editDepartment = async (id, data, token) => {
  return axios.put(`${API_URL}/department/${id}`, data, token);
};
