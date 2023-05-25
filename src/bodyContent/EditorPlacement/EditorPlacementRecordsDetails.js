import { Button, Tr, Td, Link } from "@chakra-ui/react";
import { deletePlacement } from "../../api/api";

const EditorPlacementRecordsDetails = (props) => {
  const placementDeleteHandler = async () => {
    await deletePlacement(props.data._id);
    props.getPlacementsHandler();
  };
  return (
    <Tr>
      <Td>{props.data.year}</Td>
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
          <Button colorScheme="red" size="sm" onClick={placementDeleteHandler}>
            Delete
          </Button>
      </Td>
    </Tr>
  );
};

export default EditorPlacementRecordsDetails;
