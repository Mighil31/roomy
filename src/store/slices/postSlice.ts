import { createSlice } from "@reduxjs/toolkit";
import type { FeedItem, Post } from "../../types/Post";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PostState {
  posts: FeedItem[];
}

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    setPosts(state, action: PayloadAction<FeedItem[]>) {
      // console.log("SET POSTS");
      // console.log(action.payload);
      state.posts = action.payload;
    },
  },
});

export const selectPosts = (state: RootState) => state.post.posts;

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;
