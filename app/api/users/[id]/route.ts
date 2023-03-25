import { users } from "@/users-database";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: Params }) {
  const userId = params["id"];

  // TODO: error handling
  if (typeof userId !== "string") {
    return NextResponse.json("Id param is required", { status: 400 });
  }

  const index = users.findIndex((user) => user.id === parseInt(userId));
  users.splice(index, 1);

  return NextResponse.json(
    {
      message: "User deleted",
    },
    { status: 200 }
  );
}
