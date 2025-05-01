"use client";

import { ChangeEvent, useState } from "react";
import { PostExpense } from "../type/types";
interface ExpenseFormProps {
  cropId: string;
  onCancel: () => void;
  onSubmit: (newExpense: PostExpense) => void;
}
const expenseTypes = [
  "ploughing",
  "planting",
  "fertilizer",
  "pesticide",
  "irrigation",
  "harvesting",
  "labor",
  "others",
];

export default function ExpenseForm({
  cropId,
  onCancel,
  onSubmit,
}: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    type: "",
    date: new Date().toISOString().split("T")[0],
    amount: "",
    notes: "",
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const newExpense: PostExpense = {
      cropId: cropId,
      ...formData,
      amount: Number.parseFloat(formData.amount),
      date: new Date(formData.date).toISOString(),
    };

    onSubmit(newExpense);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md mb-6">
      <h3 className="mb-4">Add New Expense</h3>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="type" className="form-label">
              Expense Type
            </label>
            <select
              id="type"
              name="type"
              className="form-select"
              value={formData.type}
              onChange={handleChange}
              required>
              <option value="">Select expense type</option>
              {expenseTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="form-input"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="form-input"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="notes" className="form-label">
              Notes (Optional)
            </label>
            <input
              type="text"
              id="notes"
              name="notes"
              className="form-input"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
}
