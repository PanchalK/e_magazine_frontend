import {
    Button,
    Tr,
    Td,
    Image,
  } from "@chakra-ui/react";
import { deleteEditor } from "../../api/api";

const AdminEditorDetails = (props) => {
    const editorDeleteHandler = async ()=>{
        await deleteEditor(props.data._id);
        props.getEditorsHandler();
    }
  return (
    <Tr>
      <Td>{props.data.name}</Td>
      <Td>{props.data.email}</Td>
      <Td>{props.data.designation}</Td>
      <Td>{props.data.post}</Td>
      <Td>{props.data.program}</Td>
      <Td>
        <Image
          src={props.data.image}
          alt={props.data.name}
          boxSize="50px"
          borderRadius="full"
        />
      </Td>
      <Td>
        <Button colorScheme="red" size="sm" onClick={editorDeleteHandler}>
          Delete
        </Button>
      </Td>
    </Tr>
  );
};

export default AdminEditorDetails;
