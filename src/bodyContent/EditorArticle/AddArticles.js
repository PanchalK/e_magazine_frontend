import {
  Box,
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
  Textarea,
  useToast
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState, React, useRef } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addArticle } from "../../api/api";

function NotApprovedArticles(props) {

  //states
  const [uploadLoading, setUploadLoading] = useState(false);
  
  //hooks
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  //input refs
  const Name = useRef();
  const EmailId = useRef();
  const Program = useRef();
  const Semester = useRef();
  const Title = useRef();
  const Summary = useRef();
  const Article = useRef();
  const Image = useRef();

  //helper functions
  const upload_artcle = (
    url,
    ReceivedName,
    ReceivedEmailId,
    ReceivedProgram,
    ReceivedSemester,
    ReceivedTitle,
    ReceivedSummary,
    ReceivedArticle,
  ) => {
    let articledetails = {
      name: ReceivedName,
      email: ReceivedEmailId,
      program: ReceivedProgram,
      semester: ReceivedSemester,
      title: ReceivedTitle,
      summary: ReceivedSummary,
      article: ReceivedArticle,
      image: url,
      approved: true,
    };

    console.log(articledetails);
    setUploadLoading(false);

    addArticle(articledetails)
      .then((res) => {
        res = res.data;
        props.getArticlesHandler();
        console.log("Successfully added Article", res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setUploadLoading(false);
        toast({
          title: 'Article added',
          description: "Successfully added article.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        onClose();
      })
  }

  const addArticleHandler = (event) => {
    event.preventDefault();
    
    const ReceivedName = Name.current.value;
    const ReceivedEmailId = EmailId.current.value;
    const ReceivedProgram = Program.current.value;
    const ReceivedSemester = Semester.current.value;
    const ReceivedTitle = Title.current.value;
    const ReceivedSummary = Summary.current.value;
    const ReceivedArticle = Article.current.value;
    const ReceivedImage = Image.current.files[0];

    const ImageRef = ref(storage, `approvedarticleimages/${ReceivedTitle}_${ReceivedName}`);

    console.log("input file", ReceivedImage);

    setUploadLoading(true);
    if(ReceivedImage){
      uploadBytes(ImageRef, ReceivedImage)
      .then((response) => {
        getDownloadURL(ref(storage, `approvedarticleimages/${ReceivedTitle}_${ReceivedName}`)).then(
          (url) => {
            upload_artcle(
              url,
              ReceivedName,
              ReceivedEmailId,
              ReceivedProgram,
              ReceivedSemester,
              ReceivedTitle,
              ReceivedSummary,
              ReceivedArticle,
            );
          }
        );
      })
      .catch(e => {
        console.log(e.message);
      })
    } else {
      upload_artcle(
        null,
        ReceivedName,
        ReceivedEmailId,
        ReceivedProgram,
        ReceivedSemester,
        ReceivedTitle,
        ReceivedSummary,
        ReceivedArticle,
      );
    }
  };

  return (
    <>
      <Button
        mt={"4%"}
        mb={"4%"}
        leftIcon={<AddIcon />}
        colorScheme="teal"
        onClick={onOpen}
      >
        Add Article
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={Name}
        onClose={onClose}
      >
        <DrawerOverlay />
        <form onSubmit={addArticleHandler}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Add new Article</DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="Name">Name</FormLabel>
                  <Input ref={Name} type="text" id="Name" required />
                </Box>
                <Box>
                  <FormLabel htmlFor="Email">Email</FormLabel>
                  <Input ref={EmailId} type="email" id="Email" />
                </Box>
                <Box>
                  <FormLabel htmlFor="Program">Program</FormLabel>
                  <Input ref={Program} type="text" id="Program" />
                </Box>
                <Box>
                  <FormLabel htmlFor="Semester">Semester</FormLabel>
                  <Input ref={Semester} type="number" id="Semester" />
                </Box>
                <Box>
                  <FormLabel htmlFor="Title">Title</FormLabel>
                  <Input ref={Title} type="text" id="Title" required />
                </Box>
                <Box>
                  <FormLabel htmlFor="Summary">Summary</FormLabel>
                  <Textarea ref={Summary} type="text" id="Summary" />
                </Box>
                <Box>
                  <FormLabel htmlFor="Article">Article</FormLabel>
                  <Textarea ref={Article} type="text" id="Article" required />
                </Box>
                <Box>
                  <FormLabel htmlFor="image">
                    Upload Image (Related to Article)
                  </FormLabel>
                  <Input type="file" ref={Image} id="image" padding={"5px"} />
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
    </>
  );
}

export default NotApprovedArticles;
