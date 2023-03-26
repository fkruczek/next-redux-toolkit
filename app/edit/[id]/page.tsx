import UserForm from "@/components/UserForm";
import { User } from "@/schema/user";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

async function getUser(id: string) {
  // TODO: api url from config
  const data = await fetch("http://localhost:3000/api/users/" + id).then(
    (res) => res.json()
  );

  const user = User.parse(data);
  return user;
}

export default async function Edit({ params }: { params: Params }) {
  const userId = params["id"];

  if (typeof userId !== "string") {
    throw new Error("Invalid user id");
  }

  const user = await getUser(userId);

  return <UserForm {...user} />;
}
