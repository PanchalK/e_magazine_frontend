import { useRef } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
import { addAdmin } from "../api/api";
import bcrypt from "bcryptjs";
import { useHistory } from "react-router-dom";

const AdminRegister = () => {
  const history = useHistory();
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const designation = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const ReceivedName = name.current.value;
    const ReceivedEmailId = email.current.value;
    const ReceivedPassword = password.current.value;
    const ReceivedDesignation = designation.current.value;
    const hashedPassword = bcrypt.hashSync(ReceivedPassword, 10);
    const admin = {
      name: ReceivedName,
      email: ReceivedEmailId,
      password: hashedPassword,
      designation: ReceivedDesignation,
    };
    try {
      const res = await addAdmin(admin);
      console.log("Successfully added Admin", res);
      history.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <VStack
        spacing={6}
        align="stretch"
        w="full"
        maxW="md"
        mx="auto"
        pt={"10%"}
      >
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input type="text" ref={name} required size="lg" />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" ref={email} required size="lg" />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" ref={password} required size="lg" />
        </FormControl>
        <FormControl id="designation">
          <FormLabel>Designation</FormLabel>
          <Input type="text" ref={designation} required size="lg" />
        </FormControl>
        <Button type="submit" colorScheme="blue" size="lg">
          Register Admin
        </Button>
      </VStack>
    </form>
  );
};

export default AdminRegister;
