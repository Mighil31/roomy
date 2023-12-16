import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../slices/authSlice";
import type { RootState } from "../store";
import type { Post } from "../../types/Post";

export const postApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (token) {
        headers.set("x-auth-token", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      getPosts: builder.query<Post[], void>({
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
