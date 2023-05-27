import { Box, Flex, Text } from "@chakra-ui/react";
import classes from "./Magazines.module.css";
import MagazineCard from "./MagazineCard";
import { useState, useEffect } from "react";
import { getMagazines } from "../../api/api";

const Magazines = () => {
  const [magazineData, setMagazineData] = useState([]);
  useEffect(() => {
    const getmagazines = async () => {
      const res = await getMagazines();
      const filtereddata = res.data.filter(magazines => magazines.approved === true);
      setMagazineData(filtereddata);
    };
    getmagazines();
  }, []);
  return (
    <Box pb={{ base: "10%", sm: "9%", md: "8%", lg: "7%" }}>
      <Text
        className={classes.heading}
        pt={{ base: "20%", sm: "14%", md: "11%", lg: "7%" }}
        textAlign="center"
        fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
        mb={".2%"}
      >
        Annual Magazines
      </Text>
      <hr className={classes.styletwo} ></hr>
      <Flex
        gap = "9.7%"
        flexWrap="wrap"
        w={{ base: "90vw", sm: "90vw", md: "80vw", lg: "75vw" }}
        m="auto"
        mt={"6%"}
      >
        {magazineData.map((data, index) => {
          if (data.approved===true){ 
            return (
            <MagazineCard
            key={index}
            title={data.title}
            releasedate={data.releasedate}
            coverimg={data.coverimg}
            link={data.link}
            />);
          }
        })}
      </Flex>
    </Box>
  );
};
export default Magazines;
