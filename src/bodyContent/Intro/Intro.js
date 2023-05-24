import { Box, Heading } from "@chakra-ui/react";
import imgurl from "../img/introbackground.jpg";

const Intro = () => {
    const basicBoxStyles = {
        background:
          `url(${imgurl}) center/cover no-repeat `,
      }
    return (
      <Box p={"10%"} h={"100vh"} sx={basicBoxStyles}>
          <Heading fontSize={"100px"} color={"white"} textAlign={"left"} w="100vh" marginLeft={"-5vh"} marginTop={"6vh"} textShadow={"0 0 20px black"}>
            Computer Science & Engineering
          </Heading>
      </Box>
    );
  };
  
  export default Intro;