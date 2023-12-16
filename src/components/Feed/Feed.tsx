import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { styleConstants } from "../../constants/styleConstants";
import Post, { POST } from "./Post";
import Box from "@mui/material/Box";
import axiosConfig from "../Utils/axiosConfig";
import "../../css/feed.scss";
import { useGetPostsQuery } from "../../store/apis/postApi";
import { useDispatch } from "react-redux";

export default function Feed() {
  let [feedData, setFeedData] = useState<POST[]>([]);
  const [getPosts, { isLoading }] = useGetPostsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts())
  }, []);

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
          {feedData.length >= 1 &&
            feedData.map((v) => <Post key={v.postId} {...v} />)}
        </Box>
        {/* </Container> */}
      </Container>
    </React.Fragment>
  );
}
