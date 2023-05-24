import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="gray.200" py="4" px="6" mt="4">
      <Text fontSize="sm" color="gray.600" textAlign="center">
        &copy; {new Date().getFullYear()} Department of Computer Science and Engineering. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;