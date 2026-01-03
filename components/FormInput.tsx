import React, { useState } from "react";
import { motion } from "framer-motion";
import { FormFieldConfig, dropdownOptions } from "@/utilities/form-data-v2";

interface FormInputProps extends FormFieldConfig {
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  value?: string | number | boolean;
}

const FormInput = (props: FormInputProps) => {
  const [isError, setIsError] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const { label, onChange, id, errorMessage, info, ...inputProps } = props;

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
    if (!inputProps.required) return;

    if (inputProps.required && !value.toString().trim()) {
      setIsError(true);
      return;
    }

    if (
      inputProps.pattern &&
      !new RegExp(inputProps.pattern).test(value.toString())
    ) {
      setIsError(true);
      return;
    }

    setIsError(false);
  };

  const inputVariants = {
    focus: {
      borderColor: "#4f46e5",
      transition: { duration: 0.2 },
    },
    error: {
      borderColor: "#ef4444",
      transition: { duration: 0.2 },
    },
  };

  const commonClasses = `w-full px-3 py-2.5 text-sm rounded-md border focus:outline-none transition-colors duration-200 ${
    isError
      ? "border-red-400 bg-red-50"
      : "border-gray-300 bg-white focus:border-primaryAccent"
  }`;

  const renderInputField = () => {
    // Get options for select fields
    const getSelectOptions = (): Array<{ value: string; label: string }> => {
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
            className={`${commonClasses} appearance-none bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2NjY2NjYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtNiA5IDYgNiA2LTYiLz48L3N2Zz4=")] bg-no-repeat bg-[center_right_0.75rem] pr-9 cursor-pointer`}
            value={String(inputProps.value || "")}
            whileFocus="focus"
            variants={inputVariants}
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
            className={`${commonClasses} resize-y min-h-24 max-h-48`}
            value={String(inputProps.value || "")}
            whileFocus="focus"
            variants={inputVariants}
          />
        );

      case "checkbox":
        return (
          <div className="flex items-center gap-2">
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
              className="w-4 h-4 rounded border-gray-300 text-primaryAccent focus:ring-1 focus:ring-primaryAccent cursor-pointer"
              checked={Boolean(
                inputProps.value === "true" ||
                  inputProps.value === true ||
                  inputProps.value === "on" ||
                  inputProps.value === 1
              )}
            />
            <label
              htmlFor={id.toString()}
              className="text-sm text-gray-700 cursor-pointer"
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
      <div className="flex items-center gap-2 mb-1.5">
        <label htmlFor={id.toString()} className="text-sm text-gray-700">
          {label}
          {inputProps.required && (
            <span className="text-red-500 ml-0.5">*</span>
          )}
        </label>

        {info && (
          <div className="relative" ref={tooltipRef}>
            <button
              type="button"
              onClick={() => setShowTooltip(!showTooltip)}
              className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
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
                className="absolute left-0 top-5 z-50 w-56 p-2.5 bg-gray-800 text-white rounded-md shadow-lg text-xs"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                <p className="leading-relaxed">{info}</p>
                <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {renderInputField()}

      {isError && errorMessage && (
        <motion.p
          className="mt-1.5 text-xs text-red-600"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {errorMessage}
        </motion.p>
      )}
    </motion.div>
  );
};

export default FormInput;
