
import Modal from "react-bootstrap/Modal"
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import styled from "styled-components";

export const Details = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [children, setChildren] = useState(props.children)
    const handleModal = () => {
        setChildren(null)
        setIsOpen(!isOpen)
    }
    return (
        <StyledModal show={props.isOpen} onHide={handleModal} centered>
            <Modal.Header><h3>Heroe details</h3></Modal.Header>
            <Modal.Body >
                {children}
            </Modal.Body>
        </StyledModal>
    );
};

const StyledModal = styled(Modal)`
    font-family: 'Bebas Neue', cursive;
`