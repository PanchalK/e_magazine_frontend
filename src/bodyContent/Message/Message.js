import { useEffect, useState } from "react";
import { getMessage } from "../../api/api";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

const Message =() => {
    const [hodResponseName, setHodResponseName] = useState();
    const [hodResponseMessage, setHodResponseMessage] = useState();
    const [editorResponseName, setEditorResponseName] = useState();
    const [editorResponseMessage, setEditorResponseMessage] = useState();
    useEffect(()=>{
        const hod = async()=>{
            try {
                const res = await getMessage({designation: "Head of Department"});
                setHodResponseName(res.data.name);
                setHodResponseMessage(res.data.message);
            } catch (error) {
                console.log(error);
            }
        }
        hod();
    },[])
    useEffect(()=>{
        const editor = async()=>{
            try {
                const res = await getMessage({designation: "Chief Editor"});
                setEditorResponseName(res.data.name);
                setEditorResponseMessage(res.data.message);
            } catch (error) {
                console.log(error);
            }
        }
        editor();
    },[])

  const bg = useColorModeValue("gray.100", "gray.800");
  const boxShadow = useColorModeValue(
    "0 4px 6px rgba(0, 0, 0, 0.1)",
    "0 4px 6px rgba(255, 255, 255, 0.1)"
  );
  const titleColor = useColorModeValue("blue.600", "blue.500");
  const editorColor = useColorModeValue("gray.400", "gray.400");
  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Flex mt={"3%"} mb={"3%"}>
      <Box
        borderRadius="xl"
        p={"10"}
        bg={bg}
        boxShadow={boxShadow}
        maxW="700px"
        mx="auto"
      >
        <Text
          fontSize="4xl"
          fontWeight="bold"
          mb={2}
          color={titleColor}
          letterSpacing="wide"
          textAlign={"left"}
        >
          Message from The Head of Department
        </Text>
        <Text
          fontSize="2xl"
          fontWeight="semibold"
          mb={6}
          color={editorColor}
          textAlign={"left"}
          textShadow="1px 1px #1a202c"
        >
          {hodResponseName}
        </Text>
        <Text
          fontSize="lg"
          color={textColor}
          textAlign="justify"
          lineHeight="taller"
          letterSpacing="wide"
        >
          {hodResponseMessage}
        </Text>
      </Box>
      <Box
        borderRadius="xl"
        p={"10"}
        bg={bg}
        boxShadow={boxShadow}
        maxW="700px"
        mx="auto"
      >
        <Text
          fontSize="4xl"
          fontWeight="bold"
          mb={2}
          textAlign={"left"}
          color={titleColor}
          letterSpacing="wide"
        >
          Message from The Chief Editor
        </Text>
        <Text
          fontSize="2xl"
          fontWeight="semibold"
          mb={6}
          color={editorColor}
          textAlign={"left"}
          textShadow="1px 1px #1a202c"
        >
          {editorResponseName}
        </Text>
        <Text
          fontSize="lg"
          color={textColor}
          textAlign="justify"
          lineHeight="taller"
          letterSpacing="wide"
        >
          {editorResponseMessage}
        </Text>
      </Box>
    </Flex>
  );
};

export default Message;
