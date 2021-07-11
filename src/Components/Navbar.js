import React, { useEffect, useState } from "react";

import {
  Flex,
  Box,
  Heading,
  Spacer,
  Container,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  useToast,
} from "@chakra-ui/react";

import { CgLogIn, CgLogOut } from "react-icons/cg";
import { RiAccountCircleFill } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { user } from "../services/userService";
import { FaUserPlus } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../reduxSlices/userSlice";

const AuthorisedMenuList = ({ logOutUser }) => {
  return (
    <MenuList>
      <MenuGroup>
        <MenuItem fontSize={16} icon={<CgLogOut fontSize={20} />} onClick={() => logOutUser()}>
          Log Out
        </MenuItem>
      </MenuGroup>
    </MenuList>
  );
};

const DefaultMenuList = () => {
  return (
    <MenuList>
      <Link to="/signup">
        <MenuItem fontSize={16} icon={<FaUserPlus fontSize={20} />}>
          Sign Up
        </MenuItem>
      </Link>
      <MenuDivider />
      <Link to="/signin">
        <MenuItem fontSize={16} icon={<CgLogIn fontSize={20} />}>
          Log In
        </MenuItem>
      </Link>
    </MenuList>
  );
};

const Navbar = () => {
  const history = useHistory();

  const isAuthorised = useSelector((state) => state.user.isAuthorised);
  const toast = useToast();
  const dispatch = useDispatch();

  const userName = useSelector((state) => state.user.user.name);

  const logOutUser = () => {
    user().logOut();
    history.push("/");
    dispatch(clearUser());

    toast({
      title: "Successfully logged out",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Box boxShadow="sm">
      <Container maxW="7xl">
        <Flex py="6" alignItems="center">
          <Heading
            cursor="pointer"
            fontSize="x-large"
            fontWeight="bold"
            color="gray.700"
            onClick={() => history.push("/")}
          >
            Project Junga
          </Heading>
          <Spacer />

          {/* Dynamically render the Menu based whether the user is signed in or not */}
          <Menu>
            <MenuButton colorscheme="pink">
              <Avatar boxSize={10} name={userName} />
            </MenuButton>

            {isAuthorised ? <AuthorisedMenuList logOutUser={logOutUser} /> : <DefaultMenuList />}
          </Menu>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
