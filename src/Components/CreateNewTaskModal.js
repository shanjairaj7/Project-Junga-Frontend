import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import { FaComments } from "react-icons/fa";
import { createNewTask, getAllTasks } from "../services/taskService";

const CreateNewTaskModal = ({ isOpen, onClose }) => {
  const initialRef = React.useRef();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("TODO");
  const [description, setDescription] = useState("");

  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const createNewTaskAPI = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // Checking if there are no tasks to refresh the page so that the user sees all the tasks
      const allTasks = await getAllTasks();

      const response = await createNewTask({
        title,
        description,
        status,
      });

      if (allTasks.data.tasks.length === 0) {
        window.location.reload();
      }
      console.log(allTasks.data.tasks);

      setLoading(false);
      onClose();
    } catch (error) {
      setLoading(false);

      toast({
        title: "Error when creating a new task",
        description: error.response.data.error,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <div>
      <Modal initialFocusRef={initialRef} onClose={onClose} size="6xl" isOpen={isOpen}>
        <ModalOverlay />

        <ModalContent pb="6">
          <ModalHeader>Create a new Task</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Flex>
              <Box w="3xl">
                <form onSubmit={(e) => createNewTaskAPI(e)}>
                  <FormControl isRequired id="title">
                    <FormLabel>Title</FormLabel>
                    <Input
                      autoComplete="off"
                      ref={initialRef}
                      placeholder="Enter the title of the task"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </FormControl>

                  <FormControl pt="4">
                    <FormLabel>Task Status</FormLabel>
                    <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option value="TODO">Todo</option>
                      <option value="IN PROGRESS">In Progress</option>
                      <option value="COMPLETE">Complete</option>
                    </Select>
                  </FormControl>

                  <FormControl id="title" py="4">
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      minH="250px"
                      resize="vertical"
                      placeholder="Enter the description of the task (optional)"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FormControl>
                  <Button
                    w="100%"
                    size="lg"
                    colorScheme="blue"
                    type="submit"
                    onClick={(e) => createNewTaskAPI(e)}
                    isLoading={loading}
                    loadingText="Creating a new Task..."
                  >
                    Create new Task
                  </Button>
                </form>
              </Box>

              <Box w="lg" ml="10">
                <Flex
                  direction="column"
                  bg="gray.100"
                  alignItems="center"
                  justifyContent="center"
                  h="100%"
                >
                  <FaComments fontSize={40} color="#A0AEC0" />
                  <Text w="300px" textAlign="center" fontSize="lg" color="gray.400" pt="2">
                    Your comments will show up here once the task is created.
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateNewTaskModal;
