"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { ChevronLeft, Filter, Plus, Trash2 } from "lucide-react";
import ExpenseForm from "@/app/components/ExpenseForm";
import IncomeForm from "@/app/components/IncomeForm";
import {
  deleteExpense,
  deleteIncome,
  getCrops,
  getExpenses,
  getIncomes,
  postExpense,
  postIncome,
} from "@/app/services/apiMethod";
import {
  CropsResponse,
  ExpenseResponse,
  IncomeResponse,
  PostExpense,
  PostIncome,
} from "@/app/type/types";
import { AxiosError } from "axios";
import DeletePopup from "@/app/components/DeletePopup";

export default function CropDetails() {
  const router = useRouter();
  const params = useParams();
  const cropId = String(params.id);
  const [expenses, setExpenses] = useState<ExpenseResponse[]>([]);
  const [incomes, setIncomes] = useState<IncomeResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("expenses");
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    sort: "date-desc",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [cropSummary, setCropSummary] = useState<CropsResponse[]>([]);
  const [deleteState, setDeleteState] = useState({
    id: "",
    showPopup: false,
  });
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);
  const fetchData = () => {
    getCrops(filters.fromDate, filters.toDate, cropId).then((response) => {
      setCropSummary(response);
    });
    getExpenses(cropId, filters.fromDate, filters.toDate).then((response) => {
      setExpenses(response);
      setLoading(false);
    });
    getIncomes(cropId, filters.fromDate, filters.toDate).then((response) => {
      setIncomes(response);
      setLoading(false);
    });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteExpense = async (id: string) => {
    deleteExpense(id)
      .then((response) => {
        console.log(response);
        fetchData();
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
    setDeleteState({ id: "", showPopup: false });
  };

  const handleDeleteIncome = async (id: string) => {
    deleteIncome(id)
      .then((response) => {
        console.log(response);
        fetchData();
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
    setDeleteState({ id: "", showPopup: false });
  };

  const handleAddExpense = (newExpense: PostExpense) => {
    postExpense(newExpense).then((response) => {
      console.log(response);
      fetchData();
      setShowForm(false);
    });
  };

  const handleAddIncome = (newIncome: PostIncome) => {
    postIncome(newIncome).then((response) => {
      console.log(response);
      fetchData();
      setShowForm(false);
    });
  };

  if (loading) {
    return (
      <div>
        <div className="container mx-auto px-4 py-8">
          <div className="card p-12 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => router.push("/crops")}
            className="flex items-center text-green-600 hover:text-green-800">
            <ChevronLeft size={20} />
            Back to Dashboard
          </button>
        </div>

        {cropSummary[0] && (
          <div className="card mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">{cropSummary[0].name}</h1>
                <p className="text-gray-600">{cropSummary[0].acre} acres</p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center gap-2 text-lg">
                  <span className="font-medium">Profit:</span>
                  <span
                    className={
                      cropSummary[0].profit >= 0
                        ? "text-green-600 font-bold"
                        : "text-red-600 font-bold"
                    }>
                    {cropSummary[0].profit}
                    {cropSummary[0].profit < 0 && " (Loss)"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-gray-600 mb-1">Total Income</h3>
                <p className="text-xl font-bold text-green-600">
                  {cropSummary[0].incomeAmount}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-gray-600 mb-1">Total Expenses</h3>
                <p className="text-xl font-bold text-red-600">
                  {cropSummary[0].expenseAmount}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-gray-600 mb-1">Profit per Acre</h3>
                <p
                  className={`text-xl font-bold ${
                    cropSummary[0].profit / cropSummary[0].acre >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}>
                  {cropSummary[0].profit / cropSummary[0].acre}
                  {cropSummary[0].profit / cropSummary[0].acre < 0 && " (Loss)"}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <div className="flex border-b mb-4">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "expenses"
                  ? "border-b-2 border-green-600 text-green-600"
                  : "text-gray-600 hover:text-gray-800 cursor-pointer"
              }`}
              onClick={() => setActiveTab("expenses")}>
              Expenses
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "incomes"
                  ? "border-b-2 border-green-600 text-green-600"
                  : "text-gray-600 hover:text-gray-800 cursor-pointer"
              }`}
              onClick={() => setActiveTab("incomes")}>
              Income
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2>{activeTab === "expenses" ? "Expenses" : "Income"}</h2>
            <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
              <button
                className="btn btn-secondary flex items-center gap-1"
                onClick={() => setShowFilters(!showFilters)}>
                <Filter size={18} />
                Filters
              </button>
              <button
                className="btn btn-primary flex items-center gap-1"
                onClick={() => setShowForm(true)}>
                <Plus size={18} />
                Add {activeTab === "expenses" ? "Expense" : "Income"}
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <h3 className="mb-3">Filters</h3>
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                <div>
                  <label htmlFor="fromDate" className="form-label">
                    From Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="fromDate"
                      name="fromDate"
                      className="form-input"
                      value={filters.fromDate}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="toDate" className="form-label">
                    To Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="toDate"
                      name="toDate"
                      className="form-input"
                      value={filters.toDate}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
                <div className="flex md:h-10">
                  <button className="btn btn-primary" onClick={fetchData}>
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {showForm && activeTab === "expenses" && (
            <ExpenseForm
              cropId={cropId}
              onCancel={() => setShowForm(false)}
              onSubmit={handleAddExpense}
            />
          )}

          {showForm && activeTab === "incomes" && (
            <IncomeForm
              cropId={cropId}
              onCancel={() => setShowForm(false)}
              onSubmit={handleAddIncome}
            />
          )}

          {activeTab === "expenses" ? (
            <div className="overflow-x-auto">
              {expenses.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No expenses recorded yet.
                </div>
              ) : (
                <table className="w-full min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Notes
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {expenses.map((expense) => (
                      <tr key={expense.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(expense.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap capitalize">
                          {expense.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          {expense.amount}
                        </td>
                        <td className="px-6 py-4">{expense.notes || "-"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() =>
                              setDeleteState({
                                id: expense.id,
                                showPopup: true,
                              })
                            }
                            className="text-red-600 hover:text-red-900 cursor-pointer">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              {incomes.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No income recorded yet.
                </div>
              ) : (
                <table className="w-full min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Notes
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {incomes.map((income) => (
                      <tr key={income.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(income.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {income.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {income.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-green-600">
                          {income.quantity * income.amount}
                        </td>
                        <td className="px-6 py-4">{income.notes || "-"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() =>
                              setDeleteState({
                                id: income.id,
                                showPopup: true,
                              })
                            }
                            className="text-red-600 hover:text-red-900 cursor-pointer">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
      {deleteState.showPopup && (
        <DeletePopup
          setDeletePopup={() => setDeleteState({ id: "", showPopup: false })}
          handleDeleteConfirm={() => {
            if (activeTab === "expenses") handleDeleteExpense(deleteState.id);
            else handleDeleteIncome(deleteState.id);
          }}
        />
      )}
    </div>
  );
}
