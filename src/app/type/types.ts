export interface LoginResponse {
  token: string;
}

export interface Response {
  message: string;
}

export interface CropsResponse {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  data: CropsData[];
}

export interface CropsData {
  id: string;
  name: string;
  acre: number;
  expenseAmount: number;
  incomeAmount: number;
  profit: number;
}

export interface ExpenseResponse {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  data: ExpenseData[];
}

export interface ExpenseData {
  id: string;
  type: string;
  date: Date;
  amount: number;
  notes: string;
}

export interface PostExpense {
  cropId: string;
  type: string;
  date: string;
  amount: number;
  notes: string;
}

export interface IncomeResponse {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  data: IncomeData[];
}

export interface IncomeData {
  id: string;
  date: string;
  quantity: number;
  amount: number;
  notes: string;
}

export interface PostIncome {
  cropId: string;
  quantity: number;
  amount: number;
  date: string;
  notes: string;
}

export interface Chats {
  type: string;
  text: string;
}
