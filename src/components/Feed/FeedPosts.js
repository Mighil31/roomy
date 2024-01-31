import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { constants } from "../../constants/constants";
import PostItem from "./PostItem";
import Box from "@mui/material/Box";
import axiosConfig from "../Utils/axiosConfig";
import "../../css/feed.scss";
import CustomContainer from "../Utils/CustomContainer";
// import type { FeedItem, Post } from "../../types/Post";

export default function FeedPosts({ postData, userData, type }) {
  return (
    <CustomContainer>
      {/* <Container sx={{ bgcolor: "#FFFFFF", pt: "2em" }}> */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {postData &&
          postData.map((v) => (
            <PostItem key={v.postId} {...v} userData={userData} type={type} />
          ))}
      </Box>
      {/* </Container> */}
    </CustomContainer>
  );
}
