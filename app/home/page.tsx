import Preloader from "@/components/Preloader";
import UserList from "@/components/UserList";
import { store } from "@/store";
import { setStartupUser } from "@/store/usersSlice";

export default async function Home() {
  const req = await fetch("http://localhost:3000/api/users");
  const data = await req.json();
  store.dispatch(setStartupUser(data));
  // TODO: error handling
  return (
    <main>
      <Preloader users={data} />
      <UserList />
    </main>
  );
}
