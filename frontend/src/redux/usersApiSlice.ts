import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { UserCreationType, UserInfoType } from "@/types/types.ts"

export const usersApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/u/" }),
  reducerPath: "UsersApi",
  tagTypes: ["User", "allUsers"],
  endpoints: build => ({
    getAllUsers: build.query<UserInfoType[], void>({
      query: () => `allusers`,
      transformResponse: (response: { users: UserInfoType[] }) =>
        response.users,
      providesTags: [{ type: "allUsers", id: "general" }],
    }),
    getUserByPK: build.query<UserInfoType, string>({
      query: pk => `${pk}`,
      //if there is a user returned, they are assigned tags, otherwise no tags
      providesTags: (result, error, pk) =>
        result ? [{ type: "User", id: result.PK }] : [],
    }),
    createUser: build.mutation<UserInfoType, UserCreationType>({
      query: userDetails => ({
        url: "newuser",
        method: "POST",
        body: userDetails,
      }),
      //instead of invalidating allUsers, an expensive backend call, update its cache with new user
      onQueryStarted: async (newUserData, { dispatch, queryFulfilled }) => {
        try {
          const { data: newUser } = await queryFulfilled
          console.log(newUser)
          dispatch(
            usersApiSlice.util.updateQueryData(
              "getAllUsers",
              undefined,
              (draft: UserInfoType[]) => {
                draft.push(newUser)
              },
            ),
          )
        } catch (error) {
          console.log("error updating cache with new user", error, newUserData)
        }
      },
    }),
    updateUserStatus: build.mutation<
      UserInfoType,
      { pk: string; status: string }
    >({
      query: ({ pk, status }) => ({
        url: `update/${pk}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { pk }) => [{ type: "User", id: pk }],
      async onQueryStarted({ pk, status }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApiSlice.util.updateQueryData("getUserByPK", pk, draftUser => {
            if (draftUser) {
              draftUser.status = status
            }
          }),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
  }),
})

// Exporting hooks for queries and mutations
export const {
  useGetAllUsersQuery,
  useGetUserByPKQuery,
  useCreateUserMutation,
} = usersApiSlice
