
interface UserCountAttributes {
  PK: string; // Partition Key
  SK: string; // Sort Key
  friendAmount: number;
  postAmount: number;
}

interface UserInfoAttributes {
  PK: string; // Partition Key
  SK: string; // Sort Key
  name: string;
  content: string;
  imageUrl: string;
  status: string;
}

export interface AWSError {
  code?: string;
  message?: string;
}
export interface UserAttributes {
  count: UserCountAttributes;
  info: UserInfoAttributes;
}
