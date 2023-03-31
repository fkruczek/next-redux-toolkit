"use client";

import { useCreateUser } from "@/hooks/useCreateUser";
import { User, UserInput } from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";

function UserForm({ defaultValues }: { defaultValues?: User }) {
  const methods = useForm<UserInput>({
    defaultValues,
    resolver: zodResolver(UserInput),
  });

  const { register } = methods;
  const { mutate, isPending } = useCreateUser();

  function onSubmit(data: UserInput) {
    mutate(data);
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="grid gap-x-8 md:grid-cols-2"
      >
        <input type="hidden" {...register("id")} />
        <Input name="name" />
        <Input name="username" />
        <Input name="email" />
        <Input name="city" />
        <div />
        <Button data-cy="submit" isLoading={isPending}>
          SUBMIT
        </Button>
      </form>
    </FormProvider>
  );
}

export default UserForm;
