import React, { useState } from "react";

import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { signUp, user } from "../services/userService";
import { useHistory } from "react-router-dom";
import { setUser } from "../reduxSlices/userSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUpAPI = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await signUp({
        name: name,
        email: email,
        password: password,
      });

      toast({
        title: "Successfully signed up",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      const { message, ...responseData } = response.data;

      dispatch(setUser(responseData));
      user().saveUser(response.data);
      history.push("/");

      setLoading(false);
    } catch (error) {
      setLoading(false);

      toast({
        title: "Error when Signing Up",
        description: error.response.data.error,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Center h="90vh">
      <Box
        w="550px"
        boxShadow="xl"
        flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        borderRadius="lg"
        px="12"
        py="14"
      >
        <Heading
          textAlign="center"
          fontSize="4xl"
          letterSpacing="tight"
          fontWeight="bold"
          py="2"
          color="blue.800"
        >
          Sign Up
        </Heading>
        <Text textAlign="center" color="gray.500" pb="6">
          We are glad that you will be using Project Junga to manage your tasks!
          We hope that you will get like it.
        </Text>

        <form onSubmit={(e) => signUpAPI(e)}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="search"
            />
          </FormControl>

          <FormControl pt="4">
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="search"
            />
          </FormControl>

          <FormControl pt="4">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement si width="4.5rem">
                <Button
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            w="100%"
            mt="6"
            color="white"
            bg="blue.900"
            size="lg"
            type="submit"
            onClick={(e) => signUpAPI(e)}
            isLoading={loading}
            loadingText="Submitting..."
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default Signup;
