import { UserInput } from "@/schema/user";
import { users } from "@/users-database";
import { errorResponse, successResponse } from "@/utils/api";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(req: Request, { params }: { params: Params }) {
  const userId = params["id"];

  if (typeof userId !== "string") {
    return errorResponse("Invalid user id");
  }

  const user = users.find((user) => user.id === parseInt(userId));

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

    const user = users.find((user) => user.id === parseInt(userId));

    if (!user) {
      return errorResponse("User not found", 404);
    }

    const body = await req.json();

    const { id, ...updatedUser } = UserInput.parse(body);

    Object.assign(user, updatedUser);

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

  const userIndex = users.findIndex((user) => user.id === parseInt(userId));

  if (userIndex === -1) {
    return errorResponse("User not found", 404);
  }

  users.splice(userIndex, 1);

  return successResponse("User deleted");
}
