import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

/**
 * POST /api/admission/submit
 *
 * This endpoint receives the admission form data and stores it in the database.
 * It validates the data, checks for duplicates, and returns an admission number.
 *
 * Expected Request Body:
 * {
 *   program: "btech" | "mca" | "mtech",
 *   admissionType: "regular" | "lateral" | "nri" | "management",
 *   personalInfo: {...},
 *   parentInfo: {...},
 *   addressInfo: {...},
 *   educationInfo: {...},
 *   entranceInfo: {...},
 *   bankInfo: {...},
 *   additionalInfo: {...}
 * }
 *
 * Response:
 * {
 *   success: true,
 *   studentId: number,
 *   admissionNumber: string,
 *   message: string,
 *   formUrl: string
 * }
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Proxying submission to backend:", `${BACKEND_URL}/api/admission/submit`);
    console.log("Payload:", JSON.stringify(body, null, 2));

    const response = await fetch(`${BACKEND_URL}/api/admission/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("Backend response status:", response.status);
    console.log("Backend response data:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error submitting admission form:", error);
    return NextResponse.json(
      {
        success: false,
        error: "SubmissionError",
        message: "Failed to submit form. Please try again later.",
      },
      { status: 500 }
    );
  }
}
