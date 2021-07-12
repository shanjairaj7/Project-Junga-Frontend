import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
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
  Badge,
  Avatar,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

import { FaComments } from "react-icons/fa";
import { useParams } from "react-router";
import { taskStatus } from "../constants";
import { formatDate, showDynamicStatusBadge } from "../utilities";
import { addComment, deleteTask, getTask, updateTask } from "../services/taskService";
import Loading from "./Loading";
import UpdatingScreen from "./UpdatingScreen";
import { DeleteIcon } from "@chakra-ui/icons";
import DeleteTaskModal from "./DeleteTaskModal";
import { useHistory } from "react-router-dom";

const ViewTaskModal = ({ isOpen, onClose }) => {
  const initialRef = React.useRef();

  const { id } = useParams();
  const history = useHistory();

  const [task, setTask] = useState(null);
  const [showTaskStatus, setShowTaskStatus] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TODO");
  const [comment, setComment] = useState("");

  const [isUpdating, setIsUpdating] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toast = useToast();

  const getTaskAPI = async () => {
    try {
      setLoading(true);
      const response = await getTask(id);
      setTask(response.data.task);

      setTitle(response.data.task.title);
      setDescription(response.data.task.description);
      setStatus(response.data.task.status);

      if (response.data.task.description.length === 0) {
        setShowDescription(true);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);

      toast({
        title: "Error when getting task",
        description: error.response.data.error,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const updateTaskAPI = async (title, description, status) => {
    try {
      setIsUpdating(true);
      const response = await updateTask(id, {
        title,
        description,
        status,
      });

      setIsUpdating(false);

      getTaskAPI();
    } catch (error) {
      toast({
        title: "Error when updating a new task",
        description: error.response.data.error,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const addCommentAPI = async (e) => {
    e.preventDefault();

    if (comment.length === 0) {
      toast({
        title: "Comment text length should be more than 1",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }

    try {
      setIsCommenting(true);
      const response = await addComment(id, {
        text: comment,
      });
      setComment("");
      getTaskAPI();

      setIsCommenting(false);
    } catch (error) {
      setIsCommenting(false);

      toast({
        title: "Error when commenting",
        description: error.response.data.error,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const deleteTaskAPI = async (e) => {
    e.preventDefault();

    try {
      setIsDeleting(true);
      const response = await deleteTask(id);
      toast({
        title: "Successfully deleted task",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      setIsDeleting(false);
      history.push("/");
    } catch (error) {
      toast({
        title: "Error when deleting task",
        description: error.response.data.error,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    getTaskAPI();
  }, []);

  return (
    <div>
      <Modal initialFocusRef={initialRef} onClose={onClose} size="6xl" isOpen={isOpen}>
        <ModalOverlay />

        <ModalContent pb="6">
          <ModalHeader>
            <Text>View Task</Text>
            <Text fontSize={13} color="gray.400" fontWeight={400}>
              *Click on each field to edit them
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          {!task ? (
            <Loading />
          ) : (
            <ModalBody>
              {isUpdating ? (
                <UpdatingScreen />
              ) : (
                <Flex>
                  <Box
                    w="3xl"
                    minH="lg"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                  >
                    <Flex direction="column" justifyContent="space-between" alignItems="center">
                      <Box w="100%">
                        {showTaskStatus ? (
                          <FormControl pt="4">
                            <FormLabel>Task Status</FormLabel>
                            <Select
                              value={status || "TODO"}
                              onChange={(e) => {
                                setShowTaskStatus(!showTaskStatus);
                                setStatus(e.target.value);
                                updateTaskAPI(title, description, e.target.value);
                              }}
                            >
                              <option value="TODO">Todo</option>
                              <option value="IN PROGRESS">In Progress</option>
                              <option value="COMPLETE">Complete</option>
                            </Select>
                          </FormControl>
                        ) : (
                          <Badge
                            variant="solid"
                            colorScheme={showDynamicStatusBadge(task.status)}
                            mr="4"
                            onClick={() => setShowTaskStatus(!showTaskStatus)}
                          >
                            {task.status || "TODO"}
                          </Badge>
                        )}

                        <Editable
                          value={title}
                          onSubmit={(value) => {
                            setTitle(value);
                            updateTaskAPI(value, description, status);
                          }}
                          pt="2"
                          placeholder="Enter task title"
                        >
                          <EditablePreview fontSize={20} />
                          <EditableInput
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter task title"
                          />
                        </Editable>

                        {showDescription ? (
                          <FormControl id="title" py="4">
                            <Textarea
                              minH="250px"
                              resize="vertical"
                              placeholder="Enter the description of the task (optional)"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              onBlur={(e) => {
                                setShowDescription(!showDescription);
                                updateTaskAPI(title, e.target.value, status);
                              }}
                            />
                          </FormControl>
                        ) : (
                          <Editable
                            style={{ overflowY: "scroll", maxHeight: "500px" }}
                            value={description}
                            onEdit={() => setShowDescription(!showDescription)}
                          >
                            <EditablePreview fontSize={16} color="gray.600" />
                            <EditableInput
                              placeholder="Enter description"
                              onChange={(e) => console.log(e.target.value)}
                            />
                          </Editable>
                        )}
                      </Box>
                    </Flex>

                    <Box flex flexDirection="column" justifyContent="flex-end">
                      <Button
                        onClick={(e) => deleteTaskAPI(e)}
                        isLoading={isDeleting}
                        loadingText="Deleting Task..."
                        leftIcon={<DeleteIcon fontSize={14} />}
                        colorScheme="red"
                        variant="ghost"
                        size="lg"
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>

                  <Box w="lg" ml="10" position="relative">
                    {task.comments && task.comments?.length !== 0 ? (
                      <Flex direction="column" bg="gray.50" p="4">
                        <Box style={{ overflowY: "scroll", height: "500px" }}>
                          {task.comments.map((comment) => (
                            <Box bg="white" p="4" boxShadow="sm" borderRadius="md" mb="3" flex>
                              <Flex justifyContent="space-between">
                                <Flex>
                                  <Avatar name={comment.createdBy.name} size="xs" />
                                  <Box pl="2">
                                    <Text fontSize="sm" fontWeight="bold">
                                      {comment.createdBy.name}
                                    </Text>
                                    <Text fontSize="sm" color="gray.600">
                                      {comment.text}
                                    </Text>
                                  </Box>
                                </Flex>

                                <Text fontSize="x-small">
                                  <Text color="gray.600">{formatDate(comment.createdAt)}</Text>
                                </Text>
                              </Flex>
                            </Box>
                          ))}
                        </Box>
                        <form onSubmit={(e) => addCommentAPI(e)}>
                          <Flex mt="4">
                            <Input
                              placeholder="Add Comment"
                              mr="2"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />
                            <Button
                              isLoading={isCommenting}
                              loadingText="Commenting..."
                              px="8"
                              type="submit"
                              onClick={(e) => addCommentAPI(e)}
                            >
                              Add Comment
                            </Button>
                          </Flex>
                        </form>
                      </Flex>
                    ) : (
                      <Flex direction="column" bg="gray.50" p="4">
                        <Box
                          style={{
                            overflowY: "scroll",
                            height: "500px",
                            display: "flex",
                          }}
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Text color="gray.500" fontSize="xl">
                            No comments.
                          </Text>
                        </Box>
                        <form onSubmit={(e) => addCommentAPI(e)}>
                          <Flex mt="4">
                            <Input
                              placeholder="Add Comment"
                              mr="2"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />
                            <Button
                              isLoading={isCommenting}
                              loadingText="Commenting..."
                              px="8"
                              type="submit"
                              onClick={(e) => addCommentAPI(e)}
                            >
                              Add Comment
                            </Button>
                          </Flex>
                        </form>
                      </Flex>
                    )}
                  </Box>
                </Flex>
              )}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ViewTaskModal;
