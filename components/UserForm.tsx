"use client";

import { User, UserInput } from "@/schema/user";
import { useAppMutation } from "@/store/hooks";
import { userApi } from "@/store/userApi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toastError } from "./Toast";

const useCreateUser = () => {
  const router = useRouter();
  return useAppMutation({
    mutation: userApi.endpoints.createOrUpdateUser,
    onSuccess: () => {
      router.push("/home");
    },
    onError: (error) => {
      toastError(error.error.data.message);
    },
  });
};

function UserForm({ defaultValues }: { defaultValues?: User }) {
  const { register, handleSubmit } = useForm<UserInput>({
    defaultValues,
  });

  const { mutate, isPending } = useCreateUser();

  function onSubmit(data: UserInput) {
    mutate(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
      <input type="hidden" {...register("id")} />
      <label>
        Name:
        <input {...register("name", { required: true })} data-cy="name" />
      </label>
      <label>
        Username:
        <input
          {...register("username", { required: true })}
          data-cy="username"
        />
      </label>
      <label>
        Email:
        <input {...register("email", { required: true })} data-cy="email" />
      </label>
      <label>
        City:
        <input {...register("city", { required: true })} data-cy="city" />
      </label>
      <button className="bg-slate-600 text-white" data-cy="submit">
        SUBMIT
      </button>
      {isPending && <div className="w-10 h-10 bg-red-500">pending</div>}
    </form>
  );
}

export default UserForm;
