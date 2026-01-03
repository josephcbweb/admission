import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

/**
 * GET /api/admission/status
 *
 * Returns the current admission status for all programs.
 * Checks if admissions are open based on AdmissionWindow records in the database.
 */

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/admission/status`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch admission status");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching admission status:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch admission status",
        admissionsOpen: {
          btech: {
            open: false,
            deadline: "",
            description: "Service unavailable",
          },
          mca: {
            open: false,
            deadline: "",
            description: "Service unavailable",
          },
          mtech: {
            open: false,
            deadline: "",
            description: "Service unavailable",
          },
        },
      },
      { status: 500 }
    );
  }
}
