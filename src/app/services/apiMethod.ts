import {
  CropsResponse,
  ExpenseResponse,
  IncomeResponse,
  LoginResponse,
  PostExpense,
  PostIncome,
  Response,
} from "../type/types";
import { apiClient } from "./apiClient";

export const login = async (body = {}): Promise<LoginResponse> => {
  try {
    const res = await apiClient.post("/user/login", body);
    return res.data as LoginResponse;
  } catch (error) {
    throw error;
  }
};

export const register = async (body = {}): Promise<Response> => {
  try {
    const res = await apiClient.post("/user/register", body);
    return res.data as Response;
  } catch (error) {
    throw error;
  }
};

export const getCrops = async (
  fromDate: string,
  toDate: string
): Promise<CropsResponse[]> => {
  try {
    const res = await apiClient.get(
      `/crops?fromDate=${fromDate}&toDate=${toDate}`
    );
    return res.data as CropsResponse[];
  } catch (error) {
    throw error;
  }
};

export const postCrops = async (body = {}): Promise<Response> => {
  try {
    const res = await apiClient.post("/crops/", body);
    return res.data as Response;
  } catch (error) {
    throw error;
  }
};

export const getExpenses = async (
  id: string,
  fromDate?: string,
  toDate?: string
): Promise<ExpenseResponse[]> => {
  try {
    let url = `/expenses/${id}`;
    if (fromDate && toDate) url += `?fromDate=${fromDate}&toDate=${toDate}`;
    const res = await apiClient.get(url);
    return res.data as ExpenseResponse[];
  } catch (error) {
    throw error;
  }
};

export const deleteExpense = async (id: string): Promise<Response> => {
  try {
    const res = await apiClient.delete(`/expenses/${id}`);
    return res.data as Response;
  } catch (error) {
    throw error;
  }
};

export const postExpense = async (body: PostExpense): Promise<Response> => {
  try {
    const res = await apiClient.post(`/expenses/`, body);
    return res.data as Response;
  } catch (error) {
    throw error;
  }
};

export const getIncomes = async (
  id: string,
  fromDate?: string,
  toDate?: string
): Promise<IncomeResponse[]> => {
  try {
    let url = `/incomes/${id}`;
    if (fromDate && toDate) url += `?fromDate=${fromDate}&toDate=${toDate}`;
    const res = await apiClient.get(url);
    return res.data as IncomeResponse[];
  } catch (error) {
    throw error;
  }
};

export const deleteIncome = async (id: string): Promise<Response> => {
  try {
    const res = await apiClient.delete(`/incomes/${id}`);
    return res.data as Response;
  } catch (error) {
    throw error;
  }
};

export const postIncome = async (body: PostIncome): Promise<Response> => {
  try {
    const res = await apiClient.post(`/incomes/`, body);
    return res.data as Response;
  } catch (error) {
    throw error;
  }
};
