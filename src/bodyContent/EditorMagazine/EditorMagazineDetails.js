import {
  Button,
  Tr,
  Td,
  Image,
  Link,
  Box,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { deleteMagazine } from "../../api/api";
import { BsCheckCircleFill } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import React from "react";

const EditorMagazineDetails = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  const date = new Date(props.data.releasedate);
  let dayValue = date.getDate();
  let monthValue = date.getMonth() + 1;
  let yearValue = date.getFullYear();

  const magazineDeleteHandler = async () => {
    await deleteMagazine(props.data._id);
    toast({
      title: "Magazine Deleted",
      description: "Successfully deleted magazine.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    props.getMagazinesHandler();
    onClose();
  };
  return (
    <Tr>
      <Td>{props.data.magazinecode}</Td>
      <Td>{props.data.title}</Td>
      <Td>
        {dayValue}/{monthValue}/{yearValue}
      </Td>
      <Td>
        <Link href={props.data.coverimg} target="_blank" rel="noreferrer">
          <Image
            src={props.data.coverimg}
            alt={props.data.magazinecode}
            boxSize="50px"
          />
        </Link>
      </Td>
      <Td>
        <Link
          href={props.data.link}
          target="_blank"
          rel="noreferrer"
          color={"blue"}
        >
          Click Here
        </Link>
      </Td>
      <Td>
        {props.data.approved ? (
          <Box pl={"15%"}>
            <BsCheckCircleFill size={25} color="teal" />
          </Box>
        ) : (
          <Box pl={"12.5%"}>
            <RiErrorWarningLine size={30} color="#CC5500" />
          </Box>
        )}
      </Td>
      <Td>
        <Button colorScheme="red" size="sm" onClick={onOpen}>
          Delete
        </Button>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Magazine
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  ml={3}
                  onClick={magazineDeleteHandler}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Td>
    </Tr>
  );
};

export default EditorMagazineDetails;
