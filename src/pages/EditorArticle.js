import { useState, useEffect, React } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
import { getArticles } from "../api/api";
import EditorArticleDetails from "../bodyContent/EditorArticle/EditorArticleDetails";
import EditorNotApprArticleDetails from "../bodyContent/EditorArticle/EditorNotApprArticleDetails";
import AddArticles from "../bodyContent/EditorArticle/AddArticles";

function EditorArticle() {
  const [approvedArticleData, setApprovedArticleData] = useState([]);
  const [notApprovedArticleData, setNotApprovedArticleData] = useState([]);

  useEffect(() => {
    const getArticlesdatas = async () => {
      const res = await getArticles();
      const approvedArticlesdata = res.data.filter(article => article.approved === true);
      setApprovedArticleData(approvedArticlesdata);
      const notApprovedArticlesdata = res.data.filter(article => article.approved === false);
      setNotApprovedArticleData(notApprovedArticlesdata);
    };
    getArticlesdatas();
  }, []);

  const getArticlesHandler = async () => {
    try {
      const res = await getArticles();
      const approvedArticlesdata = res.data.filter(article => article.approved === true);
      setApprovedArticleData(approvedArticlesdata);
      const notApprovedArticlesdata = res.data.filter(article => article.approved === false);
      setNotApprovedArticleData(notApprovedArticlesdata);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box minH="100vh" w="100%">
      <Box mt="10rem">
        <Heading as="h2" mb={20} textAlign={"center"}>
          Approved Articles
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Author Name</Th>
              <Th>Author Email</Th>
              <Th>Program</Th>
              <Th>Semester</Th>
              <Th>Title</Th>
              <Th>Summary</Th>
              <Th>Article</Th>
              <Th>Image</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {approvedArticleData.map((data, index) => (
              <EditorArticleDetails
                key={index}
                data={data}
                getArticlesHandler={getArticlesHandler}
              />
            ))}
          </Tbody>
        </Table>
        <AddArticles getArticlesHandler={getArticlesHandler}/>
        <Heading as="h2" mb={20} textAlign={"center"}>
          Not Approved Articles
        </Heading>
        <Table variant="simple" mb="8%">
          <Thead>
            <Tr>
              <Th>Author Name</Th>
              <Th>Author Email</Th>
              <Th>Program</Th>
              <Th>Semester</Th>
              <Th>Title</Th>
              <Th>Summary</Th>
              <Th>Article</Th>
              <Th>Image</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {notApprovedArticleData.map((data, index) => (
              <EditorNotApprArticleDetails
                key={index}
                data={data}
                getArticlesHandler={getArticlesHandler}
              />
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default EditorArticle;
