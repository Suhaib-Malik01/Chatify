import { Box, Button, Container, HStack, Input, VStack } from "@chakra-ui/react";

function App() {
  return (
    <Box bg={"red.50"}>
      <Container h={"100vh"} bg="white">
        <VStack h={"full"} bg={"telegram.200"}>
          <Button w={"full"} colorScheme="red">
            Logout
          </Button>

          <VStack h={"full"} w={"full"} bg={"purple.100"}></VStack>
          <form>
            <HStack>
              <Input />
              <Button colorScheme={"purple"} type="Submit">
                Send
              </Button>
            </HStack>
          </form>
        </VStack>
      </Container>
    </Box>
  );
}

export default App;
