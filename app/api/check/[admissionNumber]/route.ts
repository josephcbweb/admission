import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

export async function GET(
    request: NextRequest,
    { params }: { params: { admissionNumber: string } }
) {
    try {
        const admissionNumber = params.admissionNumber;

        if (!admissionNumber) {
            return NextResponse.json(
                { success: false, error: "Admission number is required" },
                { status: 400 }
            );
        }

        const response = await fetch(
            `${BACKEND_URL}/api/admission/check/${admissionNumber}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error fetching admission status:", error);
        return NextResponse.json(
            {
                success: false,
                error: "FetchError",
                message: "Failed to fetch status. Please try again later.",
            },
            { status: 500 }
        );
    }
}
