export type UserInfoType = {
  PK: string
  name: string
  content: string
  imageUrl: string
  status: string
}

export interface UserInfoProps {
  userInfo: UserInfoType
}
