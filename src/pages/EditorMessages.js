import { useState, useEffect, React, useRef } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Stack,
  FormLabel,
  Input,
  Spinner,
  useDisclosure,
  Textarea,
  useToast
} from "@chakra-ui/react";
import { addMessage, getMessages } from "../api/api";
import { AddIcon } from "@chakra-ui/icons";
import EditorMessageDetails from "../bodyContent/EditorMessage/EditorMessageDetails";

function EditorMessages() {

  const toast = useToast()

  const [uploadLoading, setUploadLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [messagesData, setMessagesData] = useState([]);

  const Name = useRef();
  const Designation = useRef();
  const Message = useRef();

  useEffect(() => {
    const getMessagesdatas = async () => {
      const res = await getMessages();
      setMessagesData(res.data);
    };
    getMessagesdatas();
  }, []);

  const getMessagesHandler = async () => {
    try {
      const res = await getMessages();
      setMessagesData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addMessageHandler = (event) => {
    event.preventDefault();
    const ReceivedName = Name.current.value;
    const ReceivedDesignation = Designation.current.value;
    const ReceivedMessage = Message.current.value;

    setUploadLoading(true);
    let messageDetails = {
      name: ReceivedName,
      designation: ReceivedDesignation,
      message: ReceivedMessage,
    };

    addMessage(messageDetails)
      .then((res) => {
        res = res.data;
        console.log("Successfully added Message Details");
        setMessagesData((prev) => [...prev, res.data]);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setUploadLoading(false);
        toast({
          title: 'Message details added',
          description: "Successfully added message details.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        onClose();
      });
  };

  return (
    <Box height="100vh" w="100%" overflowY="scroll">
      <Box mt="10rem">
        <Heading as="h2" mb={20} textAlign={"center"}>
          Messages
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Designation</Th>
              <Th>Message</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {messagesData.map((data, index) => (
              <EditorMessageDetails
                key={index}
                data={data}
                getMessagesHandler={getMessagesHandler}
              />
            ))}
          </Tbody>
        </Table>
        <Button
          mt={"4%"}
          mb={"4%"}
          leftIcon={<AddIcon />}
          colorScheme="teal"
          onClick={onOpen}
        >
          Add Message
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          initialFocusRef={Name}
          onClose={onClose}
        >
          <DrawerOverlay />
          <form onSubmit={addMessageHandler}>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                Add new Message
              </DrawerHeader>

              <DrawerBody>
                <Stack spacing="24px">
                  <Box>
                    <FormLabel htmlFor="Name">Name</FormLabel>
                    <Input ref={Name} type="text" id="Name" required />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="Designation">Designation</FormLabel>
                    <Input ref={Designation} type="text" id="Designation" required />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="Message">Message</FormLabel>
                    <Textarea ref={Message} type="text" id="Message" required />
                  </Box>
                </Stack>
              </DrawerBody>

              <DrawerFooter borderTopWidth="1px">
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="blue">
                  {uploadLoading ? <Spinner /> : "Upload"}
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </form>
        </Drawer>
      </Box>
    </Box>
  );
}

export default EditorMessages;
