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

  // TODO: reuse table component
  return (
    <table>
      <thead>
        <tr>
          {/* TODO: click button */}
          <th>
            <button onClick={() => sortBy("id")}>Id</button>
          </th>
          <th>Name</th>
          {/* TODO: click button */}
          <th onClick={() => sortBy("username")}>
            <button>Username</button>
          </th>
          <th>Email</th>
          <th>City</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody data-cy="users">
        {users.map((user) => (
          <tr key={user.id} className="border border-black">
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.city}</td>
            <td>
              <Link href={`/edit/${user.id}`} data-cy="edit-user">
                Edit
              </Link>
            </td>
            <td
              onClick={() => openRemoveDialog(user.id, user.name)}
              data-cy="delete-user"
            >
              Remove
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
