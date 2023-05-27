import { React } from "react";
import { useSelector } from "react-redux";
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
  HStack,
  useToast
} from "@chakra-ui/react";
import { deleteArticle, editArticleApproval } from "../../api/api";
import EditArticle from "./EditArticle";

const EditorArticleDetails = (props) => {

  const toast = useToast()

  const editoremail = useSelector((state) => state.editorauth.editorEmail);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const baseUrl = "http://localhost:8000";

  const sendEmail = async () => {
    let dataSend = {
      senderemail: editoremail,
      receiveremail: props.data.email,
      subject: "Approval of posted Article",
      message: "Greetings! Your article has been accepted for publication in the Annual Magazine of Department of Computer Science & Engineering, Tezpur University.",
    };

    await fetch(`${baseUrl}/sendEmail`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status > 199 && res.status < 300) {
          alert("Sent Successfully !");
        }
      });
  };

  const articleApproveHandler = async () => {
    await editArticleApproval(props.data._id);
    sendEmail();
    toast({
      title: 'Article approved',
      description: "Successfully approved article. Approval mail sent.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    props.getArticlesHandler();
  };

  const articleRejectHandler = async () => {
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
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="lg"
          scrollBehavior="inside"
        >
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
        <EditArticle data={props.data} updateHandler={updateHandler} />
      </Td>
      <Td>
        <Link href={props.data.image} target="_blank" rel="noreferrer">
          {props.data.image && (
            <Image
              src={props.data.image}
              alt={props.data.title}
              boxSize="50px"
            />
          )}
        </Link>
      </Td>
      <Td>
        <HStack>
          <Button colorScheme="teal" size="sm" onClick={articleApproveHandler}>
            Approve
          </Button>
          <Button colorScheme="red" size="sm" onClick={articleRejectHandler}>
            Reject
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
};

export default EditorArticleDetails;
