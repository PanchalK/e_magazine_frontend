import {
    Box,
    Button,
    Container,
    Text
} from '@chakra-ui/react';
import React from 'react';
import { useHistory } from "react-router-dom";


export default function Notfound() {
    const history = useHistory();
    return (
        <Box pt="6rem">
            <Container textAlign="center">
                <Text fontSize="3rem" fontWeight="bold">404</Text>
                <Text fontSize="1rem" fontWeight="bold">Page not found</Text>
                <Button colorScheme="red" onClick={history.goBack}>Go Back</Button>
            </Container>
        </Box>
    )
}
