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
  Text,
  Textarea,
  Input,
  useToast
} from "@chakra-ui/react";
import { deleteEvent, editEvent } from "../../api/api";

const EditorEventDetails = (props) => { 
  
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure();

  const eventDeleteHandler = async () => {
    await deleteEvent(props.data._id);
    toast({
      title: 'Event Deleted',
      description: "Successfully deleted event details.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    props.getEventsHandler();
  };
  const updateHandler = () => {
    props.getEventsHandler();
  };

  const [editing, setEditing] = useState(false);

  const [titleValue, setTitleValue] = useState(props.data.title);
  const [contentValue, setContentValue] = useState(props.data.content);

  const handleEdit = () => {
    setEditing(true);
  };

  const onCloseHandler = () => {
    updateHandler();
    onClose();
  };

  const handleSave = async () => {
    setEditing(false);
    const event = { title: titleValue, content: contentValue };
    await editEvent(props.data._id, event);
    toast({
      title: 'Event details updated',
      description: "Successfully updated event details.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  };

  const handleTitleChange = (event) => {
    setTitleValue(event.target.value);
  };

  const handleContentChange = (event) => {
    setContentValue(event.target.value);
  };

  const startdate = new Date(props.data.startdate);
  let startdateValue = startdate.getDate();
  let startmonthValue = startdate.getMonth()+1;
  let startyearValue= startdate.getFullYear();

  const enddate = new Date(props.data.enddate);
  let enddateValue = enddate.getDate();
  let endmonthValue = enddate.getMonth()+1;
  let endyearValue= enddate.getFullYear();

  return (
    <Tr>
      <Td>{props.data.title}</Td>
      <Td>{startdateValue}/{startmonthValue}/{startyearValue}</Td>
      <Td>{enddateValue}/{endmonthValue}/{endyearValue}</Td>
      <Td>
        <Button mt={0} onClick={onOpen}>
          Open Event Content
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader mt={"2%"} textAlign={"center"}>
              {editing ? (
                <Input value={titleValue} onChange={handleTitleChange} />
              ) : (
                <Text textAlign={"justify"}>{titleValue}</Text>
              )}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {editing ? (
                <Textarea
                  height="100vh"
                  value={contentValue}
                  onChange={handleContentChange}
                />
              ) : (
                <Text textAlign={"justify"}>{contentValue}</Text>
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
      </Td>
      <Td>{props.data.place}</Td>
      <Td>
        <Button colorScheme="red" size="sm" onClick={eventDeleteHandler}>
          Delete
        </Button>
      </Td>
    </Tr>
  );
};

export default EditorEventDetails;
