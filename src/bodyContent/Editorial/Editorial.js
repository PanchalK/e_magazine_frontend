import { Box, Flex, Text } from "@chakra-ui/react";
import classes from "./Editorial.module.css";
import EditorialCard from "./EditorialCard";
import { getEditors } from "../../api/api";
import { useEffect, useState } from "react";

const Editorial = () => {
  const [editorData, setEditorData] = useState([]);
  useEffect(() => {
    const geteditors = async () => {
      const res = await getEditors();
      setEditorData(res.data);
    };
    geteditors();
  }, []);
  return (
    <>
      {editorData.length !== 0 && (
        <Box
          pb={{ base: "10%", sm: "9%", md: "8%", lg: "7%" }}
          backgroundColor="gray.100"
        >
          <Text
            className={classes.heading}
            pt={{ base: "20%", sm: "16%", md: "11%", lg: "7%" }}
            textAlign="center"
            fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
          >
            Editorial Board
          </Text>
          <hr className={classes.styletwo}></hr>

          <Flex
            justify="space-evenly"
            flexWrap="wrap"
            w={{ base: "90vw", sm: "90vw", md: "80vw", lg: "75vw" }}
            m="auto"
          >
            {editorData.map((data, index) => {
              return (
                <EditorialCard
                  key={index}
                  name={data.name}
                  post={data.post}
                  email={data.email}
                  image={data.image}
                />
              );
            })}
          </Flex>
        </Box>
      )}
    </>
  );
};

export default Editorial;
