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
import { signIn, user } from "../services/userService";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../reduxSlices/userSlice";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInAPI = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await signIn({
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
        title: "Error when signing In",
        description: error.response.data.error,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Center h="85vh" flex flexDir="column">
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
          Welcome Back, Log In
        </Heading>
        <Text textAlign="center" color="gray.500" pb="6">
          Hi, we are you glad you are back. Please login.
        </Text>

        <form onSubmit={(e) => signInAPI(e)}>
          <FormControl pt="4">
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="search"
              autoComplete="off"
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
                <Button size="sm" onClick={() => setShowPassword(!showPassword)}>
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
            onClick={(e) => signInAPI(e)}
            isLoading={loading}
            loadingText="Signing In..."
          >
            Login
          </Button>
        </form>

        {/* Show link to sign up */}
        <Flex align="center" justify="center" mt="4" color="gray.500">
          <Text>Don't have an Account?</Text>{" "}
          <Text ml="2" color="gray.600" textDecoration="underline">
            <Link to="/signup">Sign Up</Link>
          </Text>
        </Flex>
      </Box>
    </Center>
  );
};

export default SignIn;
