"use client";

import { toastError } from "@/components/Toast";
import { useAppMutation } from "@/hooks/useAppMutation";
import { userApi } from "@/store/userApi";
import { useRouter } from "next/navigation";

export const useCreateUser = () => {
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
