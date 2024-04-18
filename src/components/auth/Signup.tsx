import {
  Button,
  Flex,
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
import LayoutForm from "./LayoutForm";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const handleTooglePassword = () => {
    setIsShowPassword((state) => !state);
  };

  const postDetails = (pics: File | null) => {
    setLoading(true);

    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    if (pics.type !== "image/jpeg" && pics.type !== "image/png") {
      toast({
        title: "Please Select a JPEG or PNG Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dlav3c2dh");
      axios
        .post("https://api.cloudinary.com/v1_1/dlav3c2dh/image/upload", data)
        .then((response) => {
          console.log("Cloudinary response:", response);
          setPicture(response.data.url.toString());
          setLoading(false);
          toast({
            title: "Image uploaded successfully!",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        })
        .catch((error) => {
          console.log("Cloudinary error:", error);
          setLoading(false);
        });
    }
  };
  const handleSignup = async () => {
    if (!name || !email || !password || !picture) {
      setLoading(false);

      toast({
        title: "Lengkapi filed nya!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Password tidak sama!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    try {
      setLoading(true);
      const data = {
        name,
        email,
        password,
        picture,
      };

      const response = await axios.post(
        "http://localhost:3000/api/user/register",
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
      setLoading(false);

      localStorage.setItem("userinfo", JSON.stringify(response?.data?.name));
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <LayoutForm>
      <VStack spacing={"5px"}>
        <h2 className="header-form">Silahkan Sign Up terlebih Dahulu.</h2>
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
                placeholder={"******"}
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
                placeholder={"******"}
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
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </FormControl>
        <Button
          onClick={handleSignup}
          mt={"4"}
          w={"100%"}
          bg={"#008069"}
          color={"white"}
          _hover={{ bg: "#00a884", transitionDuration: "0.3s" }}
        >
          {loading ? <Spinner /> : "Sign Up"}
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
