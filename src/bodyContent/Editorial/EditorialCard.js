import classes from "./EditorialCard.module.css";
import { Box, Center, HStack, Image, Text, VStack } from "@chakra-ui/react";
import {SiGmail} from "react-icons/si"

const EditorialCard = (props) => {
    return (
        <Box
        className={classes.card}
        ml={{ base: "0", sm: "1%", md: "2%", lg: "3%" }}
        mr={{ base: "0", sm: "1%", md: "2%", lg: "3%" }}
      >
        <Box
          className={`${classes.face} ${classes.face1}`}
          w={{ base: "28vw", sm: "26vw", md: "22vw", lg: "16vw" }}
          h={{ base: "21vh", sm: "23vh", md: "24vh", lg: "42vh" }}
        >
          <VStack
            className={classes.content}
          >
            <Image
              src={props.image}
              alt="blank"
              w={{ base: "18vw", sm: "15vw", md: "16vw", lg: "11vw" }}
            />
            <Text
              fontSize={{ base: "9px", sm: "10px", md: "13px", lg: "16px" }}
              fontFamily="'Josefin Sans', sans-serif"
            >
              {props.name}
            </Text>
            <Text
              fontSize={{ base: "10px", sm: "10px", md: "10px", lg: "14px" }}
              fontFamily="'Josefin Sans', sans-serif"
            >
              <strong>{props.post}</strong>
            </Text>
          </VStack>
        </Box>
        <Center
          className={`${classes.face} ${classes.face2}`}
          w={{ base: "28vw", sm: "26vw", md: "22vw", lg: "16vw" }}
          h={{ base: "4vh", sm: "6vh", md: "6vh", lg: "12vh" }}
        >
          <HStack
            w={{ base: "18vw", sm: "19vw", md: "18vw", lg: "12vw" }}
            justify="center"
          >
            <a href={`mailto:${props.email}`} target="_blank" rel="noreferrer">
              <SiGmail cursor="pointer" className={classes.icons} />
            </a>
          </HStack>
        </Center>
      </Box>
    );
  };
  
  export default EditorialCard;