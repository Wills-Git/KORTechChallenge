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
export type FriendStatusType = {
  PK: string
  SK: string
  Status: string
}

export interface DynamoDBItem {
  PK: { S: string } 
  SK: { S: string } 
  Status: { S: string } 
}
export interface UserInfoProps {
  userInfo: UserInfoType
}

export interface Post {
  id: number
  title: string
  content: string
}
interface SerializedError {
  name?: string
  message?: string
  stack?: string
  code?: string
}

export interface CurrUserState {
  isLoggedIn: boolean
  user: UserInfoType | null
}

export type ReduxError = FetchBaseQueryError | SerializedError | undefined
