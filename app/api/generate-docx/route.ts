import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { populateStudentInfo } from "@/db/statements";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/api/generate-docx`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    // Get the blob from the backend
    const blob = await response.blob();

    // Return the blob as a download
    return new NextResponse(blob, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="admission-form-${
          body.program
        }-${Date.now()}.docx"`,
      },
    });
  } catch (error) {
    console.error("Error generating DOCX:", error);
    return NextResponse.json(
      {
        success: false,
        error: "GenerationError",
        message: "Failed to generate document. Please try again.",
      },
      { status: 500 }
    );
  }
}
