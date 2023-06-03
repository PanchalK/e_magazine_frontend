import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Heading,
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
import { useEffect, useState, React, useRef } from "react";
import AdminEditorDetails from "../bodyContent/AdminEditor/AdminEditorDetails";
import { storage } from "../firebase";
import bcrypt from "bcryptjs";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getEditors, addEditor } from "../api/api";

const AdminEditors = () => {
  
  const toast = useToast();

  const [uploadLoading, setUploadLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Name = useRef();
  const EmailId = useRef();
  const Password = useRef();
  const Designation = useRef();
  const Post = useRef();
  const Program = useRef();
  const Image = useRef();

  const [editorData, setEditorData] = useState([]);
  useEffect(() => {
    const geteditors = async () => {
      const res = await getEditors();
      setEditorData(res.data);
    };
    geteditors();
  }, []);

  const getEditorsHandler = async () => {
    const res = await getEditors();
    setEditorData(res.data);
  };

  const addEditorHandler = (event) => {
    event.preventDefault();
    const ReceivedName = Name.current.value;
    const ReceivedEmailId = EmailId.current.value;
    const ReceivedPassword = Password.current.value;
    const hashedPassword = bcrypt.hashSync(ReceivedPassword, 10);
    const ReceivedDesignation = Designation.current.value;
    const ReceivedPost = Post.current.value;
    const ReceivedProgram = Program.current.value;
    const ReceivedImage = Image.current.files[0];

    setUploadLoading(true);

    const ImageRef = ref(storage, `editorimages/${ReceivedName}`);
    uploadBytes(ImageRef, ReceivedImage).then((response) => {
      getDownloadURL(ref(storage, `editorimages/${ReceivedName}`)).then(
        (url) => {
          let editordetails = {
            name: ReceivedName,
            email: ReceivedEmailId,
            password: hashedPassword,
            designation: ReceivedDesignation,
            post: ReceivedPost,
            program: ReceivedProgram,
            image: url,
          };

          addEditor(editordetails)
            .then((res) => {
              res = res.data;
              console.log("Successfully added Editor", res.data);
              setEditorData(prev => [...prev, res.data])
            })
            .catch((e) => {
              console.log(e);
            })
        })
    }).finally(() => {
      setUploadLoading(false);
      toast({
        title: "Editor Added",
        description: "Successfully added editor.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    })
  };
  return (
    <>
      <Box height="100vh" w="100%" overflowY="scroll">
        <Box mt="10rem" overflowX="auto">
          <Heading as="h2" mb={20} textAlign={"center"}>
            Edit Editorial Board
          </Heading>
          <Table variant='striped' colorScheme='gray'>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Designation</Th>
                <Th>Post</Th>
                <Th>Program</Th>
                <Th>Picture</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {editorData.map((data, index) => (
                <AdminEditorDetails
                  key={index}
                  data={data}
                  getEditorsHandler={getEditorsHandler}
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
            Add Editor
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="right"
            initialFocusRef={Name}
            onClose={onClose}
          >
            <DrawerOverlay />
            <form onSubmit={addEditorHandler}>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">
                  Add new Editor
                </DrawerHeader>

                <DrawerBody>
                  <Stack spacing="24px">
                    <Box>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Input ref={Name} type="text" id="name" required/>
                    </Box>
                    <Box>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input ref={EmailId} type="email" id="email" required/>
                    </Box>
                    <Box>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input ref={Password} type="text" id="password" required/>
                    </Box>
                    <Box>
                      <FormLabel htmlFor="designation">Designation</FormLabel>
                      <Input ref={Designation} type="text" id="designation" required/>
                    </Box>
                    <Box>
                      <FormLabel htmlFor="post">Post</FormLabel>
                      <Input ref={Post} type="text" id="post" required/>
                    </Box>
                    <Box>
                      <FormLabel htmlFor="program">Program</FormLabel>
                      <Input ref={Program} type="text" id="program" />
                    </Box>
                    <Box>
                      <FormLabel htmlFor="image">Upload Picture</FormLabel>
                      <Input type="file" ref={Image} id="image" padding={"5px"}/>
                    </Box>
                  </Stack>
                </DrawerBody>

                <DrawerFooter borderTopWidth="1px">
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" colorScheme="blue">
                  {uploadLoading ? <Spinner /> : "Submit"}
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </form>
          </Drawer>
        </Box>
      </Box>
    </>
  );
};

export default AdminEditors;
