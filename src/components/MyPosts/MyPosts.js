import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { constants } from "../../constants/constants";
import Box from "@mui/material/Box";
import axiosConfig from "../Utils/axiosConfig";
import "../../css/feed.scss";
import {
  useGetUserPostsQuery,
  useLoadUserQuery,
} from "../../store/apis/apiSlice";
import { useDispatch } from "react-redux";
import { setPosts } from "../../store/slices/postSlice";
import FeedPosts from "../Feed/FeedPosts";
// import type { FeedItem, Post } from "../../types/Post";

export default function MyPosts() {
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
  } = useGetUserPostsQuery(userData?.userId);

  useEffect(() => {
    refetchUserData();
    // refetchPosts();
  }, [userData, refetchUserData]);

  return <FeedPosts userData={userData} postData={data} />;
}
