import { NextResponse } from "next/server";

export function successResponse<TData>(data: TData) {
  return NextResponse.json(data, { status: 200 });
}

export function errorResponse(
  message: string = "Invalid request body",
  status = 400
) {
  return NextResponse.json({ message }, { status });
}
