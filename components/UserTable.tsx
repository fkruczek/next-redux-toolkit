"use client";

import { SortBy, User } from "@/schema/user";
import { openDialog } from "@/store/dialogSlice";
import { useAppDispatch } from "@/store/hooks";
import { userApi } from "@/store/userApi";
import { setSortBy } from "@/store/usersSlice";
import Link from "next/link";

const UserTable = ({ users }: { users: User[] }) => {
  const dispatch = useAppDispatch();

  const sortBy = (sortBy: SortBy) => {
    dispatch(setSortBy(sortBy));
    dispatch(userApi.endpoints.users.initiate(sortBy));
  };

  const openRemoveDialog = (userId: string, username: string) => {
    dispatch(openDialog({ userId, username }));
  };

  return (
    <table className="w-full text-center font-light">
      <thead className="font-light">
        <tr>
          <th>
            <button onClick={() => sortBy("id")}>id</button>
          </th>
          <th>name</th>
          <th>
            <button onClick={() => sortBy("username")}>username</button>
          </th>
          <th>email</th>
          <th>city</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody data-cy="users">
        {users.map((user) => (
          <tr key={user.id} className="odd:bg-slate-200">
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.city}</td>
            <td>
              <Link
                href={`/edit/${user.id}`}
                data-cy="edit-user"
                aria-label="Edit user"
              >
                ✏️
              </Link>
            </td>
            <td>
              <button
                onClick={() => openRemoveDialog(user.id, user.name)}
                data-cy="delete-user"
                className="px-2 tracking-widest text-red-800"
                aria-label="Delete user"
              >
                ❌
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
