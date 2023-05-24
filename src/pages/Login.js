import { useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { getAdmin } from "../api/api";
import { getEditor } from "../api/api";
import { adminAuthActions } from '../store/adminauth';
import { editorAuthActions } from '../store/editorauth';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  InputRightElement
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import bcrypt from"bcryptjs";
import sweetAlert from "sweetalert";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();

  const handleShowClick = () => setShowPassword(!showPassword);

  const adminemail = useRef();
  const adminpassword = useRef();

  const editoremail = useRef();
  const editorpassword = useRef();

  const adminHandler=async (event)=>{
    event.preventDefault();
    const email = adminemail.current.value;
    const passwordEntered = adminpassword.current.value;
    try{
      const res = await getAdmin({email: email});
      bcrypt.compare(passwordEntered, res.data.password, (err, isMatch)=>{
        if(err){
          throw err;
        }else if(!isMatch){
          sweetAlert("Oops...", "Invalid Username or Password!", "error");
        }else{
          dispatch(adminAuthActions.login());
          history.push("/admin/editors");
        }
      })
    }catch(error){
      sweetAlert("Oops...", "Invalid Username or Password!", "error");
      console.log(error);
    }
  }

  const editorHandler=async (event)=>{
    event.preventDefault();
    const email = editoremail.current.value;
    const password = editorpassword.current.value;
    try{
      const res = await getEditor({email: email});
      bcrypt.compare(password, res.data.password, (err, isMatch)=>{
        if(err){
          throw err;
        }else if(!isMatch){
          sweetAlert("Oops...", "Invalid Username or Password!", "error");
        }else{
          dispatch(editorAuthActions.login(email));
          history.push("/editor/dashboard");
        }
      })
    }catch(error){
      sweetAlert("Oops...", "Invalid Username or Password!", "error");
      console.log(error);
    }
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
      pt="8%"
    >
      <Stack
        flexDir="column"
        mb="58"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="blue.600" />
        <Heading color="blue.400">Welcome</Heading>
        <Tabs variant='soft-rounded' colorScheme='blue'>
            <TabList position={"relative"} ml={"22%"}>
                <Tab>Login as Admin</Tab>
                <Tab>Login as Editor</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={adminHandler}>
            <Stack
              spacing={7}
              p="1.5rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="email" ref={adminemail} placeholder="Email Address" />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    ref={adminpassword}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="blue"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
                </TabPanel>
                <TabPanel>
                <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={editorHandler}>
            <Stack
              spacing={7}
              p="1.5rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input ref={editoremail} type="email" placeholder="Email Address" />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    ref={editorpassword}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="blue"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
                </TabPanel>
            </TabPanels>
            </Tabs>
        
      </Stack>
    </Flex>
  );
};

export default Login;