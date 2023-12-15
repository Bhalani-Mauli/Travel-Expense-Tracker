import axios from "axios";
import { Group } from "../types/api";
import { ExpenseData } from "../pages/AddExpense";
import { GroupPayload } from "../pages/CreateGroup";
import { SignupPayload } from "../pages/Signup";
import { User } from "../context/auth.context";
import { SettleData } from "../pages/SettleExpense";

const token = localStorage.getItem("authToken");
const API_URL = import.meta.env.VITE_API_URL;

const fetchGroups = () => {
  return axios.get<Group[]>(`${API_URL}/groups`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const addExpense = (expenseData: ExpenseData) => {
  return axios.post(`${API_URL}/expenses`, expenseData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const createGroup = (data: GroupPayload) => {
  return axios.post(`${API_URL}/groups`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const signup = (data: SignupPayload) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };
  return axios.post(`${API_URL}/auth/signup`, data, {
    headers: headers,
  });
};

const authVerify = () => {
  return axios.get<User>(`${API_URL}/auth/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getGroupById = (id: string) => {
  return axios.get(`${API_URL}/groups/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getExpensesByGroup = (groupId: any) => {
  return axios.get(`${API_URL}/expenses/${groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const settleExpense = (groupId: string, settleData: SettleData) => {
  return axios.post(`${API_URL}/settle/${groupId}`, settleData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getAllSettlements = (groupId: string) => {
  return axios.get(`${API_URL}/settle/${groupId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export {
  fetchGroups,
  addExpense,
  getExpensesByGroup,
  createGroup,
  signup,
  authVerify,
  getGroupById,
  settleExpense,
  getAllSettlements,
};
