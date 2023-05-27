import { Box, Image, Heading, Text } from "@chakra-ui/react";

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

const MagazineCard = (props) => {
  const date = new Date(props.releasedate);
  let monthValue = date.getMonth();
  let yearValue = date.getFullYear();
  return (
    <a href={props.link} target="_blank" rel="noreferrer">
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.05)" }}
      boxShadow={"1px 1px 5px 2px lightgray"}
      mb={"25%"}
    >
      <Image src={props.coverimg} alt="Magazine Cover" w={"20vw"} h={"26vw"}/>

      <Box p="4">
        <Heading fontSize="lg" fontWeight="semibold" mb="2" textAlign="center">
          {props.title}
        </Heading>
        <Text fontSize="sm" color="gray.500">
          Published on {monthNames[monthValue]}, {yearValue}
        </Text>
      </Box>
    </Box>
    </a>
  );
};

export default MagazineCard;
