import React from "react";
import {
  AlertDialog,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";

const DeleteTaskModal = ({ deleteTask, isOpen, onClose }) => {
  return (
    <AlertDialog motionPreset="slideInBottom" onClose={onClose} isOpen={isOpen} isCentered>
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Are you sure you want to delete this task?</AlertDialogHeader>
        <AlertDialogCloseButton />

        <AlertDialogFooter>
          <Button onClick={onClose}>No</Button>
          <Button colorScheme="red" ml={3} onClick={() => deleteTask()}>
            Yes, Delete this.
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTaskModal;
