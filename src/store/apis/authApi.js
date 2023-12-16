import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log("base query with re auth");
  console.log(result);
  if (result?.error?.originalStatus === 403) {
    console.log("sending request token");
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      console.log(user);
      api.dispatch(setCredentials({ ...refreshResult.data, user }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const authApi = createApi({
  // reducerPath: "authApi",
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
      // loadUser: builder.query({
      //   query: () => ({
      //     url: "/auth",
      //     method: "GET",

      //   })
      // })
    };
  },
});

export const { useLoginMutation } = authApi;
