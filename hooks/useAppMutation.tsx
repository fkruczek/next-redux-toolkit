"use client";
import { AppErrorResponse } from "@/schema/api";
import { useAppDispatch } from "@/store/hooks";
import { userApi } from "@/store/userApi";
import { useState } from "react";

export const useAppMutation = <
  TMutation extends typeof userApi.endpoints[keyof typeof userApi.endpoints]
>({
  mutation,
  onError,
  onSuccess,
}: {
  mutation: TMutation;
  onError: (error: AppErrorResponse) => void;
  onSuccess: () => void;
}) => {
  const dispatch = useAppDispatch();
  const [isPending, setIsPending] = useState(false);

  const mutate = async (data: TMutation["Types"]["QueryArg"]) => {
    setIsPending(true);

    dispatch<void>(mutation.initiate(data as any));

    const response = await Promise.all(
      dispatch(userApi.util.getRunningMutationsThunk())
    ).then((res) => res[0]);

    setIsPending(false);

    try {
      const errorResponse = AppErrorResponse.parse(response);
      onError(errorResponse);
    } catch {
      onSuccess();
    }
  };

  return { mutate, isPending };
};
