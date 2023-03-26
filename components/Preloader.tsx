"use client";

import { User } from "@/schema/user";
import { store } from "@/store";
import { setStartupUsers } from "@/store/usersSlice";
import { useRef } from "react";

export default function Preloader({ users }: { users: User[] }) {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(setStartupUsers(users));
    loaded.current = true;
  }

  return null;
}
