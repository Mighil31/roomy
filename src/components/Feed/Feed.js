import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { styleConstants } from "../../constants/styleConstants";
import PostItem from "./PostItem";
import Box from "@mui/material/Box";
import axiosConfig from "../Utils/axiosConfig";
import "../../css/feed.scss";
import { useGetPostsQuery } from "../../store/apis/apiSlice";
import { useDispatch } from "react-redux";
import { setPosts } from "../../store/slices/postSlice";
// import type { FeedItem, Post } from "../../types/Post";

export default function Feed() {
  let [feedData, setFeedData] = useState([]);
  const { data, isLoading, isError } = useGetPostsQuery();

  const dispatch = useDispatch();

  // if (data) {
  //   console.log("POST EXITST");
  //   dispatch(setPosts(data));
  // }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        sx={{
          bgcolor: styleConstants.bg_color,
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
          {data &&
            data.length >= 1 &&
            data.map((v) => <PostItem key={v.postId} {...v} />)}
        </Box>
        {/* </Container> */}
      </Container>
    </React.Fragment>
  );
}
