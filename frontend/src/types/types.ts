import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"

export type UserInfoType = {
  PK: string
  name: string
  content: string
  imageUrl: string
  status: string
}

export type UserCreationType = {
  name: string
  username: string
}

export interface UserInfoProps {
  userInfo: UserInfoType
}
interface SerializedError {
  name?: string
  message?: string
  stack?: string
  code?: string
}

export type ReduxError = FetchBaseQueryError | SerializedError | undefined
