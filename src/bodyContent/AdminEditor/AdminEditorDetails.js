import { useState, React, useRef } from "react";
import {
  Tr,
  Td,
  Image,
  useToast,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Input,
  FormLabel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { deleteEditor, editEditor } from "../../api/api";

const AdminEditorDetails = (props) => {
  const toast = useToast();
  const cancelRef = useRef();

  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const updateHandler = () => {
    props.getEditorsHandler();
  };

  const [editing, setEditing] = useState(false);

  const [nameValue, setNameValue] = useState(props.data.name);
  const [emailValue, setEmailValue] = useState(props.data.email);
  const [designationValue, setDesignationValue] = useState(props.data.designation);
  const [postValue, setPostValue] = useState(props.data.post);
  const [programValue, setProgramValue] = useState(props.data.program);

  const handleEdit = () => {
    setEditing(true);
  };

  const onCloseHandler = () => {
    updateHandler();
    onModalClose();
  };

  const handleSave = async () => {
    setEditing(false);
    const editor = {
      name: nameValue,
      email: emailValue,
      designation: designationValue,
      post: postValue,
      program: programValue,
    };
    await editEditor(props.data._id, editor);
    toast({
      title: "Editor details updated",
      description: "Successfully updated editor details.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };

  const handleDesignationChange = (event) => {
    setDesignationValue(event.target.value);
  };

  const handlePostChange = (event) => {
    setPostValue(event.target.value);
  };

  const handleProgramChange = (event) => {
    setProgramValue(event.target.value);
  };

  const editorDeleteHandler = async () => {
    await deleteEditor(props.data._id);
    toast({
      title: "Editor Deleted",
      description: "Successfully deleted editor.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    props.getEditorsHandler();
  };
  return (
    <Tr>
      <Td>{props.data.name}</Td>
      <Td>{props.data.email}</Td>
      <Td>{props.data.designation}</Td>
      <Td>{props.data.post}</Td>
      <Td>{props.data.program}</Td>
      <Td>
        <Image
          src={props.data.image}
          alt={props.data.name}
          boxSize="50px"
          borderRadius="full"
        />
      </Td>
      <Td>
        <HStack>
          <Button mt={0} onClick={onModalOpen} colorScheme="blue" size="sm">
            Edit
          </Button>
          <Modal isOpen={isModalOpen} onClose={onModalClose} size="6xl">
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
                <FormLabel mt={"1%"}>Email</FormLabel>
                {editing ? (
                  <Input type="email" value={emailValue} onChange={handleEmailChange} />
                ) : (
                  <Text textAlign={"justify"}>{emailValue}</Text>
                )}
                <FormLabel mt={"1%"}>Designation</FormLabel>
                {editing ? (
                  <Input value={designationValue} onChange={handleDesignationChange} />
                ) : (
                  <Text textAlign={"justify"}>{designationValue}</Text>
                )}
                <FormLabel mt={"1%"}>Post</FormLabel>
                {editing ? (
                  <Input value={postValue} onChange={handlePostChange} />
                ) : (
                  <Text textAlign={"justify"}>{postValue}</Text>
                )}
                <FormLabel mt={"1%"}>Program</FormLabel>
                {editing ? (
                  <Input value={programValue} onChange={handleProgramChange} />
                ) : (
                  <Text textAlign={"justify"}>{programValue}</Text>
                )}
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onCloseHandler}>
                  Close
                </Button>
                {editing ? (
                  <Button
                    colorScheme="blue"
                    variant="ghost"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                ) : (
                  <div>
                    <Button
                      colorScheme="blue"
                      variant="ghost"
                      onClick={handleEdit}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Button colorScheme="red" size="sm" onClick={onAlertOpen}>
            Delete
          </Button>
          <AlertDialog
          isOpen={isAlertOpen}
          leastDestructiveRef={cancelRef}
          onClose={onAlertClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Editor
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onAlertClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  ml={3}
                  onClick={editorDeleteHandler}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        </HStack>
      </Td>
    </Tr>
  );
};

export default AdminEditorDetails;
