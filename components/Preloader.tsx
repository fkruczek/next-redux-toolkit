"use client";

import { store } from "@/store";
import { setStartupUser } from "@/store/usersSlice";
import { User } from "@/types";
import { useRef } from "react";

export default function Preloader({ users }: { users: User[] }) {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(setStartupUser(users));
    loaded.current = true;
  }

  return null;
}
