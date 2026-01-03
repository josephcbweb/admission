import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admission Form",
  description: "Admission form for College Of Engineering, Cherthala",
};
const layout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default layout;
