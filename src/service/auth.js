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
