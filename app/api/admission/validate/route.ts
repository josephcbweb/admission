import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

/**
 * POST /api/admission/validate
 *
 * Validates email and aadhaar uniqueness before form submission.
 * Helps provide immediate feedback if a student already exists.
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/api/admission/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error validating admission data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "ValidationError",
        message: "Failed to validate data. Please try again.",
      },
      { status: 500 }
    );
  }
}
