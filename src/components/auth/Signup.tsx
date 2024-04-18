import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { color } from "framer-motion";
import React, { useState } from "react";
import LayoutForm from "./LayoutForm";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleTooglePassword = () => {
    setIsShowPassword((state) => !state);
  };
  const postDetailImage = (e: any) => {};
  return (
    <LayoutForm>
      <VStack spacing={"5px"}>
        <h2 className="header-form">Lengkapi Form Ini</h2>
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder={"Enter your name"}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder={"Enter your email"}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Flex gap={"5"}>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={isShowPassword ? "text" : "password"}
                placeholder={"1234567"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement>
                <Button fontSize={"10px"} onClick={handleTooglePassword}>
                  {isShowPassword ? "Hidden" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="conform-password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={isShowPassword ? "text" : "password"}
                placeholder={"1234567"}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <InputRightElement>
                <Button fontSize={"10px"} onClick={handleTooglePassword}>
                  {isShowPassword ? "Hidden" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Flex>

        <FormControl id="password" isRequired>
          <FormLabel>Picture</FormLabel>
          <Input
            p={1.5}
            type="file"
            accept="image/*"
            onChange={(e) => postDetailImage(e.target.files[0])}
          />
        </FormControl>
        <Button mt={"4"} w={"100%"} bg={"#008069"} color={"white"}>
          Sign Up
        </Button>
        <Text fontSize={".9rem"}>
          Sudah Punya Akun ?{" "}
          <Link to="/auth/login" color="teal.500">
            Login
          </Link>
        </Text>
      </VStack>
    </LayoutForm>
  );
};

export default Signup;
