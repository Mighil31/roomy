import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("x-auth-token", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // console.log(result);
  if (result?.error?.status === 401) {
    console.log("base query with re auth - refreshing token");
    // console.log("sending request token");
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    // console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // console.log(user);
      api.dispatch(setCredentials({ ...refreshResult.data, user }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Messages", "Conversation", "LastMessage", "Post"],
  endpoints: (builder) => {
    return {
      signup: builder.mutation({
        query: (body) => ({
          url: "/user",
          method: "POST",
          body: body,
        }),
      }),
      login: builder.mutation({
        query: (credentials) => ({
          url: "/auth",
          method: "POST",
          body: { ...credentials },
        }),
      }),
      getUser: builder.query({
        query: () => ({
          url: "/auth",
          method: "GET",
        }),
      }),
      getPosts: builder.query({
        providesTags: (result, error) => {
          return ["Posts"];
        },
        query: () => ({
          url: "/post",
          method: "GET",
        }),
      }),
      getUserPosts: builder.query({
        providesTags: (result, error) => {
          return ["Posts"];
        },
        query: (userId) => ({
          url: `/post?userId=${userId}`,
          method: "GET",
        }),
      }),
      getPostById: builder.query({
        providesTags: (result, error, conversationId) => {
          return ["Posts"];
        },
        query: (postId) => {
          const queryParams = postId
            ? `/post?postId=${postId}`
            : `/post?postId=${null}`;
          return {
            url: `/post?postId=${postId}`,
            method: "GET",
          };
        },
      }),
      updatePost: builder.mutation({
        query: ({ postId, postSubmitData: body }) => ({
          url: `/post/${postId}`,
          method: "PUT",
          body: body,
        }),
        invalidatesTags: (result, error, data) => {
          return ["Posts"];
        },
      }),
      deletePost: builder.mutation({
        query: (postId) => ({
          url: `/post/${postId}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, data) => {
          console.log("werwerw");
          return ["Posts"];
        },
      }),
      newPost: builder.mutation({
        query: (body) => ({
          url: "/post",
          method: "POST",
          body: body,
        }),
        invalidatesTags: (result, error, data) => {
          return ["Posts"];
        },
      }),
      loadUser: builder.query({
        query: () => ({
          url: "/auth",
          method: "GET",
        }),
      }),
      getConversationList: builder.query({
        providesTags: (result, error, conversationId) => {
          return ["Conversation"];
        },
        query: () => ({
          url: `/chat/list`,
          method: "GET",
        }),
      }),
      getMessages: builder.query({
        providesTags: (result, error, conversationId) => {
          // console.log("TAG PROVIDED");
          return ["Messages"];
        },
        query: (conversationId) => ({
          url: `/chat/message/${conversationId}`,
          method: "GET",
        }),
        invalidatesTags: (result, error, data) => {
          console.log("Invalidate LastMessage tag");
          return ["LastMessage"];
        },
      }),
      getLastMessage: builder.query({
        providesTags: ["Messages", "LastMessage"],
        query: (conversationId) => ({
          url: `/chat/message/${conversationId}?last=true`,
          method: "GET",
        }),
      }),
      createMessage: builder.mutation({
        invalidatesTags: (result, error, data) => {
          console.log("Invalidate Messages");
          return ["Messages"];
        },
        query: ({ conversationId, message }) => ({
          url: `/chat/message/${conversationId}`,
          method: "POST",
          body: { content: message },
        }),
      }),
      createConversation: builder.mutation({
        invalidatesTags: (result, error, data) => {
          console.log("Conversation TAG INVALIDATED");
          return error.data.errors ? [] : ["Conversation"];
        },
        query: (body) => ({
          url: `/chat`,
          method: "POST",
          body: body,
        }),
      }),
    };
  },
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetPostsQuery,
  useNewPostMutation,
  useLoadUserQuery,
  useGetConversationListQuery,
  useGetUserQuery,
  useGetMessagesQuery,
  useCreateMessageMutation,
  useCreateConversationMutation,
  useGetLastMessageQuery,
  useGetUserPostsQuery,
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = apiSlice;
