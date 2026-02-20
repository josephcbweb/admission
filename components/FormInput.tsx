import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { FormFieldConfig, dropdownOptions } from "@/utilities/form-data-v2";
import CasteHelperModal from "./CasteHelperModal";

interface FormInputProps extends FormFieldConfig {
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  props?: FormFieldConfig;
  value?: string | number | boolean;
  isInvalid?: boolean;
  disabled?: boolean;
}

const FormInput = (props: FormInputProps) => {
  const [isError, setIsError] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isCasteModalOpen, setIsCasteModalOpen] = useState(false);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const { label, onChange, id, errorMessage, info, options, isInvalid, disabled, ...inputProps } = props;

  // Combine local and external error state
  const hasError = isError || isInvalid;

  // Close tooltip when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };
    if (showTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTooltip]);

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // Check if required and empty
    if (inputProps.required && !value.toString().trim()) {
      setIsError(true);
      return;
    }

    // Check regex pattern if it exists and value is not empty
    if (inputProps.pattern && value.toString().trim()) {
      try {
        const regex = new RegExp(inputProps.pattern);
        if (!regex.test(value.toString())) {
          setIsError(true);
          return;
        }
      } catch (e) {
        console.error("Invalid regex pattern:", inputProps.pattern);
      }
    }

    // Age Validation on Blur
    if (props.minAge && value && typeof value === 'string' && inputProps.type === 'date') {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < props.minAge) {
        setIsError(true);
        // We might want to set a specific error message, but FormInput currently toggles a boolean.
        // The error message from props will be shown.
        return;
      }
    }

    // Future Date/Year Validation
    if (inputProps.max === "current" && value) {
      const currentYear = new Date().getFullYear();
      const inputYear = Number(value);

      // If it's a 4-digit year number
      if (!isNaN(inputYear) && inputYear > currentYear && value.toString().length === 4) {
        setIsError(true);
        return;
      }

      // If it's a date string
      if (inputProps.type === 'date' && new Date(value) > new Date()) {
        setIsError(true);
        return;
      }
    }

    setIsError(false);
  };

  const inputVariants = {
    focus: {
      borderColor: "#000000",
      backgroundColor: "#ffffff",
      scale: 1.01,
      transition: { duration: 0.2 },
    },
    error: {
      borderColor: "#ef4444",
      backgroundColor: "#fef2f2",
      transition: { duration: 0.2 },
    },
  };

  const commonClasses = `w-full px-4 py-3 text-sm rounded-xl border-2 font-medium tracking-wide transition-all duration-200 
    ${disabled ? "bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed" : ""}
    ${!disabled && hasError
      ? "border-red-400 bg-red-50 text-red-900 placeholder:text-red-300"
      : !disabled && "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 hover:border-gray-300 focus:outline-none"
    }`;

  // Calculate max date for age restriction or current date limit
  const getMaxDate = () => {
    if (inputProps.type === 'date') {
      if (props.minAge) {
        const today = new Date();
        today.setFullYear(today.getFullYear() - props.minAge);
        return today.toISOString().split('T')[0];
      }
      if (inputProps.max === "current") {
        return new Date().toISOString().split("T")[0];
      }
    }
    return undefined;
  };

  const renderInputField = () => {
    // Get options for select fields
    const getSelectOptions = (): Array<{ value: string; label: string }> => {
      if (options) return options;
      const fieldName = inputProps.name as keyof typeof dropdownOptions;
      return (dropdownOptions[fieldName] || []) as Array<{
        value: string;
        label: string;
      }>;
    };

    switch (inputProps.type) {
      case "select":
        return (
          <motion.select
            id={id.toString()}
            name={inputProps.name}
            onChange={onChange}
            onBlur={handleBlur}
            className={`${commonClasses} appearance-none bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzNzQxNTEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtNiA5IDYgNiA2LTYiLz48L3N2Zz4=")] bg-no-repeat bg-[center_right_1rem] pr-10 cursor-pointer`}
            value={String(inputProps.value || "")}
            whileFocus="focus"
            variants={inputVariants}
            disabled={disabled}
          >
            <option value="">Select {label}</option>
            {getSelectOptions().map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </motion.select>
        );

      case "textarea":
        return (
          <motion.textarea
            id={id.toString()}
            name={inputProps.name}
            onChange={onChange}
            onBlur={handleBlur}
            placeholder={inputProps.placeholder}
            className={`${commonClasses} resize-y min-h-32`}
            value={String(inputProps.value || "")}
            whileFocus="focus"
            variants={inputVariants}
          />
        );

      case "checkbox":
        return (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border-2 border-gray-200 transition-colors hover:border-gray-300">
            <input
              type="checkbox"
              id={id.toString()}
              name={inputProps.name}
              onChange={(e) => {
                const syntheticEvent = {
                  target: {
                    name: e.target.name,
                    value: e.target.checked,
                    type: "checkbox",
                  },
                } as any;
                onChange(syntheticEvent);
              }}
              className="w-5 h-5 rounded border-gray-300 text-black focus:ring-0 focus:ring-offset-0 cursor-pointer accent-black"
              checked={Boolean(
                inputProps.value === "true" ||
                inputProps.value === true ||
                inputProps.value === "on" ||
                inputProps.value === 1
              )}
            />
            <label
              htmlFor={id.toString()}
              className="text-sm font-medium text-gray-900 cursor-pointer select-none"
            >
              {label}
            </label>
          </div>
        );

      case "email":
      case "tel":
      case "text":
      case "number":
      case "date":
      default:
        return (
          <motion.input
            id={id.toString()}
            type={inputProps.type || "text"}
            name={inputProps.name}
            onChange={onChange}
            onBlur={handleBlur}
            placeholder={inputProps.placeholder}
            className={commonClasses}
            value={String(inputProps.value || "")}
            max={getMaxDate()}
            whileFocus="focus"
            variants={inputVariants}
          />
        );
    }
  };

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={id.toString()}
          className="text-[11px] uppercase tracking-widest font-mono font-bold text-gray-600 flex items-center"
        >
          {label}
          {inputProps.required && (
            <span className="text-red-600 ml-1 text-base leading-3">*</span>
          )}
        </label>

        {/* Helper Button for Category Field */}
        {inputProps.name === "category" && (
          <button
            type="button"
            onClick={() => setIsCasteModalOpen(true)}
            className="flex items-center gap-1 text-[9px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded-full transition-colors cursor-pointer ml-2 border border-blue-100"
          >
            <FiSearch size={10} /> Find Category
          </button>
        )}

        {info && (
          <div className="relative" ref={tooltipRef}>
            <button
              type="button"
              onClick={() => setShowTooltip(!showTooltip)}
              className="text-gray-400 hover:text-gray-700 focus:outline-none transition-colors"
              aria-label="Information"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>

            {showTooltip && (
              <motion.div
                className="absolute left-0 top-5 z-50 w-56 p-3 bg-gray-900 text-white rounded-xl shadow-xl text-xs font-medium leading-relaxed"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                <p>{info}</p>
                <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {renderInputField()}

      {hasError && errorMessage && (
        <motion.p
          className="mt-1.5 text-xs text-red-600"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {errorMessage}
        </motion.p>
      )}

      {/* Render Modal if Category */}
      {inputProps.name === "category" && (
        <CasteHelperModal
          isOpen={isCasteModalOpen}
          onClose={() => setIsCasteModalOpen(false)}
        />
      )}
    </motion.div>
  );
};

export default FormInput;
