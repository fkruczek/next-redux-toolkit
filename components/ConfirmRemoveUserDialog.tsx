"use client";
import { useRemoveUser } from "@/hooks/useRemoveUser";
import { closeDialog } from "@/store/dialogSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Dialog } from "@headlessui/react";
import Button from "./Button";

export default function ConfirmRemoveUserDialog() {
  const { userId, username, isOpen } = useAppSelector((state) => state.dialog);
  const { mutate, isPending } = useRemoveUser(userId);

  const dispatch = useAppDispatch();

  const handleCloseDialog = () => {
    dispatch(closeDialog());
  };

  return (
    <Dialog
      as="div"
      className="relative z-10"
      open={isOpen}
      onClose={handleCloseDialog}
    >
      <div className="fixed inset-0 overflow-y-auto bg-opacity-40 bg-amber-900">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel
            className="bg-slate-100 p-10 grid gap-4"
            data-cy="delete-dialog"
          >
            <Dialog.Title className="text-xl text-center">delete</Dialog.Title>
            <Dialog.Description>
              Do you want to delete user: {username}
            </Dialog.Description>
            <div className="w-full flex gap-4 justify-end">
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button
                onClick={() => mutate(userId)}
                isLoading={isPending}
                data-cy="delete-button"
              >
                Delete
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
