import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

/**
 * GET /api/admission/departments
 *
 * Fetches available departments for the admission form dropdown.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const program = searchParams.get("program");

    const url = new URL(`${BACKEND_URL}/api/admission/departments`);
    if (program) {
      url.searchParams.set("program", program);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching departments:", error);
    return NextResponse.json(
      {
        success: false,
        error: "FetchError",
        message: "Failed to fetch departments. Please try again later.",
      },
      { status: 500 },
    );
  }
}
