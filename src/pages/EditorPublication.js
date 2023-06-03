import { useState, useEffect, React, useRef } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Stack,
  FormLabel,
  Input,
  Spinner,
  useDisclosure,
  Textarea,
  useToast
} from "@chakra-ui/react";
import { addPublication, getPublications } from "../api/api";
import { AddIcon } from "@chakra-ui/icons";
import EditorPublicationDetails from "../bodyContent/EditorPublication/EditorPublicationDetails";

function EditorPublication() {

  const toast = useToast()

  const [uploadLoading, setUploadLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [publicationsData, setPublicationsData] = useState([]);

  const Title = useRef();
  const Authors = useRef();
  const PublicationDate = useRef();
  const Abstract = useRef();
  const Venue = useRef();
  const URL = useRef();

  useEffect(() => {
    const getPublicationsdatas = async () => {
      const res = await getPublications();
      setPublicationsData(res.data);
    };
    getPublicationsdatas();
  }, []);

  const getPublicationsHandler = async () => {
    try {
      const res = await getPublications();
      setPublicationsData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addPublicationHandler = (event) => {
    event.preventDefault();
    const ReceivedTitle = Title.current.value;
    const ReceivedAuthors = Authors.current.value;
    const ReceivedPublicationDate = PublicationDate.current.value;
    const ReceivedAbstract = Abstract.current.value;
    const ReceivedVenue = Venue.current.value;
    const ReceivedURL = URL.current.value;

    setUploadLoading(true);
    let publicationDetails = {
      title: ReceivedTitle,
      authors: ReceivedAuthors,
      publicationdate: ReceivedPublicationDate,
      abstract: ReceivedAbstract,
      venue: ReceivedVenue,
      url: ReceivedURL,
    };

    addPublication(publicationDetails)
      .then((res) => {
        res = res.data;
        console.log("Successfully added Publication Details");
        setPublicationsData((prev) => [...prev, res.data]);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setUploadLoading(false);
        toast({
          title: 'Publication details added',
          description: "Successfully added publication details.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        onClose();
      });
  };

  return (
    <Box height="100vh" w="100%" overflowY="scroll">
      <Box mt="10rem">
        <Heading as="h2" mb={20} textAlign={"center"}>
          Publications
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Authors</Th>
              <Th>Publication Date</Th>
              <Th>Abstract</Th>
              <Th>Venue (Journal/Conference)</Th>
              <Th>URL</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {publicationsData.map((data, index) => (
              <EditorPublicationDetails
                key={index}
                data={data}
                getPublicationsHandler={getPublicationsHandler}
              />
            ))}
          </Tbody>
        </Table>
        <Button
          mt={"4%"}
          mb={"4%"}
          leftIcon={<AddIcon />}
          colorScheme="teal"
          onClick={onOpen}
        >
          Upload Publication
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          initialFocusRef={Title}
          onClose={onClose}
        >
          <DrawerOverlay />
          <form onSubmit={addPublicationHandler}>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                Upload new Publication
              </DrawerHeader>

              <DrawerBody>
                <Stack spacing="24px">
                  <Box>
                    <FormLabel htmlFor="Title">Title</FormLabel>
                    <Input ref={Title} type="text" id="Title" required />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="Authors">Authors</FormLabel>
                    <Input ref={Authors} type="text" id="Authors" required />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="PublicationDate">Publication Date</FormLabel>
                    <Input ref={PublicationDate} type="text" placeholder="DD/MM/YYYY" id="PublicationDate" required />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="Abstract">Abstract (Summary of the Publication)</FormLabel>
                    <Textarea ref={Abstract} type="text" id="Abstract" required />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="Venue">Venue (Journal/Conference)</FormLabel>
                    <Input ref={Venue} type="text" id="Venue" required />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="URL">URL</FormLabel>
                    <Input ref={URL} type="text" id="URL" />
                  </Box>
                </Stack>
              </DrawerBody>

              <DrawerFooter borderTopWidth="1px">
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="blue">
                  {uploadLoading ? <Spinner /> : "Upload"}
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </form>
        </Drawer>
      </Box>
    </Box>
  );
}

export default EditorPublication;
