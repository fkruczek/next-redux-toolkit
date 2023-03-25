"use client";

import { toast, ToastContainer } from "react-toastify";

export default function AppToast() {
  return <ToastContainer />;
}

export function toastSuccess(message: string) {
  toast.success(message);
}

export function toastError(message: string) {
  toast.error(message);
}
