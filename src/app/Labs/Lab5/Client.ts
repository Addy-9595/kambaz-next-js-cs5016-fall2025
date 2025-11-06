"use client";
import axios from "axios";

// Use the NEXT_PUBLIC_HTTP_SERVER env var if set, otherwise fallback to local node server.
const REMOTE_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER ?? "http://localhost:4000";

// Ensure TODOS_API is defined before the functions that use it
const TODOS_API = `${REMOTE_SERVER}/lab5/todos`;
const ASSIGNMENT_API = `${REMOTE_SERVER}/lab5/assignment`;

export const fetchWelcomeMessage = async () => {
  const response = await axios.get(`${REMOTE_SERVER}/lab5/welcome`);
  return response.data;
};

export const fetchAssignment = async () => {
  const response = await axios.get(`${ASSIGNMENT_API}`);
  return response.data;
};

export const createTodo = async () => {
  const response = await axios.get(`${TODOS_API}/create`);
  return response.data;
};

export const postTodo = async (todo: any) => {
  const response = await axios.post(`${TODOS_API}`, todo);
  return response.data;
};