import { Spinner, Center } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
  return (
    <Center h="60vh">
      <Spinner
        thickness="4px"
        speed="0.5s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  );
};

export default Loading;
