import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("x-auth-token", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithMiddleware = async (args, api, extraOptions) => {
  try {
    return await baseQuery(args, api, extraOptions);
  } catch (error) {
    const fetchBaseQueryError = error;

    if (fetchBaseQueryError.status === 401) {
      // Dispatch the logout action
      api.dispatch(logOut());
    }

    throw error;
  }
};

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQueryWithMiddleware,
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: "/post",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPostsQuery } = postApi;
