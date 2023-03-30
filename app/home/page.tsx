import Preloader from "@/components/Preloader";
import UserList from "@/components/UserList";
import { UserArray } from "@/schema/user";
import { store } from "@/store";
import { setStartupUsers } from "@/store/usersSlice";

async function getUsers() {
  // TODO: api url from config
  const req = await fetch("http://localhost:3000/api/users", {
    next: { revalidate: 0 },
  });
  const data = await req.json();

  return UserArray.parse(data);
}

export default async function Home() {
  const users = await getUsers();
  console.log("in page", users);
  store.dispatch(setStartupUsers(users));
  // TODO: error handling
  return (
    <>
      <Preloader users={users} />
      <UserList />
    </>
  );
}
