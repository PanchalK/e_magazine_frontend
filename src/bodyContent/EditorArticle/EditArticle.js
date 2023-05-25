import {React, useState} from "react";
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
  Input
} from "@chakra-ui/react";
import { editArticle } from "../../api/api";

function EditArticle(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [editing, setEditing] = useState(false);

  const [titleValue, setTitleValue] = useState(props.data.title);
  const [contentValue, setContentValue] = useState(props.data.article);

  const handleEdit = () => {
    setEditing(true);
  };
  
  const onCloseHandler = ()=>{
    props.updateHandler();
    onClose();
  }

  const handleSave = async () => {
    setEditing(false);
    const article = {title: titleValue, content: contentValue}
    await editArticle(props.data._id, article);
  };

  const handleTitleChange = (event) => {
    setTitleValue(event.target.value);
  };

  const handleContentChange = (event) => {
    setContentValue(event.target.value);
  };

  return (
    <>
      <Button mt={0} onClick={onOpen}>
        Open Article
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
                <Textarea height="100vh" value={contentValue} onChange={handleContentChange} />
            ) : (
                <Text textAlign={"justify"}>{contentValue}</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseHandler}>
              Close
            </Button>
            {editing ? (
                <Button colorScheme="blue" variant="ghost" onClick={handleSave}>Save</Button>
            ) : (
              <div>
                <Button colorScheme="blue" variant="ghost" onClick={handleEdit}>Edit</Button>
              </div>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditArticle;
