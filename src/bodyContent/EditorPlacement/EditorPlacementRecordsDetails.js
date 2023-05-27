import { Button, Tr, Td, Link, useToast } from "@chakra-ui/react";
import { deletePlacement } from "../../api/api";

const EditorPlacementRecordsDetails = (props) => {
  const toast = useToast()
  const placementDeleteHandler = async () => {
    await deletePlacement(props.data._id);
    toast({
      title: 'Placement record Deleted',
      description: "Successfully deleted placement record.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
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
