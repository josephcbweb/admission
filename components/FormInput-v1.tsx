import React, { useState } from "react";
import { motion } from "framer-motion";

interface FormInputProps {
  id: number;
  name: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  type?: string;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  required?: boolean;
  pattern?: string;
  value?: string;
}

const FormInput = (props: FormInputProps) => {
  const [isError, setIsError] = useState(false);
  const { label, onChange, id, errorMessage, ...inputProps } = props;

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (!inputProps.required) return;

    if (inputProps.required && !value.trim()) {
      setIsError(true);
      return;
    }

    if (inputProps.pattern && !new RegExp(inputProps.pattern).test(value)) {
      setIsError(true);
      return;
    }

    setIsError(false);
  };

  const inputVariants = {
    focus: {
      borderColor: "#4f46e5",
      boxShadow: "0 0 0 2px rgba(79, 70, 229, 0.2)",
      transition: { duration: 0.2 },
    },
    error: {
      borderColor: "#ef4444",
      boxShadow: "0 0 0 2px rgba(239, 68, 68, 0.2)",
      transition: { duration: 0.2 },
    },
  };

  const renderInputField = () => {
    const commonClasses = `w-full px-4 pb-3 pt-8 rounded-lg border focus:outline-none transition-colors duration-200 ${
      isError ? "border-red-500" : "border-gray-300"
    }`;

    switch (inputProps.name) {
      case "gender":
        return (
          <motion.select
            id={id.toString()}
            name={inputProps.name}
            onChange={onChange}
            onBlur={handleBlur}
            className={`${commonClasses} appearance-none bg-white bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjY3NWY3ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+")] bg-no-repeat bg-[center_right_1rem]`}
            value={inputProps.value || ""}
            whileFocus="focus"
            variants={inputVariants}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </motion.select>
        );

      case "bloodGroup":
        return (
          <motion.select
            id={id.toString()}
            onBlur={handleBlur}
            name={inputProps.name}
            onChange={onChange}
            className={`${commonClasses} appearance-none bg-white bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjY3NWY3ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+")] bg-no-repeat bg-[center_right_1rem]`}
            value={inputProps.value || ""}
            whileFocus="focus"
            variants={inputVariants}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </motion.select>
        );

      case "religionOrCaste":
        return (
          <motion.select
            id={id.toString()}
            onBlur={handleBlur}
            name={inputProps.name}
            onChange={onChange}
            className={`${commonClasses} appearance-none bg-white bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjY3NWY3ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+")] bg-no-repeat bg-[center_right_1rem]`}
            value={inputProps.value || ""}
            whileFocus="focus"
            variants={inputVariants}
          >
            <option value="">Select Religion / Caste</option>
            <option value="Hindu">Hindu</option>
            <option value="Muslim">Muslim</option>
            <option value="Christian">Christian</option>
            <option value="Sikh">Sikh</option>
            <option value="Jain">Jain</option>
            <option value="Buddhist">Buddhist</option>
            <option value="Other">Other</option>
          </motion.select>
        );

      case "dayScholar":
        return (
          <motion.select
            id={id.toString()}
            name={inputProps.name}
            onChange={onChange}
            onBlur={handleBlur}
            className={`${commonClasses} appearance-none bg-white bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjY3NWY3ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+")] bg-no-repeat bg-[center_right_1rem]`}
            value={inputProps.value || ""}
            whileFocus="focus"
            variants={inputVariants}
          >
            <option value="Day Scholar">Day Scholar</option>
            <option value="Hosteller">Hosteller</option>
          </motion.select>
        );

      case "admittedCategory":
        return (
          <motion.select
            id={id.toString()}
            name={inputProps.name}
            onBlur={handleBlur}
            onChange={onChange}
            className={`${commonClasses} appearance-none bg-white bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjY3NWY3ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+")] bg-no-repeat bg-[center_right_1rem]`}
            value={inputProps.value || ""}
            whileFocus="focus"
            variants={inputVariants}
          >
            <option value="">Select Category</option>
            <option value="General">General</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="EWS">SEBC</option>
            <option value="EWS">OEC</option>
          </motion.select>
        );

      case "stateOfResidence":
        return (
          <motion.select
            id={id.toString()}
            onBlur={handleBlur}
            name={inputProps.name}
            onChange={onChange}
            className={`${commonClasses} appearance-none bg-white bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjY3NWY3ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+")] bg-no-repeat bg-[center_right_1rem]`}
            value={inputProps.value || ""}
            whileFocus="focus"
            variants={inputVariants}
          >
            <option value="">Select State</option>
            <option value="Kerala">Kerala</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Telangana">Telangana</option>
            <option value="Other">Other</option>
          </motion.select>
        );

      case "relationShip":
        return (
          <motion.select
            id={id.toString()}
            name={inputProps.name}
            onChange={onChange}
            onBlur={handleBlur}
            className={`${commonClasses} appearance-none bg-white bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjY3NWY3ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+")] bg-no-repeat bg-[center_right_1rem]`}
            value={inputProps.value || ""}
            whileFocus="focus"
            variants={inputVariants}
          >
            <option value="">Select Relationship</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Guardian">Guardian</option>
            <option value="Brother">Brother</option>
            <option value="Sister">Sister</option>
            <option value="Other">Other</option>
          </motion.select>
        );
      case "marksOfQualifyingInstitutionType":
        return (
          <motion.select
            id={id.toString()}
            name={inputProps.name}
            onBlur={handleBlur}
            onChange={onChange}
            className={`${commonClasses} appearance-none bg-white bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjY3NWY3ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+")] bg-no-repeat bg-[center_right_1rem]`}
            value={inputProps.value || ""}
            whileFocus="focus"
            variants={inputVariants}
          >
            <option value="">Select Marks Format</option>
            <option value="Percentage">Percentage</option>
            <option value="CGPA">CGPA</option>
          </motion.select>
        );

      default:
        return (
          <motion.input
            className={commonClasses}
            onBlur={handleBlur}
            type={inputProps.type || "text"}
            {...inputProps}
            id={id.toString()}
            onChange={onChange}
            whileFocus="focus"
            variants={inputVariants}
            value={inputProps.value || ""}
          />
        );
    }
  };

  return (
    <motion.div
      className="flex flex-col mb-6 w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label
        htmlFor={inputProps.name}
        className="font-medium mb-2 text-gray-700 text-sm"
      >
        {label}
        {inputProps.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {renderInputField()}

      {isError && (
        <motion.span
          className="text-red-500 text-xs mt-1"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          {errorMessage}
        </motion.span>
      )}
    </motion.div>
  );
};

export default FormInput;
