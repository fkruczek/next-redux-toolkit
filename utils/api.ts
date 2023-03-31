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

export async function appFetch(path: string) {
  return await fetch(process.env.API_URL + path, {
    next: { revalidate: 0 },
  }).then((res) => {
    if (res.status === 404) {
      return null;
    }
    return res.json();
  });
}
