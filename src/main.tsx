import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import "./index.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

const app = createBrowserRouter([
  {
    path: "/",
    element: <ChatPage />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={app} />
    </ChakraProvider>
  </React.StrictMode>
);
