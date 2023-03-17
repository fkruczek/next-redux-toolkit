"use client";

import { userApi } from "@/store/userApi";
import { UserInput } from "@/types";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "./UserList";

function UserForm() {
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<UserInput>({});

  function onSubmit(data: UserInput) {
    dispatch(userApi.endpoints.createUser.initiate(data));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
      <label>
        Name:
        <input {...register("name", { required: true })} />
      </label>
      <label>
        Username:
        <input {...register("username", { required: true })} />
      </label>
      <label>
        Email:
        <input {...register("email", { required: true })} />
      </label>
      <label>
        City:
        <input {...register("city", { required: true })} />
      </label>
      <button className="bg-slate-600 text-white">submit</button>
    </form>
  );
}

export default UserForm;
