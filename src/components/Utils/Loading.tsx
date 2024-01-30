import CssBaseline from "@mui/material/CssBaseline";
import React from 'react'
import Container from "@mui/material/Container";
import { constants } from "../../constants/constants";
import { CircularProgress } from '@mui/material';
import CustomContainer from "./CustomContainer";

function Loading() {
  return (
    <CustomContainer>
      <div className="loader">
        <CircularProgress />
      </div>
    </CustomContainer>
  )
}

export default Loading