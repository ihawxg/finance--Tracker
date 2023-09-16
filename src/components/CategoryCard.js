import styles from "./styles/categoryBox_module.css";
import styled from "styled-components";
import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { HexColorPicker } from "react-colorful";

export default function CategoryCard(props) {
    const [open, setOpen] = React.useState(false);
    const [color, setColor] = React.useState("#fff");

    const handleClose = () => {
        setOpen(false);
    }

    const handleClick = () => {
        setOpen(true);
    }

    return (
        <>
            <div className="boxContainer">
                <h3>{props.label}</h3>
                <div className="increaseBox">
                    <ColorCard onClick={handleClick} color={props.color}/>
                </div>
            </div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h5>Change Category Color</h5>
                    <HexColorPicker color={color} onChange={setColor}/>
                    <Button style={{width: "200px", marginTop: "20px"}} variant="contained" onClick={handleClick}>Edit Color</Button>
                </Box>
            </Modal>
        </>
    );
}

const ColorCard = styled.span`
    display: block;
    width: 150px;
    height: 150px;
    border-radius: 5px;
    background-color: ${props => props.color};
    transition: width 1s, height 1s;
    &:hover{
      width: 180px;
      height: 180px;
      cursor: pointer;
    }
`;

const style = {
    position: 'absolute',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "300px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };