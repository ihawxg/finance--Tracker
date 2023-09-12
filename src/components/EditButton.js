import Button from '@mui/material/Button';
import React from "react";

export default function EditButton(props){
    const [editable, setEditable] = React.useState(false);

    const toggle = (handleClick) => {
        setEditable(prev => !prev);
        handleClick();
    }

    return (
        <Button className="w-200" onClick={() => toggle(props.handleClick)} variant="contained" color={editable ? "success" : "primary"}>{editable ? "Save Info" : "Edit Info"}</Button>
    );
}