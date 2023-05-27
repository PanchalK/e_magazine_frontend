import { React } from "react";
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
  Link,
  HStack,
} from "@chakra-ui/react";
import { deletePublication } from "../../api/api";
import EditPublicationDetails from "./EditPublicationDetails";

const EditorPublicationDetails = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const publicationDeleteHandler = async () => {
    await deletePublication(props.data._id);
    props.getPublicationsHandler();
  };

  return (
    <Tr>
      <Td>{props.data.title}</Td>
      <Td>{props.data.authors}</Td>
      <Td>{props.data.publicationdate}</Td>
      <Td>
      <Button mt={0} onClick={onOpen}>
          Open Abstract Content
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{props.data.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{props.data.abstract}</ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
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
        <HStack>
          <EditPublicationDetails data={props.data} getPublicationsHandler={props.getPublicationsHandler}/>
          <Button
            colorScheme="red"
            size="sm"
            onClick={publicationDeleteHandler}
          >
            Delete
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
};

export default EditorPublicationDetails;
