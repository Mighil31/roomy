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
import FeedPosts from "./FeedPosts";
// import type { FeedItem, Post } from "../../types/Post";

export default function Feed() {
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
  } = useGetPostsQuery();

  useEffect(() => {
    refetchUserData();
    // refetchPosts();
  }, [userData, refetchUserData]);

  return <FeedPosts userData={userData} postData={data} />;
}
