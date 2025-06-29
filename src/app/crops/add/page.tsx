"use client";
import { postCrops } from "@/app/services/apiMethod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddCrop = () => {
  const router = useRouter();

  const today = new Date();
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };
  const [formData, setFormData] = useState({
    name: "",
    acres: "",
    date: formatDate(today),
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [errors, setErrors] = useState({
    name: "",
    acres: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const errorMessages = { name: "", acres: "" };

    if (!formData.name) {
      errorMessages.name = "Crop name is required";
      isValid = false;
    }

    if (!formData.acres) {
      errorMessages.acres = "Acres is required";
      isValid = false;
    } else if (Number(formData.acres) <= 0) {
      errorMessages.acres = "Acres should be greater than 0";
      isValid = false;
    }

    setErrors(errorMessages);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage({
        type: "error",
        text: "Please fill the mandatory fields correctly.",
      });
      return;
    }

    setMessage({ type: "", text: "" });
    setLoading(true);
    postCrops(formData)
      .then((response) => {
        setMessage({ type: "success", text: response.message });
        setTimeout(() => {
          router.push("/crops");
        }, 500);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        const message = (error.response?.data as { message: string })?.message;

        setMessage({
          type: "error",
          text: message || "Something went wrong",
        });
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="mb-6">Add New Crop</h1>
        {message.text && (
          <div
            className={`mb-4 p-3 rounded-md ${
              message.type === "error"
                ? "bg-red-100 text-red-700 border border-red-400"
                : "bg-green-100 text-green-700 border border-green-400"
            }`}>
            {message.text}
          </div>
        )}
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="form-label">
                Crop Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-input ${errors.name ? "!border-red-500" : ""}`}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="acres" className="form-label">
                Acres
              </label>
              <input
                type="number"
                id="acres"
                name="acres"
                className={`form-input ${
                  errors.acres ? "!border-red-500" : ""
                }`}
                value={formData.acres}
                onChange={handleChange}
              />
              {errors.acres && (
                <p className="text-red-500 text-sm mt-1">{errors.acres}</p>
              )}
            </div>
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="date"
                name="date"
                className="form-input"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => router.push("/crops")}>
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Saving...
                  </span>
                ) : (
                  "Add Crop"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCrop;
