import React, { ReactNode } from "react";
import { Box, Container } from "@chakra-ui/react";
interface LayoutFormProps {
  children: ReactNode;
}
const LayoutForm = ({ children }: LayoutFormProps) => {
  return (
    <>
      <Box
        position={"relative"}
        w={"100%"}
        h={"45vh"}
        bg={"#00a884"}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          rounded={"2px"}
          bg={"white"}
          w={"80%"}
          position={"absolute"}
          zIndex={"9999"}
          top={"40%"}
          left={"10%"}
          translateX={"-50%"}
          translateY={"-50%"}
          h={"min-content"}
        >
          <h1 className="header-home">Chats App</h1>

          <Container centerContent w={"500px"} my={"10"}>
            {children}
          </Container>
        </Box>
      </Box>
      <Box position={"relative"} w={"100%"} h={"100vh"} bg={"#111b21"}></Box>
    </>
  );
};

export default LayoutForm;
