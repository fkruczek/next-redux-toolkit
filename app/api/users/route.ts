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
  users.push({
    id: users.length + 1,
    name: "test",
    username: "test",
    city: "test",
    email: "test",
  });

  return NextResponse.json("ok");
}
