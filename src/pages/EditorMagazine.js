import { React, useEffect, useState, useRef } from "react";
import { addMagazine, getMagazines } from "../api/api";
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
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import EditorMagazineDetails from "../bodyContent/EditorMagazine/EditorMagazineDetails";

function EditorMagazine() {
  const [uploadLoading, setUploadLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const MagazineCode = useRef();
  const Title = useRef();
  const ReleaseDate = useRef();
  const CoverImage = useRef();
  const Magazine = useRef();

  const [magazineData, setMagazineData] = useState([]);
  useEffect(() => {
    const getMagazinedatas = async () => {
      const res = await getMagazines();
      setMagazineData(res.data);
    };
    getMagazinedatas();
  }, []);

  const getMagazinesHandler = async () => {
    try {
      const res = await getMagazines();
      setMagazineData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addMagazineHandler = (event) => {
    event.preventDefault();
    const ReceivedMagazineCode = MagazineCode.current.value;
    const ReceivedTitle = Title.current.value;
    const ReceivedReleaseDate = ReleaseDate.current.value;
    const ReceivedCoverImage = CoverImage.current.files[0];
    const ReceivedMagazine = Magazine.current.files[0];
    var dateEntered = new Date(ReceivedReleaseDate);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    setUploadLoading(true);

    const coverImageRef = ref(
      storage,
      `magazinecovers/${ReceivedMagazineCode}`
    );
    const magazineRef = ref(
      storage,
      `magazinelinks/${ReceivedMagazineCode}`
    );
    uploadBytes(coverImageRef, ReceivedCoverImage)
      .then((response) => {
        getDownloadURL(
          ref(storage, `magazinecovers/${ReceivedMagazineCode}`)
        ).then((coverurl) => {
          uploadBytes(magazineRef, ReceivedMagazine).then((response) => {
            getDownloadURL(
              ref(storage, `magazinelinks/${ReceivedMagazineCode}`)
            ).then((linkurl) => {
              let magazinedetails = {
                magazinecode: ReceivedMagazineCode,
                title: ReceivedTitle,
                releasedate: {
                  day: dateEntered.getDate(),
                  month: monthNames[dateEntered.getMonth()],
                  year: dateEntered.getFullYear(),
                },
                coverimg: coverurl,
                link: linkurl,
                approved: false,
              };

              addMagazine(magazinedetails)
                .then((res) => {
                  res = res.data;
                  console.log("Successfully added Editor");
                  setMagazineData((prev) => [...prev, res.data]);
                })
                .catch((e) => {
                  console.log(e);
                });
            });
          });
        });
      })
      .finally(() => {
        setUploadLoading(false);
        onClose();
      });
  };

  return (
    <Box minH="100vh" w="100%">
      <Box mt="10rem">
        <Heading as="h2" mb={20} textAlign={"center"}>
          Magazines
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Magazine Code</Th>
              <Th>Title</Th>
              <Th>Release Date</Th>
              <Th>Cover Image</Th>
              <Th>Magazine Link</Th>
              <Th>Approved</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {magazineData.map((data, index) => (
              <EditorMagazineDetails
                key={index}
                data={data}
                getMagazinesHandler={getMagazinesHandler}
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
          Upload Magazine
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          initialFocusRef={MagazineCode}
          onClose={onClose}
        >
          <DrawerOverlay />
          <form onSubmit={addMagazineHandler}>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                Upload new Magazine
              </DrawerHeader>

              <DrawerBody>
                <Stack spacing="24px">
                  <Box>
                    <FormLabel htmlFor="magazinecode">Magazine Code</FormLabel>
                    <Input
                      ref={MagazineCode}
                      type="text"
                      id="magazinecode"
                      required
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input ref={Title} type="text" id="title" required />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="releasedate">Release Date</FormLabel>
                    <Input
                      ref={ReleaseDate}
                      type="date"
                      id="releasedate"
                      required
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="coverimg">
                      Upload Cover Picture
                    </FormLabel>
                    <Input
                      type="file"
                      ref={CoverImage}
                      id="coverimg"
                      padding={"5px"}
                      required
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="magazine">Upload Magazine</FormLabel>
                    <Input
                      type="file"
                      ref={Magazine}
                      id="magazine"
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

export default EditorMagazine;
