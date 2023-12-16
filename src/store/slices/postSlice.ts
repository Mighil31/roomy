import { createSlice } from "@reduxjs/toolkit";
import type { Post } from "../../types/Post";

interface PostState {
  posts: Post[] | null;
}

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
});
