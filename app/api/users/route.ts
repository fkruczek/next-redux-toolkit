import { UserInput } from "@/schema/user";
import { users } from "@/users-database";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sortBy = searchParams.get("sortBy");
  if (sortBy === "username") {
    users.sort((a, b) => a.username.localeCompare(b.username));
  }

  if (sortBy === "id") {
    users.sort((a, b) => a.id - b.id);
  }

  return NextResponse.json(users);
}

export async function POST(req: Request, res: Response) {
  const requestBody = await req.json();

  try {
    UserInput.parse(requestBody);
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }

  if (users.find((u) => u.email === requestBody.email)) {
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 400 }
    );
  }

  const newUser = {
    id: new Date().getTime(),
    ...requestBody,
  };

  users.push(newUser);

  return NextResponse.json(newUser);
}
