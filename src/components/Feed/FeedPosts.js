import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { constants } from "../../constants/constants";
import PostItem from "./PostItem";
import Box from "@mui/material/Box";
import axiosConfig from "../Utils/axiosConfig";
import "../../css/feed.scss";
import { useGetPostsQuery, useLoadUserQuery } from "../../store/apis/apiSlice";
import { useDispatch } from "react-redux";
import { setPosts } from "../../store/slices/postSlice";
// import type { FeedItem, Post } from "../../types/Post";

export default function FeedPosts({ postData, userData }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        sx={{
          bgcolor: constants.bg_color,
          pt: "2em",
          minHeight: "95vh",
        }}
        maxWidth={false}
        disableGutters
      >
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
              <PostItem key={v.postId} {...v} userData={userData} />
            ))}
        </Box>
        {/* </Container> */}
      </Container>
    </React.Fragment>
  );
}
