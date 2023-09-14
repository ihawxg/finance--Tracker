import React from 'react';
import styled from "styled-components";
import { StyledEngineProvider } from '@mui/material/styles';
import FormDialog from "./FormDialog";

export default function AddButtons() {
    return (
        <ButtonsWrapper>
            <StyledEngineProvider injectFirst>
                <FormDialog value="Expense" title="Add an expense"/>
                <FormDialog value="Income" title="Add an income" />
                
            </StyledEngineProvider>
        </ButtonsWrapper>

    )
}

const ButtonsWrapper = styled.div`
    width: 200px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;
