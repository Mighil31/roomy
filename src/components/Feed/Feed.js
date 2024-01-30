import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { constants } from "../../constants/constants";
import PostItem from "./PostItem";
import Box from "@mui/material/Box";
import axiosConfig from "../Utils/axiosConfig";
import "../../css/feed.scss";
import { useGetPostsQuery, useLoadUserQuery } from "../../store/apis/apiSlice";
import FeedPosts from "./FeedPosts";
import Error from "../Error/Error";
import Loading from "../Utils/Loading";
// import type { FeedItem, Post } from "../../types/Post";

export default function Feed() {
  const [error, setError] = useState(0);

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

  let content;
  if (error) content = <Error status={error} />;
  else if (isLoading) content = <Loading />;
  else content = <FeedPosts userData={userData} postData={data} />;

  return <>{content}</>;
}
