"use client";

import { User } from "@/schema/user";
import { userApi } from "@/store/userApi";
import { removeUser, setSortBy } from "@/store/usersSlice";
import { useAppDispatch } from "./UserList";

const UserTable = ({ users }: { users: User[] }) => {
  const dispatch = useAppDispatch();

  return (
    <table>
      <thead>
        <tr>
          {/* TODO: click button */}
          <th
            onClick={() => {
              dispatch(setSortBy("id"));
              dispatch(userApi.endpoints.users.initiate("id"));
            }}
          >
            Id
          </th>
          <th>Name</th>
          {/* TODO: click button */}
          <th
            onClick={() => {
              dispatch(setSortBy("username"));
              dispatch(userApi.endpoints.users.initiate("username"));
            }}
          >
            Username
          </th>
          <th>Email</th>
          <th>City</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="border border-black">
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.city}</td>
            <td>edit</td>
            <td
              onClick={() => {
                dispatch(userApi.endpoints.deleteUser.initiate(user.id));
                dispatch(removeUser(user.id));
              }}
            >
              delete
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
