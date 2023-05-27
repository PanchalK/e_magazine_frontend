import { React, useState } from "react";
import {
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
  Textarea,
  Input,
  FormLabel,
  useToast
} from "@chakra-ui/react";
import { editPublication } from "../../api/api";

function EditPublicationDetails(props) {

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const updateHandler = () => {
    props.getPublicationsHandler();
  };

  const [editing, setEditing] = useState(false);

  const [titleValue, setTitleValue] = useState(props.data.title);
  const [authorsValue, setAuthorsValue] = useState(props.data.authors);
  const [dateValue, setDateValue] = useState(props.data.publicationdate);
  const [abstractValue, setAbstractValue] = useState(props.data.abstract);
  const [venueValue, setVenueValue] = useState(props.data.venue);
  const [urlValue, setUrlValue] = useState(props.data.url);

  const handleEdit = () => {
    setEditing(true);
  };

  const onCloseHandler = () => {
    updateHandler();
    onClose();
  };

  const handleSave = async () => {
    setEditing(false);
    const publication = {
      title: titleValue,
      authors: authorsValue,
      publicationdate: dateValue,
      abstract: abstractValue,
      venue: venueValue,
      url: urlValue,
    };
    await editPublication(props.data._id, publication);
    toast({
      title: "Publication details updated",
      description: "Successfully updated publication details.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleTitleChange = (event) => {
    setTitleValue(event.target.value);
  };

  const handleAuthorsChange = (event) => {
    setAuthorsValue(event.target.value);
  };

  const handleDateChange = (event) => {
    setDateValue(event.target.value);
  };

  const handleAbstractChange = (event) => {
    setAbstractValue(event.target.value);
  };

  const handleVenueChange = (event) => {
    setVenueValue(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrlValue(event.target.value);
  };
  return (
    <>
      <Button mt={0} onClick={onOpen} colorScheme="blue" size="sm">
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel mt={"1%"}>Title</FormLabel>
            {editing ? (
              <Input value={titleValue} onChange={handleTitleChange} />
            ) : (
              <Text textAlign={"justify"}>{titleValue}</Text>
            )}
            <FormLabel mt={"1%"}>Authors</FormLabel>
            {editing ? (
              <Input value={authorsValue} onChange={handleAuthorsChange} />
            ) : (
              <Text textAlign={"justify"}>{authorsValue}</Text>
            )}
            <FormLabel mt={"1%"}>Publication Date</FormLabel>
            {editing ? (
              <Input value={dateValue} onChange={handleDateChange} />
            ) : (
              <Text textAlign={"justify"}>{dateValue}</Text>
            )}
            <FormLabel mt={"1%"}>Abstract</FormLabel>
            {editing ? (
              <Textarea
                height="50vh"
                value={abstractValue}
                onChange={handleAbstractChange}
              />
            ) : (
              <Text textAlign={"justify"}>{abstractValue}</Text>
            )}
            <FormLabel mt={"1%"}>Venue</FormLabel>
            {editing ? (
              <Input value={venueValue} onChange={handleVenueChange} />
            ) : (
              <Text textAlign={"justify"}>{venueValue}</Text>
            )}
            <FormLabel mt={"1%"}>URL</FormLabel>
            {editing ? (
              <Input value={urlValue} onChange={handleUrlChange} />
            ) : (
              <Text textAlign={"justify"}>{urlValue}</Text>
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
    </>
  );
}

export default EditPublicationDetails;
