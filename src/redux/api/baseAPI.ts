import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logout, setUser } from "../features/auth/authSlice";
import { RootState } from "../store";

// base query
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers: Headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    // set the token if it exists
    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

// custom base query
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  try {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
      console.log("sending refresh token request");

      //  refresh token request is POST Method
      const refreshResult = await fetch(
        "http://localhost:5000/api/v1/auth/refresh-token",
        {
          method: "POST",
          credentials: "include",
        }
      ).then((res) => res.json());

      // if refresh token is invalid or expired then logout the user
      if (!refreshResult?.data?.accessToken) {
        api.dispatch(logout());
      }

      // get current user from store
      const user = (api.getState() as RootState).auth.user;

      // set new user and token in store
      api.dispatch(setUser({ user, token: refreshResult?.data?.accessToken }));

      result = await baseQuery(args, api, extraOptions);
    }

    return result;
  } catch (error) {
    return { error };
  }
};

// base api
export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
