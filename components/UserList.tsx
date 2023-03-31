"use client";

import { User } from "@/schema/user";
import { useAppSelector } from "@/store/hooks";
import AppLink from "./AppLink";
import ConfirmRemoveUserDialog from "./ConfirmRemoveUserDialog";

import UserTable from "./UserTable";

const UserList = () => {
  const sortBy = useAppSelector((state) => state.users.sortBy);
  const startupUsers = useAppSelector((state) => state.users.startupUsers);
  const data = useAppSelector(
    (state) => state.userApi.queries[`users("${sortBy}")`]?.data as User[]
  );

  return (
    <div className="flex flex-col gap-10">
      <AppLink href="/add" data-cy="add-user">
        Add user
      </AppLink>
      <div className="overflow-auto">
        <UserTable users={data || startupUsers} />
      </div>
      <ConfirmRemoveUserDialog />
    </div>
  );
};

export default UserList;
