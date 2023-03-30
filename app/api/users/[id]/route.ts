import { prisma } from "@/prisma/db";
import { UserInput } from "@/schema/user";
import { errorResponse, successResponse } from "@/utils/api";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(req: Request, { params }: { params: Params }) {
  const userId = params["id"];

  if (typeof userId !== "string") {
    return errorResponse("Invalid user id");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return errorResponse("User not found", 404);
  }

  return successResponse(user);
}

export async function PUT(req: Request, { params }: { params: Params }) {
  try {
    const userId = params["id"];

    if (typeof userId !== "string") {
      return errorResponse("Invalid user id");
    }

    const body = await req.json();

    const userInDb = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userInDb) {
      return errorResponse("User not found", 404);
    }

    const { id, ...updatedUser } = UserInput.parse(body);

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: updatedUser,
    });

    return successResponse(user);
  } catch {
    return errorResponse();
  }
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  const userId = params["id"];

  if (typeof userId !== "string") {
    return errorResponse("Invalid user id");
  }

  const userInDb = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userInDb) {
    return errorResponse("User not found", 404);
  }

  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  return successResponse("User deleted");
}
