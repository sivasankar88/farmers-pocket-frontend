export interface LoginResponse {
  token: string;
}

export interface Response {
  message: string;
}

export interface CropsResponse {
  id: string;
  name: string;
  acre: number;
  expenseAmount: number;
  incomeAmount: number;
  profit: number;
}

export interface CropDetails {
  id: string;
  name: string;
  acres: number;
  totalIncome: number;
  totalExpense: number;
  profit: number;
  profitPerAcres: number;
}

export interface ExpenseResponse {
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
