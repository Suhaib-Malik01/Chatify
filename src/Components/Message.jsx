import React from "react";

import { HStack, Avatar, Text } from "@chakra-ui/react";

const Message = ({ text, uri, user = "other" }) => {
  return (
    <HStack
      alignSelf={user == "me" ? "flex-end" : "flex-start"}
      
    >
      {user == "other" && <Avatar src={uri} />}

      <Text
        bg={user == "me" ? "blue.200" : "gray.100"}
        paddingX={user == "me" ? "4" : "2"}
        paddingY={"2"}
        borderRadius={"10px"}
      >
        {text}
      </Text>

      {user == "me" && <Avatar src={uri} />}
    </HStack>
  );
};

export default Message;
