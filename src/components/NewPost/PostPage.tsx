import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import NewPostForm from './NewPostForm';
import { useGetPostByIdQuery } from "../../store/apis/apiSlice";
import { CircularProgress } from '@mui/material';
import Error from '../Error/Error';

function PostPage() {
  const [error, setError] = useState(0);
  const { postId } = useParams();
  const {
    data: postData,
    isLoading: isPostDataLoading,
    isError,
  } = useGetPostByIdQuery(postId)

  let content;
  if (error)
    content = <Error status={error} />;
  else if (isPostDataLoading)
    content = <CircularProgress />
  else
    content = <NewPostForm postId={postId} error={error} setError={setError} />

  return (
    <>
      {content}
    </>
  )
}

export default PostPage