import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { FriendStatusType } from "@/types/types.ts"

export const friendsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/f/" }),
  reducerPath: "FriendsApi",
  tagTypes: ["FriendStatus"],
  endpoints: build => ({
    updateFriendStatus: build.mutation<
      void,
      { userPK: string; requestedUserPK: string; status: string }>({
      query: ({ userPK, requestedUserPK, status }) => ({
        url: "updatefriend",
        method: "POST",
        body: { userPK, requestedUserPK, status },
      }),
      invalidatesTags: [{ type: "FriendStatus", id: "LIST" }],
    }),
    getAllFriendStatuses: build.query<FriendStatusType[], string>({
      query: userPK => `getallfriendstatuses/${userPK}`,
      providesTags: (result, error, userPK) =>
        result
          ? [{ type: "FriendStatus", id: userPK }]
          : [{ type: "FriendStatus", id: "LIST" }],
      transformResponse: (response: FriendStatusType[]) => response,
    }),
  }),
})

// Exporting hooks for queries and mutations
export const { useUpdateFriendStatusMutation, useGetAllFriendStatusesQuery } =
  friendsApiSlice
