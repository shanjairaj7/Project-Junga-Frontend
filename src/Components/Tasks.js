import React, { useEffect, useState } from "react";

import { Box, Button, Flex, Heading, useDisclosure, useToast, Text } from "@chakra-ui/react";

import { taskStatus } from "../constants";
import Task from "./Task";
import ViewTaskModal from "./ViewTaskModal";
import { Link } from "react-router-dom";
import { getAllTasks } from "../services/taskService";
import EmtpyTasks from "./EmtpyTasks";
import { AddIcon } from "@chakra-ui/icons";
import CreateNewTaskModal from "./CreateNewTaskModal";
import Loading from "./Loading";

const Tasks = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [tasks, setTasks] = useState([]);

  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const getAllTasksAPI = async () => {
    try {
      setLoading(true);
      const response = await getAllTasks();

      setTasks(response.data.tasks);
      console.log(response);

      setLoading(false);
    } catch (error) {
      setLoading(false);

      if (error?.response?.data?.error === "No token found") {
        window.location.reload();
      }

      toast({
        title: "Error while getting all tasks",
        description: error?.response?.data?.error,
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
  };

  const closeModal = () => {
    onClose();
    getAllTasksAPI();
  };

  useEffect(() => {
    getAllTasksAPI();
  }, []);

  return (
    <Box>
      <Flex direction="column" py="8">
        <Box mt="6">
          {loading ? (
            <Loading />
          ) : tasks.length === 0 ? (
            <EmtpyTasks />
          ) : (
            <>
              <Flex alignItems="center" justifyContent="space-between">
                <Heading color="blue.800" fontSize="xl">
                  Tasks
                </Heading>
                <Button
                  leftIcon={<AddIcon fontSize={14} />}
                  colorScheme="facebook"
                  variant="solid"
                  size="sm"
                  onClick={() => onOpen()}
                >
                  New Task
                </Button>
              </Flex>
              <Box mt="5">
                {tasks.map((task) => (
                  // Task component
                  <Link to={`/task/${task._id}`} onClick={() => onOpen()}>
                    <Task task={task} />
                  </Link>
                ))}
              </Box>

              <CreateNewTaskModal isOpen={isOpen} onOpen={onOpen} onClose={() => closeModal()} />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Tasks;
