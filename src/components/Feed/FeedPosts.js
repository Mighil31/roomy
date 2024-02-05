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
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";

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
        <Card
          sx={{
            width: "90%", // Default width for mobile view
            mb: "20px",
            pb: "15px",
            "@media (min-width: 900px)": {
              // Media query for screens wider than 600px (adjust the value as needed)
              width: "55%", // Width for screens wider than 600px
            },
          }}
        >
          <CardContent
            sx={{
              // margin: "0 30px 0px 0px",
              // border: "1px solid black",
              padding: 0,
              padding: " 30px 30px 0 30px",
            }}
          >
            <div className="newPost__header">Have room to spare?</div>
            <Link to="/post">
              <div className="newPost__link">Make your own post now</div>
            </Link>
          </CardContent>
        </Card>
        {postData &&
          postData.map((v) => (
            <PostItem key={v.postId} {...v} userData={userData} type={type} />
          ))}
      </Box>
      {/* </Container> */}
    </CustomContainer>
  );
}
