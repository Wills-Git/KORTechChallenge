import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { UserInfoType } from "@/types/types.ts"

export const usersApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/u/" }),
  reducerPath: "UsersApi",
  tagTypes: ["allUsers", "User"], // Added a tag type for individual user operations
  endpoints: build => ({
    getAllUsers: build.query<UserInfoType[], void>({
      query: () => `allusers`,
      transformResponse: (response: { users: UserInfoType[] }) =>
        response.users,
      providesTags: [{ type: "allUsers", id: "general" }],
    }),
    getUserByPK: build.query<UserInfoType, string>({
      query: pk => `${pk}`,
      providesTags: (result, error, pk) => [{ type: "User", pk }],
    }),
  }),
})

// Exporting hooks for both queries
export const { useGetAllUsersQuery, useGetUserByPKQuery } = usersApiSlice
