"use client";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CropsResponse } from "../type/types";
import { getCrops } from "../services/apiMethod";
import { useRouter } from "next/navigation";
import { useDataStore } from "../hooks/stroe";
const Crop = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [crops, setCrops] = useState<CropsResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const today = new Date();
  const lastYear = new Date();
  const setData = useDataStore((state) => state.setData);
  lastYear.setFullYear(today.getFullYear() - 1);
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };
  const [filters, setFilters] = useState({
    fromDate: formatDate(lastYear),
    toDate: formatDate(today),
  });
  useEffect(() => {
    fetchCrops();
  }, []);
  const fetchCrops = () => {
    getCrops(filters.fromDate, filters.toDate).then((response) => {
      setCrops(response);
      setLoading(false);
      setTotalPages(Math.ceil(response.length / 5));
    });
  };
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  const storeData = (crop: CropsResponse) => {
    const profitPerAcre = crop.profit / crop.acre;
    setData({
      id: crop.id,
      name: crop.name,
      acres: crop.acre,
      totalIncome: crop.incomeAmount,
      totalExpense: crop.expenseAmount,
      profit: crop.profit,
      profitPerAcres: profitPerAcre,
    });
    router.push(`/crops/${crop.id}`);
  };
  const paginatedCrops = crops.slice((currentPage - 1) * 5, currentPage * 5);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="mb-4 md:mb-0">Farm Profit Dashboard</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            className="btn btn-secondary flex items-center gap-1"
            onClick={() => setShowFilter(!showFilter)}>
            <Filter size={18} />
            Filters
          </button>
          <Link href="/crops/add" className="btn btn-primary">
            Add New Crop
          </Link>
        </div>
      </div>
      {showFilter && (
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
              <button className="btn btn-primary" onClick={fetchCrops}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <div className="card p-12 flex justify-center ">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <>
          <div className="card mb-6">
            <h2 className="mb-4">Crops by Profit</h2>
            {crops.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No crops found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Crop
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acres
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Expense
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Income
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Profit
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {paginatedCrops.map((crop) => (
                      <tr key={crop.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {crop.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {crop.acre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {crop.expenseAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {crop.incomeAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          <span
                            className={
                              crop.profit >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }>
                            {crop.profit}
                            {crop.profit < 0 && " (Loss)"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            className="text-green-600 hover:text-green-900 font-medium cursor-pointer"
                            onClick={() => storeData(crop)}>
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-end  mt-6">
              <nav className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage == 1}
                  className="p-2 rounded-md text-green-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
                  <ChevronLeft size={20} />
                </button>
                <span className="font-bold">{currentPage}</span> of{" "}
                <span className="font-bold">{totalPages}</span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md text-green-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
                  <ChevronRight size={20} />
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Crop;
