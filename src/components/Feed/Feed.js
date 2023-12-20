import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { styleConstants } from "../../constants/styleConstants";
import PostItem from "./PostItem";
import Box from "@mui/material/Box";
import axiosConfig from "../Utils/axiosConfig";
import "../../css/feed.scss";
import { useGetPostsQuery, useLoadUserQuery } from "../../store/apis/apiSlice";
import { useDispatch } from "react-redux";
import { setPosts } from "../../store/slices/postSlice";
// import type { FeedItem, Post } from "../../types/Post";

export default function Feed() {
  let [feedData, setFeedData] = useState([]);
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: userDataError,
    refetch: refetchUserData,
  } = useLoadUserQuery();
  const {
    data,
    isLoading,
    isError,
    refetch: refetchPostsData,
  } = useGetPostsQuery(userData);

  const dispatch = useDispatch();
  // console.log(userData);
  // console.log(data);
  // if (data) {
  //   console.log("POST EXITST");
  //   dispatch(setPosts(data));
  // }
  useEffect(() => {
    refetchUserData();
    // refetchPosts();
  }, [userData, refetchUserData]);

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
            userData &&
            data.length >= 1 &&
            data.map((v) => (
              <PostItem key={v.postId} {...v} userData={userData} />
            ))}
        </Box>
        {/* </Container> */}
      </Container>
    </React.Fragment>
  );
}
