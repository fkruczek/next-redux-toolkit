import { User, UserInput } from "@/schema/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: ["user"],
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    users: builder.query<User[], string>({
      query: (q) => `users?sortBy=${q}`,
      providesTags: (result, error, users) => [{ type: "user", users }],
    }),
    createOrUpdateUser: builder.mutation<User, UserInput>({
      query: (user) => ({
        url: user.id ? `users/${user.id}` : "users",
        method: user.id ? "PUT" : "POST",
        body: user,
      }),
      invalidatesTags: [{ type: "user" }],
    }),
    deleteUser: builder.mutation<User, number>({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "user" }],
    }),
  }),
});
