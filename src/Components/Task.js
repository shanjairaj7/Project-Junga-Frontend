import React from "react";

import { Badge, Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import {
  formatDate,
  formatLongText,
  showDynamicStatusBadge,
} from "../utilities";

const Task = ({ task }) => {
  console.log(task);
  return (
    <Flex
      p="4"
      py="3"
      boxShadow="xs"
      borderRadius="md"
      mb="4"
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <Flex alignItems="center" justifyContent="center">
          <Text fontWeight="semibold" color="blue.800" fontSize="md">
            {formatLongText(task.title, 80)}
          </Text>
          <Text pl="2" color="gray.500" fontSize="sm">
            {formatLongText(task.description, 70)}
          </Text>
        </Flex>
      </Box>

      <Spacer />

      <Box>
        <Flex alignItems="center">
          <Badge
            variant="solid"
            colorScheme={showDynamicStatusBadge(task.status)}
            mr="4"
          >
            {task.status}
          </Badge>
          <Text fontSize="xs" color="gray.400">
            {formatDate(task.createdAt)}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Task;
