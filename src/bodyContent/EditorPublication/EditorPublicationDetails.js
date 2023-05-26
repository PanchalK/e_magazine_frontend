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
  Link,
} from "@chakra-ui/react";
import { deletePublication, editPublication } from "../../api/api";

const EditorPublicationDetails = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const publicationDeleteHandler = async () => {
    await deletePublication(props.data._id);
    props.getPublicationsHandler();
  };
  const updateHandler = () => {
    props.getPublicationsHandler();
  };

  const [editing, setEditing] = useState(false);

  const [titleValue, setTitleValue] = useState(props.data.title);
  const [abstractValue, setAbstractValue] = useState(props.data.abstract);

  const handleEdit = () => {
    setEditing(true);
  };

  const onCloseHandler = () => {
    updateHandler();
    onClose();
  };

  const handleSave = async () => {
    setEditing(false);
    const publication = { title: titleValue, abstract: abstractValue };
    await editPublication(props.data._id, publication);
  };

  const handleTitleChange = (event) => {
    setTitleValue(event.target.value);
  };

  const handleAbstractChange = (event) => {
    setAbstractValue(event.target.value);
  };

  const publicationdate = new Date(props.data.publicationdate);
  let dateValue = publicationdate.getDate();
  let monthValue = publicationdate.getMonth() + 1;
  let yearValue = publicationdate.getFullYear();

  return (
    <Tr>
      <Td>{props.data.title}</Td>
      <Td>{props.data.authors}</Td>
      <Td>
        {dateValue}/{monthValue}/{yearValue}
      </Td>
      <Td>
        <Button mt={0} onClick={onOpen}>
          Open Abstract Content
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} size="full">
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
                  value={abstractValue}
                  onChange={handleAbstractChange}
                />
              ) : (
                <Text textAlign={"justify"}>{abstractValue}</Text>
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
      <Td>{props.data.venue}</Td>
      <Td>
        {props.data.url && (
          <Link
            href={props.data.url}
            target="_blank"
            rel="noreferrer"
            color={"blue"}
          >
            Click Here
          </Link>
        )}
      </Td>
      <Td>
        <Button colorScheme="red" size="sm" onClick={publicationDeleteHandler}>
          Delete
        </Button>
      </Td>
    </Tr>
  );
};

export default EditorPublicationDetails;
