import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { DynamoDBItem, FriendStatusType } from "@/types/types.ts"



export const friendsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/f/" }),
  reducerPath: "FriendsApi",
  tagTypes: ["FriendStatus"],
  endpoints: build => ({
    updateFriendStatus: build.mutation<
      void,
      { userPK: string; requestedUserPK: string; status: string }
    >({
      query: ({ userPK, requestedUserPK, status }) => ({
        url: "updatefriend",
        method: "POST",
        body: { userPK, requestedUserPK, status },
      }),
      invalidatesTags: (result, error, { userPK }) => [
        { type: "FriendStatus", id: userPK },
      ],
    }),
    getAllFriendStatuses: build.query<DynamoDBItem, string>({
      query: userPK => `getallfriendstatuses/${encodeURIComponent(userPK)}`,
      providesTags: (result, error, userPK) =>
        result
          ? [{ type: "FriendStatus", id: userPK }]
          : [{ type: "FriendStatus", id: "LIST" }],
      transformResponse: (response: DynamoDBItem) => response,
    }),
  }),
})

// Exporting hooks for queries and mutations
export const { useUpdateFriendStatusMutation, useGetAllFriendStatusesQuery } =
  friendsApiSlice
