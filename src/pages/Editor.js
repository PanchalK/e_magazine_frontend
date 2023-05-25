import { Box, Text, Image, Center } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getEditor } from "../api/api";
const Editor = () => {
  const [editorData, setEditorData] = useState([]);
  const editoremail = useSelector((state) => state.editorauth.editorEmail);
  useEffect(()=>{
    const geteditor = async () => {
      try {
        const res = await getEditor({email: editoremail});
        setEditorData(res.data);
      } catch (error) {
        console.log(error);
      }
      };
      geteditor();
  },[editoremail]);
  return (
    <>
      <Box minH="100vh" w="100%">
        <Box textAlign="center" mt="10rem">
          <Center>
            <Image src={editorData.image} boxSize="100px" mb={"2%"} borderRadius={"full"} />
          </Center>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Welcome, Editor!
          </Text>
          <Box
            maxW="sm"
            mx="auto"
            p={4}
            borderWidth={1}
            borderRadius="md"
            boxShadow="lg"
            bg="white"
          >
            <Text fontSize="lg" fontWeight="bold" mb={5}>
              Editor Details
            </Text>
            <Text textAlign={"left"} mb={2}>
              <strong>Name:</strong> {editorData.name}
            </Text>
            <Text textAlign={"left"} mb={2}>
              <strong>Email:</strong> {editorData.email}
            </Text>
            <Text textAlign={"left"} mb={2}>
              <strong>Designation:</strong> {editorData.designation}
            </Text>
            <Text textAlign={"left"}>
              <strong>Post:</strong> {editorData.post}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Editor;
