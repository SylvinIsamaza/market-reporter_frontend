import React, { useState, useEffect, useRef } from "react";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "../utils/lib"; // Assuming you have a utility function for classNames

export const Combobox = ({ 
  label, 
  options, 
  value, 
  setValue, 
  isLoading, 
  error, 
  disabled 
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (optionValue) => {
    setValue(optionValue === value ? "" : optionValue);
    setOpen(false);
    setSearchTerm(""); // Clear search term on selection
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
      e.preventDefault();
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0) {
        handleSelect(filteredOptions[highlightedIndex].value);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <div className="relative w-full">
      {/* Combobox Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between border border-gray-300 bg-white px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:opacity-50"
        aria-expanded={open}
        role="combobox"
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          "Loading..."
        ) : value ? (
          options.find((option) => option.value === value)?.label
        ) : (
          `Select ${label}...`
        )}
        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
      </button>

      {/* Error Message */}
      {error && <span className="text-red-500 text-sm">{error}</span>}

      {/* Dropdown Menu */}
      {open && !isLoading && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {/* Search Input */}
          <input
            ref={inputRef}
            type="text"
            className="w-full p-2 border-b border-gray-300 outline-none"
            placeholder={`Search ${label}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {/* Dropdown Options */}
          <ul className="py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={option.value}
                  className={cn(
                    "cursor-pointer select-none relative py-2 pl-10 pr-4 hover:bg-indigo-600 hover:text-white",
                    value === option.value ? "bg-indigo-100 text-indigo-900" : "text-gray-900",
                    highlightedIndex === index ? "bg-indigo-200" : "" // Highlight current selection
                  )}
                  onClick={() => handleSelect(option.value)}
                  onMouseEnter={() => setHighlightedIndex(index)} // Set highlighted index on hover
                >
                  <span className={cn("block truncate", value === option.value && "font-semibold")}>
                    {option.label}
                  </span>
                  {value === option.value && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Check className="h-5 w-5" />
                    </span>
                  )}
                </li>
              ))
            ) : (
              <li className="py-2 px-4 text-gray-500">No {label} found.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
