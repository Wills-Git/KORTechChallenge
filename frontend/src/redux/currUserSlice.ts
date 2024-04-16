import { createSlice } from "@reduxjs/toolkit"
import type { UserInfoType } from "../types/types.ts"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { CurrUserState } from "../types/types.ts"
import { usersApiSlice } from "./usersApiSlice.ts"

const initialState: CurrUserState = {
  isLoggedIn: false,
  user: null, // This can include details like name, email, etc.
}

const currUserSlice = createSlice({
  name: "currUser",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ user: UserInfoType }>) {
      state.isLoggedIn = true
      state.user = action.payload.user
    },
    logout(state) {
      state.isLoggedIn = false
      state.user = null
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      usersApiSlice.endpoints.updateUserStatus.matchFulfilled,
      (state, { payload }) => {
        if (state.user && state.user.PK === payload.PK) {
          state.user.status = payload.status
        }
      },
    )
  },
})

export const { loginSuccess, logout } = currUserSlice.actions

export default currUserSlice
