import Button from '@mui/material/Button';
import React from "react";

export default function EditButton(props){
    const [editable, setEditable] = React.useState(false);

    const toggle = (handleClick) => {
        setEditable(prev => !prev);
        handleClick();
    }

    return (
        <Button  disabled={props.disabled} className="w-300" sx={{ padding : '15px 0px' }} onClick={() => toggle(props.handleClick)} variant="contained" color={editable ? "success" : "secondary"}>{editable ? "Save Info" : "Edit Info"}</Button>
    );
}