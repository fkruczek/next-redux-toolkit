import { User, UserInput } from "@/schema/user";
import { users } from "@/users-database";
import { errorResponse, successResponse } from "@/utils/api";
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

  return successResponse(users);
}

export async function POST(req: Request, res: Response): Promise<NextResponse> {
  try {
    const requestBody = await req.json();

    const userInput = UserInput.parse(requestBody);

    if (users.find((u) => u.email === userInput.email)) {
      return errorResponse("Email already exists");
    }

    const newUser: User = {
      ...userInput,
      id: new Date().getTime(),
    };

    users.push(newUser);

    return successResponse(newUser);
  } catch (error) {
    return errorResponse();
  }
}
