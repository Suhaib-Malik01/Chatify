import {
  Box,
  Button,
  Container,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";

import Message from "./Components/Message";
import { app } from "./Firebase";
import { useEffect, useState } from "react";


import {
  onAuthStateChanged,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut
} from "firebase/auth";


import {getFirestore} from "firebase/firestore"


const auth = getAuth(app);

const db = getFirestore(app);

const loginHandler = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider);
};

const logoutHandler = () => signOut(auth)




function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data)
    });

    return () =>  unSubscribe();
  });

  return (
    <Box bg={"red.50"}>
      {user ? (
        <Container h={"100vh"} bg="white">
          <VStack h={"full"} padding={"4"}>
            <Button onClick={logoutHandler} w={"full"} colorScheme="red">
              Logout
            </Button>

            <VStack h={"full"} w={"full"} overflowY={"auto"}>
              <Message text={"Sample message"} />
              <Message user="me" text={"Sample message"} />
              <Message text={"Sample message"} />
            </VStack>
            <form style={{ width: "100%" }}>
              <HStack>
                <Input placeholder="Enter Your Message..." bg={"white"} />
                <Button colorScheme={"green"} type="Submit">
                  Send
                </Button>
              </HStack>
            </form>
          </VStack>
        </Container>
      ) : (
        <VStack justifyContent={"center"} h={"100vh"} bg={"white"}>
          <Button onClick={loginHandler} colorScheme="blue">
            Sign in With Google
          </Button>
        </VStack>
      )}
    </Box>
  );
}

export default App;
