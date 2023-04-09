import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

import { loginHandler } from "../App";


const Home = () => {
  return (
    <VStack justifyContent={"center"} h={"100vh"} bg={"white"}>
      <Heading as="h1" size="4xl" mb={8} textAlign={"center"}>
        Welcome to Chatify!
      </Heading>
      <Text fontSize="2xl" fontWeight="medium" textAlign={"center"}>
        Sign-Up And Chat
      </Text>
      <Text fontSize="xl" padding={"4"} textAlign={"center"}>
        Join the community and start chatting with your friends and loved ones.
        Send messages
      </Text>
      <Text fontSize="lg" fontWeight="bold">
        Get started now!
      </Text>
      <Button onClick={loginHandler} colorScheme="blue">
        Sign in With Google
      </Button>
    </VStack>
  );
};

export default Home;
