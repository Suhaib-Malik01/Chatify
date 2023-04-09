import { Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

import { loginHandler } from "../App";
import GoogleButton from "./GoogleButton";


const Home = () => {
  return (
    <VStack justifyContent={"center"} h={"100vh"} bg={"white"}>
      <Heading as="h1" size="4xl" mb={8} textAlign={"center"}>
        Welcome to Chatify!
      </Heading>
      <Text fontSize="2xl" fontWeight="medium" textAlign={"center"}>
        Sign-Up And Chat
      </Text>
      <Text fontSize="xl" paddingX={"4"} paddingY={"2"} textAlign={"center"}>
        Join the community and start chatting with Peoples.
        Send messages
      </Text>
      <GoogleButton onClick={loginHandler} ></GoogleButton>
    </VStack>
  );
};

export default Home;
