import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LayoutForm from "./LayoutForm";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleTooglePassword = () => {
    setIsShowPassword((state) => !state);
  };
  return (
    <LayoutForm>
      <VStack spacing={"5px"} w={"500px"}>
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

        <Button my={"4"} w={"100%"} bg={"#008069"} color={"white"}>
          Login
        </Button>
        <Text fontSize={".9rem"}>
          Belum Punya Akun ?{" "}
          <Link to="/auth/signup" color="red">
            Sign Up
          </Link>
        </Text>
      </VStack>
    </LayoutForm>
  );
};

export default Login;
