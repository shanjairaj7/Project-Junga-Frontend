import React, { useState } from "react";

import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import CreateNewTaskModal from "./CreateNewTaskModal";

const EmtpyTasks = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Center h="lg">
      <Box maxW="35rem">
        <Image
          src="open-doodles-clumsy.svg"
          maxW="300px"
          objectFit="cover"
          margin="auto"
        />
        <Flex direction="column" alignItems="center" mt="10">
          <Heading textAlign="center" letterSpacing="tight" color="blue.600">
            You haven't created any tasks on your board yet!
          </Heading>
          <Text textAlign="center" color="gray.500" py="4" fontSize="lg">
            Get started by creating a task for yourself and start working on
            them today! We would love to see what you are going to create.
          </Text>
          <Button
            mt="2"
            leftIcon={<AddIcon fontSize={14} />}
            color="blue.800"
            variant="solid"
            size="lg"
            onClick={() => onOpen()}
          >
            Create a new Task
          </Button>
        </Flex>
      </Box>

      <CreateNewTaskModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Center>
  );
};

export default EmtpyTasks;
