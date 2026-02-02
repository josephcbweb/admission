"use client";
import React, { useState, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import FormInput from "@/components/FormInput";
import AdmissionCheck from "@/components/AdmissionCheck";
import SuccessModal from "@/components/SuccessModal";
import { getFieldsForProgram } from "@/utilities/form-data-v2";
import { FiArrowLeft, FiArrowRight, FiAlertCircle } from "react-icons/fi";

type ProgramType = "btech" | "mca" | "mtech";
type AdmissionTypeType = "regular" | "lateral" | "nri" | "management";

interface FormValues {
  [key: string]: string | number | boolean;
}

const AdmissionFormPage = () => {
  const [currentStep, setCurrentStep] = useState<
    "check" | "program-select" | "form" | "success"
  >("check");
  const [selectedProgram, setSelectedProgram] = useState<ProgramType | null>(
    null
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

  // Bus Service State
  const [buses, setBuses] = useState<any[]>([]);
  const [busStops, setBusStops] = useState<any[]>([]);
  const [loadingBuses, setLoadingBuses] = useState(false);
  const [loadingStops, setLoadingStops] = useState(false);

  useEffect(() => {
    if (formValues.busService) {
      setLoadingBuses(true);
      fetch("/api/bus/fetchbus")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setBuses(data);
          } else if (data && Array.isArray(data.buses)) {
            setBuses(data.buses);
          } else {
            console.error("Invalid bus data format", data);
            setBuses([]);
          }
          setLoadingBuses(false);
        })
        .catch((err) => {
          console.error("Failed to fetch buses", err);
          setLoadingBuses(false);
        });
    }
  }, [formValues.busService]);

  useEffect(() => {
    if (formValues.busId) {
      setLoadingStops(true);
      fetch(`/api/bus/busDetails/${formValues.busId}`)
        .then((res) => res.json())
        .then((data) => {
          setBusStops(data.stops || []);
          setLoadingStops(false);
        })
        .catch((err) => {
          console.error("Failed to fetch bus stops", err);
          setLoadingStops(false);
        });
    } else {
      setBusStops([]);
    }
  }, [formValues.busId]);

  const handleAdmissionsReady = useCallback((programs: string[]) => {
    setOpenPrograms(programs);
    // Don't automatically transition - let user select program
  }, []);

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
    >
  ) => {
    const { name, value, type } = e.target;
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
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    const fields = getFieldsForProgram(selectedProgram!, selectedAdmissionType);

    fields.forEach((field) => {
      const value = formValues[field.name];

      if (
        field.required &&
        (!value || (typeof value === "string" && !value.trim()))
      ) {
        errors[field.name] = field.errorMessage || `${field.label} is required`;
      }

      if (field.pattern && value && typeof value === "string") {
        if (!new RegExp(field.pattern).test(value)) {
          errors[field.name] =
            field.errorMessage || `${field.label} format is invalid`;
        }
      }
    });

    // Bus Service Validation
    if (formValues.busService) {
      if (!formValues.busId) {
        errors.busId = "Please select a bus route";
      }
      if (!formValues.busStopId) {
        errors.busStopId = "Please select a bus stop";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitError("Please fix the errors above before submitting.");
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
              "A student with this email or Aadhaar already exists."
          );
        } else {
          setSubmitError(
            data.message || "Failed to submit form. Please try again."
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
        "An error occurred while submitting your form. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadForm = async () => {
    try {
      const response = await fetch("/api/generate-docx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formValues,
          program: selectedProgram,
          admissionNumber: successData?.admissionNumber,
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

  // Step: Admission Check
  if (currentStep === "check") {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 pt-12">
        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
          {/* Hero Header */}
          <motion.div
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 mb-4">
              Admission Portal
            </h1>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-blue-500"></div>
              <p className="text-base sm:text-lg text-gray-600">
                Academic Year 2025-2026
              </p>
              <div className="h-px w-12 bg-blue-500"></div>
            </div>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
              Begin your journey towards excellence in engineering and
              technology
            </p>
          </motion.div>

          {/* Combined Admission Check and Program Selection */}
          <AdmissionCheck
            onAdmissionsReady={handleAdmissionsReady}
            onProgramSelect={handleProgramSelect}
          />
        </div>
      </div>
    );
  }

  // Step: Form
  if (currentStep === "form" && selectedProgram) {
    const groupedFields = {
      personal: fields.filter((f) =>
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].includes(f.id)
      ),
      parent: fields.filter((f) =>
        [20, 21, 22, 23, 24, 25, 26, 27].includes(f.id)
      ),
      address: fields.filter((f) =>
        [40, 41, 42, 43, 44, 45, 46, 47].includes(f.id)
      ),
      education: fields.filter((f) => f.id >= 60 && f.id < 90),
      entrance: fields.filter((f) => f.id >= 90 && f.id < 150),
      bank: fields.filter((f) => [150, 151, 152, 153].includes(f.id)),
      additional: fields.filter((f) => [160, 161, 162, 163].includes(f.id)), // UPDATED to include 162, 163
    };

    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => {
                setCurrentStep("check");
                setSelectedProgram(null);
              }}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm transition-colors mb-4 group cursor-pointer"
            >
              <FiArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
              Back to Program Selection
            </button>

            <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 border border-gray-200">
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-1">
                {selectedProgram === "btech"
                  ? "B.Tech Application Form"
                  : selectedProgram === "mca"
                  ? "MCA Application Form"
                  : "M.Tech Application Form"}
              </h1>
              <p className="text-gray-600 text-sm">
                Complete all required fields marked with{" "}
                <span className="text-red-500">*</span> to submit your
                application
              </p>
            </div>
          </motion.div>

          {/* Admission Type Selection (for B.Tech) */}
          {selectedProgram === "btech" && (
            <motion.div
              className="bg-white rounded-xl shadow-md p-5 sm:p-6 mb-6 border border-gray-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-base font-medium text-gray-900 mb-4">
                Admission Category
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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
                    className={`px-4 py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer ${
                      selectedAdmissionType === type
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {submitError && (
            <motion.div
              className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex gap-3">
                <FiAlertCircle
                  className="text-red-600 flex-shrink-0 mt-0.5"
                  size={18}
                />
                <div>
                  <p className="text-sm font-medium text-red-900 mb-1">
                    Submission Error
                  </p>
                  <p className="text-sm text-red-800">{submitError}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-5 sm:p-6 lg:p-8">
              {/* Personal Information Section */}
              {groupedFields.personal.length > 0 && (
                <FormSection
                  title="Personal Information"
                  description="Please provide your personal details accurately"
                  fields={groupedFields.personal}
                  formValues={formValues}
                  onChange={handleInputChange}
                  validationErrors={validationErrors}
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

              {/* Additional Information Section */}
              {groupedFields.additional.length > 0 && (
                <motion.div
                  className="mb-10 last:mb-0"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-1">
                      Additional Information
                    </h2>
                    <p className="text-sm text-gray-600">
                      Any other relevant details for your application
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Regular fields (textarea, etc.) */}
                    {groupedFields.additional
                      .filter(
                        (f) =>
                          ![
                            "hostelService",
                            "busService",
                            "applyForFeeConcession",
                          ].includes(f.name)
                      )
                      .map((field) => (
                        <div
                          key={field.id}
                          className={
                            field.type === "textarea" ? "lg:col-span-2" : ""
                          }
                        >
                          <FormInput
                            {...field}
                            onChange={handleInputChange}
                            value={formValues[field.name] || ""}
                          />
                        </div>
                      ))}

                    {/* Fee Concession Checkbox */}
                    {groupedFields.additional.some(
                      (f) => f.name === "applyForFeeConcession"
                    ) && (
                      <div className="lg:col-span-2">
                        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200 transition-all duration-200 hover:border-blue-300 hover:shadow-sm">
                          <input
                            type="checkbox"
                            id="applyForFeeConcession"
                            name="applyForFeeConcession"
                            checked={Boolean(formValues.applyForFeeConcession)}
                            onChange={handleInputChange}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                          />
                          <label
                            htmlFor="applyForFeeConcession"
                            className="text-sm text-gray-700 cursor-pointer flex-1 select-none"
                          >
                            <span className="font-semibold text-gray-900">
                              Apply for Fee Concession
                            </span>
                            <p className="text-xs text-gray-600 mt-1">
                              Check this box if you wish to apply for fee
                              concession based on income certificate or other
                              eligible criteria.
                            </p>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Hostel Service Checkbox */}
                    {groupedFields.additional.some(
                      (f) => f.name === "hostelService"
                    ) && (
                      <div className="lg:col-span-2">
                        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200 transition-all duration-200 hover:border-blue-300 hover:shadow-sm">
                          <input
                            type="checkbox"
                            id="hostelService"
                            name="hostelService"
                            checked={Boolean(formValues.hostelService)}
                            onChange={handleInputChange}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                          />
                          <label
                            htmlFor="hostelService"
                            className="text-sm text-gray-700 cursor-pointer flex-1 select-none"
                          >
                            <span className="font-semibold text-gray-900">
                              Avail Hostel Service
                            </span>
                            <p className="text-xs text-gray-600 mt-1">
                              Check this box if you wish to avail hostel
                              accommodation provided by the college. Hostel
                              facilities include furnished rooms, mess services,
                              and 24/7 security.
                            </p>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Bus Service Checkbox */}
                    {groupedFields.additional.some(
                      (f) => f.name === "busService"
                    ) && (
                      <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200 transition-all duration-200 hover:border-blue-300 hover:shadow-sm">
                          <input
                            type="checkbox"
                            id="busService"
                            name="busService"
                            checked={Boolean(formValues.busService)}
                            onChange={handleInputChange}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                          />
                          <label
                            htmlFor="busService"
                            className="text-sm text-gray-700 cursor-pointer flex-1 select-none"
                          >
                            <span className="font-semibold text-gray-900">
                              Avail Bus Service
                            </span>
                            <p className="text-xs text-gray-600 mt-1">
                              Check this box if you wish to avail the college
                              bus transportation service. Multiple routes
                              available covering major areas of the city.
                            </p>
                          </label>
                        </div>

                        {/* Bus Selection Dropdowns */}
                        {Boolean(formValues.busService) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-blue-200"
                          >
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Select Bus Route{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <select
                                name="busId"
                                value={(formValues.busId as string) || ""}
                                onChange={handleInputChange}
                                className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${
                                  validationErrors.busId ? "border-red-500" : ""
                                }`}
                                required
                              >
                                <option value="">Select a bus route</option>
                                {loadingBuses ? (
                                  <option disabled>Loading buses...</option>
                                ) : (
                                  buses.map((bus) => (
                                    <option
                                      key={bus._id || bus.id}
                                      value={bus._id || bus.id}
                                    >
                                      {bus.busNumber} - {bus.routeName}
                                    </option>
                                  ))
                                )}
                              </select>
                              {validationErrors.busId && (
                                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                  <FiAlertCircle size={12} />
                                  {validationErrors.busId}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Select Bus Stop{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <select
                                name="busStopId"
                                value={(formValues.busStopId as string) || ""}
                                onChange={handleInputChange}
                                className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${
                                  validationErrors.busStopId
                                    ? "border-red-500"
                                    : ""
                                }`}
                                required
                                disabled={!formValues.busId}
                              >
                                <option value="">Select a bus stop</option>
                                {loadingStops ? (
                                  <option disabled>Loading stops...</option>
                                ) : (
                                  busStops.map((stop) => (
                                    <option
                                      key={stop._id || stop.id}
                                      value={stop._id || stop.id}
                                    >
                                      {stop.stopName}
                                    </option>
                                  ))
                                )}
                              </select>
                              {validationErrors.busStopId && (
                                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                  <FiAlertCircle size={12} />
                                  {validationErrors.busStopId}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="bg-gray-50 border-t border-gray-200 p-5 sm:p-6">
              <motion.div
                className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3"
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
                  className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-white transition-all duration-200 cursor-pointer"
                >
                  Cancel Application
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-2.5 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg disabled:shadow-none flex items-center justify-center gap-2 cursor-pointer"
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
                        <div className="absolute inset-0 border-2 border-white border-t-transparent rounded-full"></div>
                      </motion.div>
                      <span>Submitting...</span>
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
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 pt-16">
        <SuccessModal
          isOpen={true}
          studentName={successData.studentName}
          admissionNumber={successData.admissionNumber}
          program={successData.program}
          onClose={handleSuccessClose}
          onDownload={handleDownloadForm}
        />
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
    >
  ) => void;
  validationErrors: { [key: string]: string };
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  fields,
  formValues,
  onChange,
  validationErrors,
}) => (
  <motion.div
    className="mb-10 last:mb-0"
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-1">{title}</h2>
      {description && <p className="text-sm text-gray-600">{description}</p>}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {fields.map((field) => (
        <div
          key={field.id}
          className={field.type === "textarea" ? "lg:col-span-2" : ""}
        >
          <FormInput
            {...field}
            onChange={onChange}
            value={formValues[field.name] || ""}
          />
        </div>
      ))}
    </div>
  </motion.div>
);

export default AdmissionFormPage;
