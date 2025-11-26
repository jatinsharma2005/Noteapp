"use client";
// You can keep this if this file is imported directly in client components.
// It prevents hydration issues with localStorage.

import axios from "axios";

// Axios Instance
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token from localStorage (client-side only)
API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ------------- AUTH APIS -------------

export async function registerUser(data) {
  try {
    const res = await API.post("/auth/register", data);
    return res.data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
}

export async function loginUser(data) {
  try {
    const res = await API.post("/auth/login", data);
    return res.data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
}

// ------------- NOTE APIS -------------

export async function getNotes() {
  try {
    const res = await API.get("/notes");
    return res.data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
}

export async function createNote(data) {
  try {
    const res = await API.post("/notes", data);
    return res.data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
}

export async function deleteNote(id) {
  try {
    const res = await API.delete(`/notes/${id}`);
    return res.data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
}

export async function updateNote(id, data) {
  return API.put(`/notes/${id}`, data);
}

export async function togglePin(id) {
  return API.put(`/notes/pin/${id}`);
}

export default API;
