import axios from "axios";

// ✅ Match your environment variable name
const API_BASE = process.env.NEXT_PUBLIC_HTTP_SERVER 
  ? `${process.env.NEXT_PUBLIC_HTTP_SERVER}/api`
  : "http://localhost:4000/api";

axios.defaults.withCredentials = true;

console.log("🌐 API Base URL:", API_BASE);

export const signin = async (credentials: any) => {
  const response = await axios.post(`${API_BASE}/users/signin`, credentials);
  return response.data;
};

export const profile = async () => {
  const response = await axios.get(`${API_BASE}/users/profile`);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axios.put(`${API_BASE}/users/${user._id}`, user);
  return response.data;
};

export const signout = async () => {
  const response = await axios.post(`${API_BASE}/users/signout`);
  return response.data;
};
