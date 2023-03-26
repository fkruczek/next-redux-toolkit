"use client";

import { AppErrorResponse } from "@/schema/api";
import { User, UserInput, UserResponse } from "@/schema/user";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { userApi } from "@/store/userApi";
import { setIsMutationPending } from "@/store/usersSlice";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toastError, toastSuccess } from "./Toast";

const useCreateUser = ({
  onError,
  onSuccess,
}: {
  onError: (error: AppErrorResponse) => void;
  onSuccess: (data: UserResponse) => void;
}) => {
  const dispatch = useAppDispatch();
  const isPending = useAppSelector((state) => state.users.isMutationPending);

  const mutate = async (data: UserInput) => {
    dispatch(setIsMutationPending(true));
    dispatch(userApi.endpoints.createOrUpdateUser.initiate(data));

    const response = await Promise.all(
      dispatch(userApi.util.getRunningMutationsThunk())
    ).then((res) => res[0]);

    dispatch(setIsMutationPending(false));

    try {
      UserResponse.parse(response);
      onSuccess(response as UserResponse);
    } catch (error) {
      AppErrorResponse.parse(response);
      onError(response as AppErrorResponse);
    }
  };

  return { mutate, isPending };
};

function UserForm({ id, ...defaultValues }: User) {
  const router = useRouter();

  const { register, handleSubmit, setError } = useForm<UserInput>({
    defaultValues: {
      id: id ? String(id) : "",
      ...defaultValues,
    },
  });

  const { mutate, isPending } = useCreateUser({
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
      <input type="hidden" {...register("id")} />
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
      {isPending && <div className="w-10 h-10 bg-red-500">pending</div>}
    </form>
  );
}

export default UserForm;
