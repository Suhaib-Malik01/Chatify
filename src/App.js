import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

import Message from "./Components/Message";
import { app } from "./Firebase";
import { useEffect, useRef, useState } from "react";

import {
  onAuthStateChanged,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query
  
} from "firebase/firestore";
import Home from "./Components/Home";



const auth = getAuth(app);

const db = getFirestore(app);

const loginHandler = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider);
};

const logoutHandler = () => signOut(auth);

function App() {

  
  const [user, setUser] = useState(false);

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const viewMessage = useRef(null);

  const formSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setMessage("");
      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      });

      viewMessage.current.scrollIntoView({behavior: "smooth"})

    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const dataQuery = query(collection(db,"Messages"),orderBy("createdAt","asc"));
    const unSubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });

    const unSubscribeForMessage = onSnapshot(dataQuery, (snap) => {
      
        setMessages(snap.docs.map((ele) => {
          const id = ele.id;
          return {id, ...ele.data()};
        }))
      
    });

    return () => {
      unSubscribe()
      unSubscribeForMessage()
    };
  },[]);

  return (
    <Box bg={"red.50"}>
      {user ? (
        <Container h={"100vh"} bg="white">
          <VStack h={"full"} padding={"4"}>
            <Button
              onClick={() => logoutHandler()}
              w={"full"}
              colorScheme="red"
            >
              Logout
            </Button>

            <VStack h={"full"} w={"full"} overflowY={"auto"} css={{"&::-webkit-scrollbar": {
              display:"none"
            }}}>
              {messages.map((ele) => (
                <Message
                  key={ele.id}
                  text={ele.text}
                  uri={ele.uri}
                  user={ele.uid == user.uid ? "me" : "other"}
                />
              ))}

              <div ref={viewMessage}></div>
            </VStack>

            <form style={{ width: "100%" }}>
              <HStack>
                <Input
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  placeholder="Enter Your Message..."
                  bg={"white"}
                />
                <Button
                  onClick={formSubmit}
                  colorScheme={"green"}
                  type="Submit"
                >
                  Send
                </Button>
              </HStack>
            </form>
          </VStack>
        </Container>
      ) : (
        <Home />
      )}
    </Box>
  );
}

export default App;
export { loginHandler };
