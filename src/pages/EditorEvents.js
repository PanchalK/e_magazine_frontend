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
import { addEvent, getEvents } from "../api/api";
import { AddIcon } from "@chakra-ui/icons";
import EditorEventDetails from "../bodyContent/EditorEvent/EditorEventDetails";

function EditorEvents() {

  const toast = useToast()

  const [uploadLoading, setUploadLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [eventsData, setEventsData] = useState([]);

  const Title = useRef();
  const EventStartDate = useRef();
  const EventEndDate = useRef();
  const Content = useRef();
  const Place = useRef();

  useEffect(() => {
    const getEventsdatas = async () => {
      const res = await getEvents();
      setEventsData(res.data);
    };
    getEventsdatas();
  }, []);

  const getEventsHandler = async () => {
    try {
      const res = await getEvents();
      setEventsData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addEventHandler = (event) => {
    event.preventDefault();
    const ReceivedTitle = Title.current.value;
    const ReceivedStartDate = EventStartDate.current.value;
    const ReceivedEndDate = EventEndDate.current.value;
    const ReceivedContent = Content.current.value;
    const ReceivedPlace = Place.current.value;

    const updatedStartDate = new Date(ReceivedStartDate);
    const updatedEndDate = new Date(ReceivedEndDate);

    setUploadLoading(true);
    let eventDetails = {
      title: ReceivedTitle,
      startdate: updatedStartDate,
      enddate: updatedEndDate,
      content: ReceivedContent,
      place: ReceivedPlace,
    };

    addEvent(eventDetails)
      .then((res) => {
        res = res.data;
        console.log("Successfully added Event Details");
        setEventsData((prev) => [...prev, res.data]);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setUploadLoading(false);
        toast({
          title: 'Event added',
          description: "Successfully added event details.",
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
          Departmental Events
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Start Date</Th>
              <Th>End Date</Th>
              <Th>Content</Th>
              <Th>Place</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {eventsData.map((data, index) => (
              <EditorEventDetails
                key={index}
                data={data}
                getEventsHandler={getEventsHandler}
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
          Upload Event
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          initialFocusRef={Title}
          onClose={onClose}
        >
          <DrawerOverlay />
          <form onSubmit={addEventHandler}>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                Upload new Departmental Event
              </DrawerHeader>

              <DrawerBody>
                <Stack spacing="24px">
                  <Box>
                    <FormLabel htmlFor="Title">Title</FormLabel>
                    <Input ref={Title} type="text" id="Title" required />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="startDate">Start Date</FormLabel>
                    <Input ref={EventStartDate} type="date" id="startDate" required />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="endDate">End Date</FormLabel>
                    <Input ref={EventEndDate} type="date" id="endDate" />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="Content">Content</FormLabel>
                    <Textarea ref={Content} type="text" id="Content" required />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="Place">Place</FormLabel>
                    <Input ref={Place} type="text" id="Place" required />
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

export default EditorEvents;
