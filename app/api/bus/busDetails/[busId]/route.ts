import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ busId: string }> }
) {
  try {
    const { busId } = await params;
    const response = await fetch(`${BACKEND_URL}/bus/busDetails/${busId}`);
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch bus details" },
      { status: 500 }
    );
  }
}
