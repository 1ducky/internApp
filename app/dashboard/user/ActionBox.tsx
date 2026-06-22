"use client";

import { useState, useRef, useEffect } from "react";

interface ActionBoxProps {
  children: React.ReactNode;
}

export function ActionBox({ children }: ActionBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <svg
          className="w-5 h-5 text-gray-500 hover:text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {/* Floating Dropdown */}
      <div
        className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 ease-out
          ${isOpen
            ? "transform opacity-100 scale-100 translate-y-0"
            : "transform opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }
        `}
      >
        <div className="py-1" role="menu" aria-orientation="vertical">
          {/* 
            Wrapping children in a div that closes the menu on click 
            allows any action button clicked inside to close the dropdown automatically.
          */}
          <div onClick={() => setIsOpen(false)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
