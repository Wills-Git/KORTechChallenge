import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { UserCreationType, UserInfoType } from "@/types/types.ts"

type UserTag = { type: "User"; id: string }
type AllUsersTag = { type: "AllUsers"; id: string }

export const usersApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/u/" }),
  reducerPath: "UsersApi",
  tagTypes: ["User", "AllUsers"],
  endpoints: build => ({
    getAllUsers: build.query<UserInfoType[], void>({
      query: () => `allusers`,
      transformResponse: (response: { users: UserInfoType[] }) =>
        response.users,
      // Function to provide tags for caching and invalidation purposes, providing granular updates in ui
      providesTags: (
        result: UserInfoType[] | undefined,
      ): (UserTag | AllUsersTag)[] => [
        { type: "AllUsers", id: "LIST" } as AllUsersTag,
        // Spread operator to conditionally include tags for each user if the result is not undefined.
        ...(result
          ? result.map(user => ({ type: "User", id: user.PK }) as UserTag)
          : []), // If result is undefined, spread an empty array (no user tags)
      ],
    }),
    getUserByPK: build.query<UserInfoType, string>({
      query: PK => `${PK}`,
      //if there is a user returned, they are assigned tags, otherwise no tags
      providesTags: (result, error, PK) =>
        result ? [{ type: "User", id: PK }] : [],
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
          console.error(error)
        }
      },
    }),
    updateUserStatus: build.mutation<
      UserInfoType,
      { PK: string; status: string }
    >({
      query: ({ PK, status }) => ({
        url: `update`,
        method: "PATCH",
        body: { PK, status },
      }),
      invalidatesTags: (result, error, { PK }) => [{ type: "User", id: PK }],
      async onQueryStarted({ PK, status }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApiSlice.util.updateQueryData("getUserByPK", PK, draftUser => {
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
  useUpdateUserStatusMutation,
} = usersApiSlice
