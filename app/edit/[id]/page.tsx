import UserForm from "@/components/UserForm";
import { User } from "@/schema/user";
import { appFetch } from "@/utils/api";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";

async function getUser(id: string) {
  const data = await appFetch(`users/${id}`);

  if (!data) {
    notFound();
  }
  return User.parse(data);
}

export default async function Edit({ params }: { params: Params }) {
  const userId = params["id"];

  if (typeof userId !== "string") {
    throw new Error("Invalid user id");
  }

  const user = await getUser(userId);

  return <UserForm defaultValues={user} />;
}
