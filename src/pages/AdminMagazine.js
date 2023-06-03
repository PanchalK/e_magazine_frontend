import { Box, Heading, Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import { getMagazines } from "../api/api";
import { useState, useEffect } from "react";
import AdminMagazineDetails from "../bodyContent/AdminMagazine/AdminMagazineDetails";

const AdminMagazine = () => {

  const [magazineData, setMagazineData] = useState([]);
  useEffect(() => {
    const getMagazinedatas = async () => {
      const res = await getMagazines();
      const filtereddata = res.data.filter(magazine => magazine.approved === false);
      setMagazineData(filtereddata);
    };
    getMagazinedatas();
  }, []);

  const getMagazinesHandler = async () => {
     try {
      const res = await getMagazines();
      const filtereddata = res.data.filter(magazine => magazine.approved === false);
      setMagazineData(filtereddata);
     } catch (error) {
      console.log(error);
     }
  };

  return (
    <>
      <Box height="100vh" w="100%" overflowY="scroll">
        <Box mt="10rem">
        <Heading as="h2" mb={20} textAlign={"center"}>
            Approve Magazines
          </Heading>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Magazine Code</Th>
                <Th>Title</Th>
                <Th>Release Date</Th>
                <Th>Cover Image</Th>
                <Th>Magazine Link</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {magazineData.map((data, index) => (
                <AdminMagazineDetails
                  key={index}
                  data={data}
                  getMagazinesHandler={getMagazinesHandler}
                />
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </>
  );
};

export default AdminMagazine;