"use client";

import { closeDialog } from "@/store/dialogSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { userApi } from "@/store/userApi";
import { removeUser } from "@/store/usersSlice";
import { Dialog } from "@headlessui/react";

export default function ConfirmRemoveUserDialog({}: {}) {
  const { isLoading, isOpen, userId, username } = useAppSelector(
    (state) => state.dialog
  );
  const dispatch = useAppDispatch();

  const confirmRemove = () => {
    dispatch(removeUser(userId));
    dispatch(userApi.endpoints.deleteUser.initiate(userId));
    handleCloseDialog();
  };

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
          <Dialog.Panel className="bg-white rounded-md p-10 grid gap-4">
            <Dialog.Title className="text-xl">Delete</Dialog.Title>
            <Dialog.Description>
              Do you want to delete user: {username}
            </Dialog.Description>
            <div className="w-full flex gap-4 justify-end">
              <button onClick={handleCloseDialog}>Cancel</button>
              {/* TODO: loading, extract button */}
              <button onClick={confirmRemove}>
                Delete{isLoading && "LOADING"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
