import { React, useEffect, useState, useRef } from "react";
import {
  addPlacement,
  getPlacements,
} from "../api/api";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
  useDisclosure,
  Spinner,
  useToast
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import EditorPlacementRecordsDetails from "../bodyContent/EditorPlacement/EditorPlacementRecordsDetails";

function EditorPlacementRecords() {

  const toast = useToast()

  const [uploadLoading, setUploadLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const Year = useRef();
  const FileLink = useRef();

  const [placementData, setPlacementData] = useState([]);
  useEffect(() => {
    const getPlacementdatas = async () => {
      const res = await getPlacements();
      setPlacementData(res.data);
    };
    getPlacementdatas();
  }, []);

  const getPlacementsHandler = async () => {
    try {
      const res = await getPlacements();
      setPlacementData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addPlacementHandler = (event) => {
    event.preventDefault();
    const ReceivedYear = Year.current.value;
    const ReceivedFile = FileLink.current.files[0];

    setUploadLoading(true);

    const placementLinkRef = ref(storage, `placementlinks/${ReceivedYear}`);
    uploadBytes(placementLinkRef, ReceivedFile)
      .then((response) => {
        getDownloadURL(ref(storage, `placementlinks/${ReceivedYear}`)).then(
          (url) => {
            let placementDetails = {
              year: ReceivedYear,
              link: url,
            };

            addPlacement(placementDetails)
              .then((res) => {
                res = res.data;
                console.log("Successfully added Placement Details");
                setPlacementData((prev) => [...prev, res.data]);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        );
      })
      .finally(() => {
        setUploadLoading(false);
        toast({
          title: 'Placement record added',
          description: "Successfully added placement record.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        onClose();
      });
  };

  return (
    <Box minH="100vh" w="100%">
      <Box mt="10rem">
        <Heading as="h2" mb={20} textAlign={"center"}>
          Placement Records
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Year</Th>
              <Th>File Link</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {placementData.map((data, index) => (
              <EditorPlacementRecordsDetails
                key={index}
                data={data}
                getPlacementsHandler={getPlacementsHandler}
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
          Upload Placement Record
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          initialFocusRef={Year}
          onClose={onClose}
        >
          <DrawerOverlay />
          <form onSubmit={addPlacementHandler}>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                Upload new Placement record
              </DrawerHeader>

              <DrawerBody>
                <Stack spacing="24px">
                  <Box>
                    <FormLabel htmlFor="year">Year</FormLabel>
                    <Input
                      ref={Year}
                      type="text"
                      id="year"
                      required
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="filelink">Upload File</FormLabel>
                    <Input
                      type="file"
                      ref={FileLink}
                      id="filelink"
                      padding={"5px"}
                      required
                    />
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

export default EditorPlacementRecords;
