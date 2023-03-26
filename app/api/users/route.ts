import db from "@/prisma/db";
import { UserInput } from "@/schema/user";
import { errorResponse, successResponse } from "@/utils/api";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sortBy = searchParams.get("sortBy");

  const users = await db.user.findMany({
    orderBy: {
      [sortBy || "id"]: "asc",
    },
  });

  return successResponse(users);
}

export async function POST(req: Request, res: Response): Promise<NextResponse> {
  try {
    const requestBody = await req.json();
    const userInput = UserInput.parse(requestBody);

    const userInDb = await db.user.findUnique({
      where: {
        username: userInput.username,
      },
    });

    if (userInDb) {
      return errorResponse("User already exists", 400);
    }

    const user = await db.user.create({
      data: {
        username: userInput.username,
        city: userInput.city,
        email: userInput.email,
        name: userInput.name,
      },
    });

    return successResponse(user);
  } catch (error) {
    return errorResponse();
  }
}
