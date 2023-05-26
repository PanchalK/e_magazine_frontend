import { useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormHelperText,
  Spinner,
} from "@chakra-ui/react";
import { addArticle } from "../api/api";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Post = () => {
  const history = useHistory();
  const Name = useRef();
  const EmailId = useRef();
  const Program = useRef();
  const Semester = useRef();
  const Title = useRef();
  const Summary = useRef();
  const Article = useRef();
  const Image = useRef();

  //loading states
  const [uploadLoading, setUploadLoading] = useState(false);

  const upload_artcle = (
    url,
    ReceivedName,
    ReceivedEmailId,
    ReceivedProgram,
    ReceivedSemester,
    ReceivedTitle,
    ReceivedSummary,
    ReceivedArticle
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
      approved: false,
    };

    setUploadLoading(false);

    addArticle(articledetails)
      .then((res) => {
        console.log("Successfully added Article", res);

        swal({
          title: "Thank you for Posting!",
          text: "You will be notified shortly.",
          icon: "success",
          buttons: false,
          timer: 3500,
        });

        setTimeout(() => {
          history.replace("/");
        }, 3000);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setUploadLoading(false);
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const ReceivedName = Name.current.value;
    const ReceivedEmailId = EmailId.current.value;
    const ReceivedProgram = Program.current.value;
    const ReceivedSemester = Semester.current.value;
    const ReceivedTitle = Title.current.value;
    const ReceivedSummary = Summary.current.value;
    const ReceivedArticle = Article.current.value;
    const ReceivedImage = Image.current.files[0];

    const ImageRef = ref(
      storage,
      `napprovedarticleimages/${ReceivedTitle}_${ReceivedName}`
    );

    console.log("input file", ReceivedImage);

    setUploadLoading(true);
    if (ReceivedImage) {
      uploadBytes(ImageRef, ReceivedImage)
        .then((response) => {
          getDownloadURL(
            ref(
              storage,
              `napprovedarticleimages/${ReceivedTitle}_${ReceivedName}`
            )
          ).then((url) => {
            upload_artcle(
              url,
              ReceivedName,
              ReceivedEmailId,
              ReceivedProgram,
              ReceivedSemester,
              ReceivedTitle,
              ReceivedSummary,
              ReceivedArticle
            );
          });
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else {
      upload_artcle(
        null,
        ReceivedName,
        ReceivedEmailId,
        ReceivedProgram,
        ReceivedSemester,
        ReceivedTitle,
        ReceivedSummary,
        ReceivedArticle
      );
    }
  };

  return (
    <div>
      <Box height={"100%"} backgroundColor={"gray.200"} pt={"10%"} pb={"10%"}>
        <Box
          w={"40vw"}
          m={"auto"}
          backgroundColor={"white"}
          p="2%"
          borderRadius={"5px"}
          boxShadow={"1px 1px 12px 0.5px gray"}
        >
          <form onSubmit={submitHandler}>
            <FormControl>
              <FormHelperText p="20px" mt={"-20px"} mb={"15px"}>
                **The Article submitted will be reviewed by the Editorial Board
                and the status will be updated via email shortly.
              </FormHelperText>
              <FormLabel>Full Name</FormLabel>
              <Input type="text" ref={Name} required />
              <FormLabel>Email</FormLabel>
              <Input type="email" ref={EmailId} required />
              <FormLabel>Program</FormLabel>
              <Input type="text" ref={Program} />
              <FormLabel>Semester</FormLabel>
              <Input type="number" ref={Semester} />
              <FormLabel>Title of Article</FormLabel>
              <Input type="text" ref={Title} required />
              <FormLabel>Brief Summary of the Article</FormLabel>
              <Textarea
                placeholder="Provide a brief summary of your article here"
                ref={Summary}
                required
              />
              <FormLabel>Article</FormLabel>
              <Textarea
                placeholder="Type your article here"
                ref={Article}
                required
              />
              <FormLabel>
                Upload image related to the Article (if any)
              </FormLabel>
              <Input type="file" ref={Image} />
              <Button type="submit" mt="4" colorScheme="blue">
                {uploadLoading ? <Spinner /> : "Submit"}
              </Button>
            </FormControl>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default Post;
