import { Box, Button, HStack, Text, Image, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { adminAuthActions } from "../../store/adminauth";
import { editorAuthActions } from "../../store/editorauth";
import tuLogo from '../img/tu_logo.png';
import classes from "./Header.module.css";
import {useHistory} from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isAdminAuth = useSelector((state) => state.adminauth.isAdminAuthenticated);
  const isEditorAuth = useSelector((state) => state.editorauth.isEditorAuthenticated);

  const loginRedirectHandler = () => {
    history.push("/login");
  };
  const adminConsoleHandler = () => {
    history.push("/admin/editors");
  };
  const editorConsoleHandler = () => {
    history.push("/editor/dashboard");
  };

  const adminLogoutRedirectHandler = () => {
    dispatch(adminAuthActions.logout());
    history.push("/");
  };
  const editorLogoutRedirectHandler = () => {
    dispatch(editorAuthActions.logout());
    history.push("/");
  };

  const postRedirectHandler = () => {
    history.push("/post");
  };
    return (
      <Box p="14px" position="fixed" boxShadow="xl" bg='white' w={"100%"} zIndex={"5"}>
        <Flex justify={"space-between"} position={"relative"}>
            <Image src={tuLogo} w="55px" h="55px" alt="TU Logo" ml="1.5%"/>
            <a href="/" className={classes.linkHeading}>
              <Text className={classes.heading} fontSize="2.2rem" textAlign={"center"}>E-Magazine</Text>
            </a>
            <HStack gap="2" >
              {isAdminAuth && <Button colorScheme='blue' variant='solid' onClick={adminConsoleHandler}>Dashboard</Button>}
              {isEditorAuth && <Button colorScheme='blue' variant='solid' onClick={editorConsoleHandler}>Dashboard</Button>}
              {!isAdminAuth && !isEditorAuth &&<Button colorScheme='blue' variant='solid'  onClick={postRedirectHandler}>Post Article</Button>}
              {isAdminAuth && <Button leftIcon={<BiLogOut />} colorScheme='blue' variant='outline' onClick={adminLogoutRedirectHandler}>Logout</Button>}
              {isEditorAuth && <Button leftIcon={<BiLogOut />} colorScheme='blue' variant='outline' onClick={editorLogoutRedirectHandler}>Logout</Button>}
              {!isAdminAuth && !isEditorAuth && <Button leftIcon={<BiLogIn />} colorScheme='blue' variant='outline' onClick={loginRedirectHandler}>Login</Button>}
            </HStack>
        </Flex>
      </Box>
    );
  };
  
  export default Header;