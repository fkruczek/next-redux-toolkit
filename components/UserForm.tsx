"use client";

import { AppErrorResponse } from "@/schema/api";
import { UserInput, UserResponse } from "@/schema/user";
import { userApi } from "@/store/userApi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toastError, toastSuccess } from "./Toast";
import { useAppDispatch } from "./UserList";

const useCreateUser = ({
  onError,
  onSuccess,
}: {
  onError: (error: AppErrorResponse) => void;
  onSuccess: (data: UserResponse) => void;
}) => {
  const dispatch = useAppDispatch();

  const mutate = async (data: UserInput) => {
    dispatch(userApi.endpoints.createUser.initiate(data));

    const response = await Promise.all(
      dispatch(userApi.util.getRunningMutationsThunk())
    ).then((res) => res[0]);

    try {
      UserResponse.parse(response);
      onSuccess(response as UserResponse);
    } catch {
      const result = AppErrorResponse.safeParse(response);
      if (result.success) {
        onError(response as AppErrorResponse);
        return;
      }

      throw new Error("Unknown api error occured.");
    }
  };

  return { mutate };
};

function UserForm() {
  const router = useRouter();

  const { register, handleSubmit, setError } = useForm<UserInput>({
    // TODO: remove this
    defaultValues: {
      name: "asdf",
      username: "asdf",
      email: "asdf",
      city: "asdf",
    },
  });

  const { mutate } = useCreateUser({
    onSuccess: () => {
      toastSuccess("User created successfully.");
      router.push("/home");
    },
    onError: (error) => {
      toastError(error.error.data.message);
    },
  });

  function onSubmit(data: UserInput) {
    mutate(data);
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
      <button className="bg-slate-600 text-white">SUBMIT</button>
    </form>
  );
}

export default UserForm;
