"use client";

import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/store";

import { User } from "@/types";

import Link from "next/link";
import UserTable from "./UserTable";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const UserList = () => {
  const sortBy = useAppSelector((state) => state.users.sortBy);
  const startupUsers = useAppSelector((state) => state.users.startupUsers);
  const data = useAppSelector(
    (state) => state.userApi.queries[`users("${sortBy}")`]?.data as User[]
  );

  return (
    <div className="grid justify-items-start">
      {/* Improve styles */}
      <Link href="/add" className="bg-blue-400 p-4 rounded-md text-white">
        Add user
      </Link>
      <UserTable users={data || startupUsers} />
    </div>
  );
};

export default UserList;
