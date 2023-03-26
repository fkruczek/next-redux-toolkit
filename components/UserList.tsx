"use client";

import { User } from "@/schema/user";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";

import UserTable from "./UserTable";

const UserList = () => {
  const sortBy = useAppSelector((state) => state.users.sortBy);
  const startupUsers = useAppSelector((state) => state.users.startupUsers);
  const data = useAppSelector(
    (state) => state.userApi.queries[`users("${sortBy}")`]?.data as User[]
  );

  return (
    <div className="grid justify-items-start">
      {/* TODO: Improve styles */}
      <Link href="/add" className="bg-blue-400 p-4 rounded-md text-white">
        Add user
      </Link>
      <UserTable users={data || startupUsers} />
    </div>
  );
};

export default UserList;
