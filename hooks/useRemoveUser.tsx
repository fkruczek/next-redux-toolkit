"use client";
import { toastError, toastSuccess } from "@/components/Toast";
import { useAppMutation } from "@/hooks/useAppMutation";
import { closeDialog } from "@/store/dialogSlice";
import { useAppDispatch } from "@/store/hooks";
import { userApi } from "@/store/userApi";
import { removeUser } from "@/store/usersSlice";

export const useRemoveUser = (userId: string) => {
  const dispatch = useAppDispatch();

  return useAppMutation({
    mutation: userApi.endpoints.deleteUser,
    onSuccess: () => {
      dispatch(removeUser(userId));
      dispatch(closeDialog());
      toastSuccess("User removed successfully.");
    },
    onError: (error) => {
      toastError(error.error.data.message);
    },
  });
};
