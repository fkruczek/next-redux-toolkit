import { prisma } from "@/prisma/db";
import { SortBy, UserInput } from "@/schema/user";
import { errorResponse, successResponse } from "@/utils/api";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sortBy = searchParams.get("sortBy");

  try {
    const validSortBy = SortBy.parse(sortBy || "id");

    const users = await prisma.user.findMany({
      orderBy: {
        [validSortBy]: "asc",
      },
    });

    return successResponse(users);
  } catch {
    return errorResponse();
  }
}

export async function POST(req: Request, res: Response): Promise<NextResponse> {
  try {
    const requestBody = await req.json();
    const userInput = UserInput.parse(requestBody);

    const userInDb = await prisma.user.findUnique({
      where: {
        username: userInput.username,
      },
    });

    if (userInDb) {
      return errorResponse("User already exists", 400);
    }

    const user = await prisma.user.create({
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
