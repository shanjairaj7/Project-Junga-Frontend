import { Center, Spinner, Text, Flex } from "@chakra-ui/react";
import React from "react";

const UpdatingScreen = () => {
  return (
    <Center h="60vh">
      <Flex direction="column" alignItems="center" justifyContent="center">
        <Spinner
          thickness="4px"
          speed="0.5s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text mt="3" fontSize="xl">
          Updating...
        </Text>
      </Flex>
    </Center>
  );
};

export default UpdatingScreen;
