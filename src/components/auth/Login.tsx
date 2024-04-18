import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LayoutForm from "./LayoutForm";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const handleTooglePassword = () => {
    setIsShowPassword((state) => !state);
  };
  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: "Lengkapi filed nya!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      setIsLoading(true);
      const data = {
        email,
        password,
      };
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast({
        title: "Success Register!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      localStorage.setItem("userinfo", JSON.stringify(response?.data?.name));
      setIsLoading(false);
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <LayoutForm>
      <VStack spacing={"5px"} w={"500px"}>
        <h2 className="header-form">Lengkapi Form Ini</h2>

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

        <Button
          onClick={handleLogin}
          my={"4"}
          w={"100%"}
          bg={"#008069"}
          color={"white"}
          _hover={{ bg: "#00a884", transitionDuration: "0.3s" }}
        >
          {isLoading ? <Spinner /> : "Login"}
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
