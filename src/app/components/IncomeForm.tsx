"use client";

import { ChangeEvent, useState } from "react";
import { PostIncome } from "../type/types";
interface IncomeFormProps {
  cropId: string;
  onCancel: () => void;
  onSubmit: (newExpense: PostIncome) => void;
}
const IncomeForm = ({ cropId, onCancel, onSubmit }: IncomeFormProps) => {
  const [formData, setFormData] = useState({
    quantity: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });
  const [error, setError] = useState({
    quantity: "",
    amount: "",
  });
  const validateFormData = (quantity: string, amount: string) => {
    const newError = { quantity: "", amount: "" };
    if (!quantity.trim()) newError.quantity = "Enter the quantity of sales";
    if (!amount.trim()) newError.amount = "Enter the price per unit";
    return newError;
  };
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
    const validationErrors = validateFormData(
      formData.quantity,
      formData.amount
    );
    setError(validationErrors);
    const hasErrors = Object.values(validationErrors).some(Boolean);
    if (hasErrors) return;
    const newIncome: PostIncome = {
      cropId: cropId,
      ...formData,
      quantity: Number.parseFloat(formData.quantity),
      amount: Number.parseFloat(formData.amount),
      date: new Date(formData.date).toISOString(),
    };

    onSubmit(newIncome);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md mb-6">
      <h3 className="mb-4">Add New Income</h3>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="form-input"
              value={formData.quantity}
              onChange={handleChange}
              min="0.01"
              step="0.01"
            />
            {error.quantity && (
              <p className="text-red-500 text-sm mt-1">{error.quantity}</p>
            )}
          </div>

          <div>
            <label htmlFor="price" className="form-label">
              Price per Unit
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="form-input"
              value={formData.amount}
              onChange={handleChange}
            />
            {error.amount && (
              <p className="text-red-500 text-sm mt-1">{error.amount}</p>
            )}
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
            Add Income
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncomeForm;
