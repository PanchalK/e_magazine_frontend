import { React } from "react";
import {
  Button,
  Tr,
  Td,
  Image,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { deleteArticle } from "../../api/api";
import EditArticle from "./EditArticle";

const EditorArticleDetails = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const articleDeleteHandler = async () => {
    await deleteArticle(props.data._id);
    props.getArticlesHandler();
  };
  const updateHandler = () => {
    props.getArticlesHandler();
  };

  return (
    <Tr>
      <Td>{props.data.name}</Td>
      <Td>{props.data.email}</Td>
      <Td>{props.data.program}</Td>
      <Td>{props.data.semester}</Td>
      <Td>{props.data.title}</Td>
      <Td>
        <Button mt={0} onClick={onOpen}>
          Open Summary
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{props.data.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{props.data.summary}</ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Td>
      <Td>
        <EditArticle data={props.data} updateHandler={updateHandler}/>
      </Td>
      <Td>
        <Link href={props.data.image} target="_blank" rel="noreferrer">
          {props.data.image && <Image src={props.data.image} alt={props.data.title} boxSize="50px" />}
        </Link>
      </Td>
      <Td>
        <Button colorScheme="red" size="sm" onClick={articleDeleteHandler}>
          Delete
        </Button>
      </Td>
    </Tr>
  );
};

export default EditorArticleDetails;
