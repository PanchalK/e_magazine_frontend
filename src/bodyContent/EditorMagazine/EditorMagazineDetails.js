import { Button, Tr, Td, Image, Link } from "@chakra-ui/react";
import { deleteMagazine } from "../../api/api";

const EditorMagazineDetails = (props) => {
  const magazineDeleteHandler = async () => {
    await deleteMagazine(props.data._id);
    props.getMagazinesHandler();
  };
  return (
    <Tr>
      <Td>{props.data.magazinecode}</Td>
      <Td>{props.data.title}</Td>
      <Td>
        {props.data.releasedate.month} {props.data.releasedate.day},{" "}
        {props.data.releasedate.year}
      </Td>
      <Td>
        <Link href={props.data.coverimg} target="_blank" rel="noreferrer">
          <Image
            src={props.data.coverimg}
            alt={props.data.magazinecode}
            boxSize="50px"
          />
        </Link>
      </Td>
      <Td>
        <Link
          href={props.data.link}
          target="_blank"
          rel="noreferrer"
          color={"blue"}
        >
          Click Here
        </Link>
      </Td>
      <Td>{props.data.approved? "Yes":"No"}</Td>
      <Td>
          <Button colorScheme="red" size="sm" onClick={magazineDeleteHandler}>
            Delete
          </Button>
      </Td>
    </Tr>
  );
};

export default EditorMagazineDetails;
