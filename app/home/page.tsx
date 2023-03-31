import Preloader from "@/components/Preloader";
import UserList from "@/components/UserList";
import { UserArray } from "@/schema/user";
import { store } from "@/store";
import { setStartupUsers } from "@/store/usersSlice";
import { appFetch } from "@/utils/api";

async function getUsers() {
  const data = await appFetch("users");
  return UserArray.parse(data);
}

export default async function Home() {
  const users = await getUsers();
  store.dispatch(setStartupUsers(users));
  return (
    <>
      <Preloader users={users} />
      <UserList />
    </>
  );
}
