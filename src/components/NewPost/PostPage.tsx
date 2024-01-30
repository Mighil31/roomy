import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import NewPostForm from './NewPostForm';
import { useGetPostByIdQuery } from "../../store/apis/apiSlice";
import { CircularProgress } from '@mui/material';
import Loading from '../Utils/Loading';
import Error from '../Error/Error';

function PostPage() {
  const [error, setError] = useState(0);
  let { postId } = useParams();

  const {
    data: postData,
    isLoading: isPostDataLoading,
    isFetching: isPostDataFetching,
    isError,
  } = useGetPostByIdQuery(postId)

  let content;
  if (error)
    content = <Error status={error} />;
  else if (isPostDataLoading)
    content = <Loading />
  else
    content = <NewPostForm postId={postId} error={error} setError={setError} />

  return (
    <>
      {content}
    </>
  )
}

export default PostPage