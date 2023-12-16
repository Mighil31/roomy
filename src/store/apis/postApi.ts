import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../slices/authSlice";
import type { RootState } from "../store";
import type { FeedItem, Post } from "../../types/Post";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;
      console.log("POST API");
      console.log(token);
      if (token) {
        headers.set("x-auth-token", `${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      getPosts: builder.query<FeedItem[], void>({
        query: () => ({
          url: "/post",
          method: "GET",
        }),
      }),
      // loadUser: builder.query({
      //   query: () => ({
      //     url: "/auth",
      //     method: "GET",

      //   })
      // })
    };
  },
});

export const { useGetPostsQuery } = postApi;
