"use client";
import FormInput from "@/components/FormInput";
import { motion } from "motion/react";
import React, { useState } from "react";
import { inputs } from "../../utilities/form-data";
import { populateStudentInfo } from "@/db/statements";

const page = () => {
  const [values, setValues] = useState({
    name: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    religionOrCaste: "",
    dayScholar: "Day Scholar",
    admittedCategory: "",
    stateOfResidence: "",
    nationality: "",
    fathersName: "",
    mothersName: "",
    guardianName: "",
    occupation: "",
    relationShip: "",
    aadhar: "",
    emailIDStudent: "",
    emailIDFather: "",
    emailIDGuardian: "",
    permanentAddress: "",
    permanentAddressPhone: "",
    contactAddress: "",
    contactAddressPhone: "",
    localGuardianAddress: "",
    localGuardianAddressPhone: "",
    qualifiedExam: "",
    qualifiedExamRegisterNo: "",
    qualifiedExamInstitution: "",
    TCNumber: "",
    dateOfTC: "",
    TCIssuedInstitution: "",
    physics: "",
    chemistry: "",
    maths: "",
    marksOfQualifyingInstitutionType: "",
    marksOfQualifyingInstitution: "",
    entranceRollNumber: "",
    entranceRank: "",
    bankAccountNo: "",
    bankIFSCCode: "",
    bankName: "",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
    try {
      const response = await fetch("api/generate-docx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Failed to generate document");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${values.name}.docx`; // You can customize filename if needed
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("Document generation failed. Please try again.");
    }
  };

  return (
    <motion.div
      className="pt-20 md:pt-24 min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 px-4 md:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-6 md:p-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            College Admission Form
          </h1>
          <p className="text-gray-600">
            Please fill out all required fields to print your application
          </p>
          <div className="w-20 h-1 bg-primaryAccent mt-4 rounded-full"></div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {inputs.map((input, index) => (
            <motion.div
              key={input.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
            >
              <FormInput
                {...input}
                onChange={onChange}
                value={values[input.name as keyof typeof values]}
              />
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-10 flex flex-col sm:flex-row justify-end gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            type="submit"
            className="px-6 py-3 rounded-lg bg-primaryAccent text-white font-medium hover:bg-primaryAccentDark transition-colors shadow-md cursor-pointer"
            whileHover={{
              scale: 1.02,
              color: "black",
              boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Submit Application
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default page;
