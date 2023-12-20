import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
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
  console.log("base query with re auth - refreshing token");
  // console.log(result);
  if (result?.error?.status === 401) {
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
  endpoints: (builder) => {
    return {
      login: builder.mutation({
        query: (credentials) => ({
          url: "/auth",
          method: "POST",
          body: { ...credentials },
        }),
      }),
      getPosts: builder.query({
        query: () => ({
          url: "/post",
          method: "GET",
        }),
      }),
      newPost: builder.mutation({
        query: (body) => ({
          url: "/post",
          method: "POST",
          body: body,
        }),
      }),
      loadUser: builder.query({
        query: () => ({
          url: "/auth",
          method: "GET",
        }),
      }),
    };
  },
});

export const {
  useLoginMutation,
  useGetPostsQuery,
  useNewPostMutation,
  useLoadUserQuery,
} = apiSlice;
