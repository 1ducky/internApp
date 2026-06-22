"use client";

import React, { useState } from "react";


interface UserSearchBarProps {
  onSearch: (value: string) => void;
  isDisable: boolean
}

export function UserSearchBar({ onSearch, isDisable }: UserSearchBarProps) {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
  };


  const handleClear = () => {
    setEmail("");
    if (onSearch) {
      onSearch("");
    }
  };


  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <div className="flex-1 w-full">
        <label htmlFor="search-email" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Search by Email
        </label>
        <input
          id="search-email"
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={handleEmailChange}
          disabled={isDisable}
          className={`w-full px-4 py-2 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500
            ${isDisable
              ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-75"
              : "bg-white text-gray-900 border-gray-300 hover:border-gray-400"
            }
          `}
        />
      </div>

      <div className="w-full sm:w-auto shrink-0">
        <button
          onClick={handleClear}
          disabled={!email || isDisable}
          className={`w-full sm:w-auto px-5 py-2.5 rounded-lg font-medium transition-all duration-200
            ${!email
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 border border-rose-200 active:scale-95"
            }
          `}
        >
          Clear / Reset
        </button>
        <button
          onClick={() => onSearch(email)}
          disabled={isDisable}
          className={`w-full sm:w-auto px-5 py-2.5 rounded-lg font-medium transition-all duration-200
            ${isDisable
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 border border-blue-200 active:scale-95"
            }
          `}
        >
          Search
        </button>
      </div>
    </div>
  );
}
