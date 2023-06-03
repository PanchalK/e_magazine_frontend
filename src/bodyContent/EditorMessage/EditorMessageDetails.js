import { React, useState } from "react";
import {
  Button,
  Tr,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack,
  useToast,
  Text,
  Textarea,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { deleteMessage, editMessage } from "../../api/api";

const EditorMessageDetails = (props) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateHandler = () => {
    props.getMessagesHandler();
  };

  const [editing, setEditing] = useState(false);

  const [nameValue, setNameValue] = useState(props.data.name);
  const [designationValue, setDesignationValue] = useState(props.data.designation);
  const [messageValue, setMessageValue] = useState(props.data.message);

  const handleEdit = () => {
    setEditing(true);
  };

  const onCloseHandler = () => {
    updateHandler();
    onClose();
  };

  const handleSave = async () => {
    setEditing(false);
    const message = {
      name: nameValue,
      designation: designationValue,
      message: messageValue,
    };
    await editMessage(props.data._id, message);
    toast({
      title: "Message details updated",
      description: "Successfully updated message details.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  };

  const handleDesignationChange = (event) => {
    setDesignationValue(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessageValue(event.target.value);
  };

  const messageDeleteHandler = async () => {
    await deleteMessage(props.data._id);
    toast({
      title: "Message details Deleted",
      description: "Successfully deleted Message details.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    props.getMessagesHandler();
  };

  return (
    <Tr>
      <Td>{props.data.name}</Td>
      <Td>{props.data.designation}</Td>
      <Td>{props.data.message}</Td>
      <Td>
        <HStack>
        <Button mt={0} onClick={onOpen} colorScheme="blue" size="sm">
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel mt={"1%"}>Name</FormLabel>
            {editing ? (
              <Input value={nameValue} onChange={handleNameChange} />
            ) : (
              <Text textAlign={"justify"}>{nameValue}</Text>
            )}
            <FormLabel mt={"1%"}>Designation</FormLabel>
            {editing ? (
              <Input value={designationValue} onChange={handleDesignationChange} />
            ) : (
              <Text textAlign={"justify"}>{designationValue}</Text>
            )}
            <FormLabel mt={"1%"}>Message</FormLabel>
            {editing ? (
              <Textarea
                height="50vh"
                value={messageValue}
                onChange={handleMessageChange}
              />
            ) : (
              <Text textAlign={"justify"}>{messageValue}</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseHandler}>
              Close
            </Button>
            {editing ? (
              <Button colorScheme="blue" variant="ghost" onClick={handleSave}>
                Save
              </Button>
            ) : (
              <div>
                <Button colorScheme="blue" variant="ghost" onClick={handleEdit}>
                  Edit
                </Button>
              </div>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
          <Button colorScheme="red" size="sm" onClick={messageDeleteHandler}>
            Delete
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
};

export default EditorMessageDetails;
