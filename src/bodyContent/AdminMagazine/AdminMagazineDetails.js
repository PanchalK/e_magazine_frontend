import { Button, Tr, Td, Image, HStack, Link } from "@chakra-ui/react";
import { deleteMagazine, editMagazine } from "../../api/api";

const AdminMagazineDetails = (props) => {
  const magazineDeleteHandler = async () => {
    await deleteMagazine(props.data._id);
    props.getMagazinesHandler();
  };
  const magazineApproveHandler = async () => {
    await editMagazine(props.data._id);
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
      <Td>
        <HStack>
          <Button colorScheme="teal" size="sm" onClick={magazineApproveHandler}>
            Approve
          </Button>
          <Button colorScheme="red" size="sm" onClick={magazineDeleteHandler}>
            Reject
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
};

export default AdminMagazineDetails;