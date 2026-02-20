"use client";
import React, { useState, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import FormInput from "@/components/FormInput";
import AdmissionCheck from "@/components/AdmissionCheck";
import SuccessModal from "@/components/SuccessModal";
import { getFieldsForProgram, dropdownOptions } from "@/utilities/form-data-v2";
import { FiArrowLeft, FiArrowRight, FiAlertCircle } from "react-icons/fi";

type ProgramType = "BTECH" | "MCA" | "MTECH";
type AdmissionTypeType = "regular" | "lateral" | "nri" | "management";

interface FormValues {
  [key: string]: string | number | boolean;
}

interface Department {
  id: number;
  name: string;
  department_code: string;
}

const AdmissionFormPage = () => {
  const [currentStep, setCurrentStep] = useState<
    "check" | "program-select" | "form" | "success"
  >("check");
  const [selectedProgram, setSelectedProgram] = useState<ProgramType | null>(
    null,
  );
  const [selectedAdmissionType, setSelectedAdmissionType] =
    useState<AdmissionTypeType>("regular");
  const [openPrograms, setOpenPrograms] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const [successData, setSuccessData] = useState<{
    studentName: string;
    admissionNumber: string;
    program: string;
  } | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);

  // Fetch departments when the form step is entered
  useEffect(() => {
    if (currentStep === "form" && departments.length === 0) {
      fetchDepartments();
    }
  }, [currentStep]);

  const fetchDepartments = async () => {
    setLoadingDepartments(true);
    try {
      const response = await fetch(
        `/api/admission/departments?program=${selectedProgram}`,
      );
      const data = await response.json();
      if (data.success && data.data) {
        setDepartments(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    } finally {
      setLoadingDepartments(false);
    }
  };

  const handleAdmissionsReady = useCallback((programs: string[]) => {
    setOpenPrograms(programs);
    // Don't automatically transition - let user select program
  }, []);

  // Warning on page reload/close if form has data
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (currentStep === "form" && Object.keys(formValues).length > 0) {
        e.preventDefault();
        e.returnValue = ""; // Required for Chrome
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentStep, formValues]);

  const handleProgramSelect = (program: string) => {
    setSelectedProgram(program as ProgramType);
    setSelectedAdmissionType("regular");
    setFormValues({});
    setValidationErrors({});
    setCurrentStep("form");
  };

  const handleAdmissionTypeChange = (type: AdmissionTypeType) => {
    setSelectedAdmissionType(type);
    // Clear form values when changing admission type to reset program-specific fields
    setFormValues({});
    setValidationErrors({});
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    // DEBUG: Log every input change to track if "phone" is updating
    console.log(`[DEBUG] Input Change: name='${name}', value='${value}'`);

    const actualValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormValues((prev) => ({
      ...prev,
      [name]: actualValue,
    }));

    // Clear error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Special handling for Religion Change
    if (name === "religion") {
      const selectedReligion = actualValue as string;
      const casteOptions = dropdownOptions.casteData[selectedReligion];

      if (selectedReligion === "Other") {
        setFormValues((prev) => ({
          ...prev,
          [name]: actualValue,
          caste: "Other", // Auto-select 'Other' for caste
        }));
      } else if (
        casteOptions?.length === 1 &&
        casteOptions[0].value === "NA"
      ) {
        setFormValues((prev) => ({
          ...prev,
          [name]: actualValue,
          caste: "NA", // Auto-select 'NA'
        }));
      }
    }
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    const fields = getFieldsForProgram(selectedProgram!, selectedAdmissionType);

    console.log(`Starting validation for ${selectedProgram} - ${selectedAdmissionType}`);
    console.group("Field Validation Details");

    fields.forEach((field) => {
      // Skip validation if field is not for this admission type
      if (
        field.admissionTypes &&
        !field.admissionTypes.includes(selectedAdmissionType)
      ) {
        // console.log(`Skipping ${field.name} (Admission Type Mismatch)`);
        return;
      }

      const value = formValues[field.name];

      // Check dependsOn visibility
      if (field.dependsOn) {
        const dependentValue = formValues[field.dependsOn];
        // If dependsOnValue is defined, check strict equality
        if (field.dependsOnValue !== undefined) {
          if (dependentValue !== field.dependsOnValue) {
            // console.log(`Skipping ${field.name} (Dependency not met: ${field.dependsOn} != ${field.dependsOnValue})`);
            return;
          }
        } else {
          // If no specific value required, just check if truthy (standard dependency)
          if (!dependentValue) {
            // console.log(`Skipping ${field.name} (Dependency not met: ${field.dependsOn} is falsy)`);
            return;
          }
        }
      }

      // Log the field being validated
      // console.log(`Validating ${field.name}:`, { required: field.required, value });

      if (field.required && (!value || (typeof value === "string" && !value.trim()))) {
        console.warn(`Validation Error: ${field.name} is required. Value: "${value}"`);
        errors[field.name] = field.errorMessage || `${field.label} is required`;
      }

      if (field.pattern && value && typeof value === "string") {
        const trimmedValue = value.trim();
        // DEBUG: Log the exact pattern and value being tested
        if (field.name.includes("Pincode")) {
          console.log(`[DEBUG] Testing ${field.name}: value='${trimmedValue}', pattern='${field.pattern}'`);
        }

        if (!new RegExp(field.pattern).test(trimmedValue)) {
          console.warn(`Validation Error: ${field.name} pattern mismatch. Value: "${value}" (Trimmed: "${trimmedValue}")`);
          errors[field.name] = field.errorMessage || `${field.label} format is invalid`;
        }
      }

      // Age Validation
      if (field.minAge && value && typeof value === "string") {
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        if (age < field.minAge) {
          console.warn(`Validation Error: ${field.name} age too low (${age}).`);
          errors[field.name] = `You must be at least ${field.minAge} years old.`;
        }
      }
    });

    console.groupEnd();

    if (Object.keys(errors).length > 0) {
      console.error("Validation Failed Keys:", Object.keys(errors));
      console.error("Validation Failed Object:", JSON.stringify(errors, null, 2));
    } else {
      console.log("Validation Successful");
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      const errorFields = Object.keys(validationErrors).join(", ");
      setSubmitError(`Please fix errors in: ${errorFields}`);

      // Scroll to first error field
      const firstErrorField = document.querySelector(".border-red-500");
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        program: selectedProgram,
        admissionType: selectedAdmissionType,
        ...formValues,
      };

      const response = await fetch("/api/admission/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setSubmitError(
            data.message ||
            "A student with this email or Aadhaar already exists.",
          );
        } else {
          setSubmitError(
            data.message || "Failed to submit form. Please try again.",
          );
        }
        return;
      }

      // Success - show modal
      setSuccessData({
        studentName: formValues.name as string,
        admissionNumber: data.admissionNumber,
        program: selectedProgram!,
      });
      setCurrentStep("success");
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(
        "An error occurred while submitting your form. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadForm = async () => {
    try {
      // Get the preferred department name for the document
      const preferredDeptId = formValues.preferredDepartment;
      const preferredDept = departments.find(
        (d) => d.id.toString() === preferredDeptId,
      );

      const response = await fetch("/api/generate-docx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formValues,
          program: selectedProgram,
          admissionNumber: successData?.admissionNumber,
          admissionType: selectedAdmissionType,
          preferredDepartmentName: preferredDept
            ? `${preferredDept.name} (${preferredDept.department_code})`
            : "",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate document");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${successData?.admissionNumber || "admission-form"}.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download form. Please try again.");
    }
  };

  const handleSuccessClose = () => {
    setCurrentStep("check");
    setSelectedProgram(null);
    setFormValues({});
    setValidationErrors({});
    setSuccessData(null);
  };

  const fields = selectedProgram
    ? getFieldsForProgram(selectedProgram, selectedAdmissionType)
    : [];

  // Department options for dynamic dropdown
  const departmentOptions = departments.map((dept) => ({
    value: dept.id.toString(),
    label: `${dept.name} (${dept.department_code})`,
  }));

  // Caste options based on religion
  const currentReligion = formValues.religion as string;
  const casteOptions =
    currentReligion && dropdownOptions.casteData[currentReligion]
      ? dropdownOptions.casteData[currentReligion]
      : [];

  // Step: Admission Check
  if (currentStep === "check") {
    return (
      <AdmissionCheck
        onAdmissionsReady={handleAdmissionsReady}
        onProgramSelect={handleProgramSelect}
      />
    );
  }

  // Step: Form
  if (currentStep === "form" && selectedProgram) {
    const groupedFields = {
      personal: fields.filter((f) =>
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 999].includes(f.id),
      ),
      parent: fields.filter((f) =>
        [20, 21, 22, 23, 24, 25, 26, 27, 210, 230].includes(f.id),
      ),
      address: fields.filter((f) =>
        [40, 41, 42, 43, 44, 45, 46, 47, 460].includes(f.id),
      ),
      education: fields.filter(
        (f) =>
          (f.id >= 60 && f.id < 90) || // Common + BTech + TC
          (f.id >= 100 && f.id < 110) || // MCA Education
          (f.id >= 120 && f.id < 130) || // MTech Education
          [601, 602, 603].includes(f.id), // Special Qualifying Exams
      ),
      entrance: fields.filter(
        (f) =>
          (f.id >= 90 && f.id < 100) || // BTech Entrance
          (f.id >= 110 && f.id < 120) || // MCA Entrance
          (f.id >= 130 && f.id < 140) || // MTech Entrance
          (f.id >= 170 && f.id < 180), // NRI Entrance
      ),
      bank: fields.filter((f) => [150, 151, 152, 153].includes(f.id)),
      additional: fields.filter((f) => [160, 161, 162, 163].includes(f.id)),
    };

    return (
      <div className="min-h-screen w-full bg-white pt-24 pb-12 font-sans text-gray-900 selection:bg-[#ccff00] selection:text-black relative">
        {/* Noise Overlay - Very Subtle */}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.015] mix-blend-multiply">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilterForm">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilterForm)" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => {
                setCurrentStep("check");
                setSelectedProgram(null);
              }}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#1a1917]/50 hover:text-[#1a1917] transition-colors mb-6 group cursor-pointer"
            >
              <FiArrowLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
              Back to Selection
            </button>

            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                {/* Decorative Icon based on program */}
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                </svg>
              </div>

              <div className="relative z-10">
                <span className="inline-block px-3 py-1 mb-4 rounded-full border border-gray-200 bg-gray-50 text-[10px] font-mono uppercase tracking-widest text-gray-500">
                  Academic Year 2025-26
                </span>
                <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-4 leading-tight">
                  {selectedProgram === "BTECH"
                    ? "B.Tech Application"
                    : selectedProgram === "MCA"
                      ? "MCA Application"
                      : "M.Tech Application"}
                </h1>
                <p className="text-gray-600 text-lg font-light max-w-2xl">
                  Please ensure all details are accurate. Fields marked with{" "}
                  <span className="text-red-600 bg-red-50 px-1 rounded text-xs font-bold inline-block align-middle">
                    *
                  </span>{" "}
                  are mandatory.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Admission Type Selection */}
          <motion.div
            className="bg-white rounded-[2rem] p-8 mb-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500 mb-6">
              Admission Category
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries({
                regular: "Regular",
                lateral: "Lateral Entry",
                nri: "NRI Quota",
                management: "Management",
              }).map(([type, label]) => (
                <button
                  key={type}
                  onClick={() =>
                    handleAdmissionTypeChange(type as AdmissionTypeType)
                  }
                  className={`px-6 py-4 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer border-2 ${selectedAdmissionType === type
                    ? "bg-[#ccff00] border-[#ccff00] text-black shadow-lg"
                    : "bg-gray-50 border-transparent text-gray-600 hover:bg-white hover:border-gray-200 hover:text-gray-900"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Error Message */}
          {submitError && (
            <motion.div
              className="bg-red-50/50 border border-red-200 rounded-2xl p-6 mb-8 backdrop-blur-sm"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-red-100 rounded-full text-red-600">
                  <FiAlertCircle size={20} />
                </div>
                <div>
                  <p className="font-serif text-lg text-red-900 mb-1">
                    Submission Error
                  </p>
                  <p className="text-sm text-red-800/80 leading-relaxed font-medium">
                    {submitError}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-8 md:p-12 space-y-16">
              {/* Personal Information Section */}
              {groupedFields.personal.length > 0 && (
                <FormSection
                  title="Personal Information"
                  description="Please provide your personal details accurately"
                  fields={groupedFields.personal}
                  formValues={formValues}
                  onChange={handleInputChange}
                  validationErrors={validationErrors}
                  dynamicOptions={{
                    preferredDepartment: departmentOptions,
                    caste: casteOptions,
                  }}
                />
              )}

              {/* Parent Information Section */}
              {groupedFields.parent.length > 0 && (
                <FormSection
                  title="Parent/Guardian Information"
                  description="Provide complete details about your parents or legal guardian"
                  fields={groupedFields.parent}
                  formValues={formValues}
                  onChange={handleInputChange}
                  validationErrors={validationErrors}
                />
              )}

              {/* Address Information Section */}
              {groupedFields.address.length > 0 && (
                <FormSection
                  title="Address Information"
                  description="Enter your residential and contact addresses"
                  fields={groupedFields.address}
                  formValues={formValues}
                  onChange={handleInputChange}
                  validationErrors={validationErrors}
                />
              )}

              {/* Education Information Section */}
              {groupedFields.education.length > 0 && (
                <FormSection
                  title="Education Information"
                  description="Provide details about your educational qualifications"
                  fields={groupedFields.education}
                  formValues={formValues}
                  onChange={handleInputChange}
                  validationErrors={validationErrors}
                />
              )}

              {/* Entrance Exam Section */}
              {groupedFields.entrance.length > 0 && (
                <FormSection
                  title="Entrance Exam Details"
                  description="Enter your entrance examination scores and rankings"
                  fields={groupedFields.entrance}
                  formValues={formValues}
                  onChange={handleInputChange}
                  validationErrors={validationErrors}
                />
              )}

              {/* Bank Information Section */}
              {groupedFields.bank.length > 0 && (
                <FormSection
                  title="Bank Account Information"
                  description="Required for scholarship disbursement and refund processing"
                  fields={groupedFields.bank}
                  formValues={formValues}
                  onChange={handleInputChange}
                  validationErrors={validationErrors}
                />
              )}
            </div>

            {/* Submit Buttons */}
            <div className="bg-gray-50 border-t border-gray-100 p-8 md:p-10">
              <motion.div
                className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep("check");
                    setSelectedProgram(null);
                  }}
                  className="px-8 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-100 hover:text-black transition-all duration-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-10 py-4 rounded-full bg-[#ccff00] text-black font-bold text-sm hover:shadow-[0_0_20px_rgba(204,255,0,0.5)] hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="relative w-4 h-4"
                      >
                        <div className="absolute inset-0 border-2 border-black/30 border-t-black rounded-full"></div>
                      </motion.div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <FiArrowRight size={16} />
                    </>
                  )}
                </button>
              </motion.div>
            </div>
          </motion.form>
        </div>
      </div>
    );
  }

  // Step: Success
  if (currentStep === "success" && successData) {
    return (
      <div className="min-h-screen w-full bg-[#fbfbf6] flex items-center justify-center p-4 pt-16 font-sans text-[#1a1917]">
        <div className="relative z-10 w-full max-w-2xl">
          {/* Noise Overlay applied to success page logic if needed, but the modal usually covers it. Let's keep bg consistent */}
          <SuccessModal
            isOpen={true}
            studentName={successData.studentName}
            admissionNumber={successData.admissionNumber}
            program={successData.program}
            onClose={handleSuccessClose}
            onDownload={handleDownloadForm}
          />
        </div>
      </div>
    );
  }

  return null;
};

// Helper component for form sections
interface FormSectionProps {
  title: string;
  description?: string;
  fields: any[];
  formValues: FormValues;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  validationErrors: { [key: string]: string };
  dynamicOptions?: { [fieldName: string]: { value: string; label: string }[] };
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  fields,
  formValues,
  onChange,
  validationErrors,
  dynamicOptions = {},
}) => (
  <motion.div
    className="mb-12 last:mb-0"
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-8 border-b border-black/5 pb-4">
      <h2 className="text-2xl font-serif text-[#1a1917] mb-2">{title}</h2>
      {description && (
        <p className="text-sm font-mono text-[#1a1917]/50 uppercase tracking-wide">
          {description}
        </p>
      )}
    </div>

    {/* Validation Errors Summary */}
    {(() => {
      const sectionErrors = fields
        .map((field) => ({
          name: field.name,
          label: field.label,
          error: validationErrors[field.name],
        }))
        .filter((item) => item.error);

      if (sectionErrors.length === 0) return null;

      return (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <h4 className="flex items-center gap-2 text-red-800 font-bold mb-2">
            <FiAlertCircle />
            Please fix the following errors:
          </h4>
          <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
            {sectionErrors.map((item) => (
              <li key={item.name}>
                <span className="font-medium">{item.label}:</span> {item.error}
              </li>
            ))}
          </ul>
        </motion.div>
      );
    })()}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields
        .filter((field) => {
          if (!field.dependsOn) return true;
          const dependencyValue = formValues[field.dependsOn];
          // If value is boolean true, it might be stored as true (checkbox).
          // dependsOnValue might be "true" string or boolean.
          // Let's assume strict equality or handling.
          // FormValues stores checkbox as boolean.
          if (field.dependsOnValue === undefined) return !!dependencyValue; // If depends on existence/truthiness

          if (Array.isArray(field.dependsOnValue)) {
            return field.dependsOnValue.includes(dependencyValue as string);
          }
          return dependencyValue === field.dependsOnValue;
        })
        .map((field) => (
          <div
            key={field.id}
            className={field.type === "textarea" ? "md:col-span-2" : ""}
          >
            <FormInput
              id={field.id}
              name={field.name}
              label={field.label}
              type={field.type}
              required={field.required}
              placeholder={field.placeholder}
              info={field.info}
              minAge={field.minAge}
              max={field.max}
              pattern={field.pattern}
              options={dynamicOptions[field.name] || field.options}
              onChange={onChange}
              value={formValues[field.name] || ""}
              errorMessage={validationErrors[field.name] || field.errorMessage}
              isInvalid={!!validationErrors[field.name]}
              disabled={
                field.name === "caste" &&
                (formValues["religion"] === "Other" ||
                  dropdownOptions.casteData[
                    formValues["religion"] as string
                  ]?.[0]?.value === "NA")
              }
            />
          </div>
        ))}
    </div>
  </motion.div>
);

export default AdmissionFormPage;
