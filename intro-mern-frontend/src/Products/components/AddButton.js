import React from "react";
import { Button, Container, Section } from "react-bulma-components";

const addButton = ({ onClick })=> {
    return(
        <Section>
            <Container>
                <Button onClick={onClick} color="primary">Add Product</Button>
            </Container>
        </Section>
    )
}

export default addButton;