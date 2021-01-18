export interface IUser<T = string> {
  _id: string;
  username: string;
  email: string;
  password: string;
  images: T[];
  created_at: string;
  updatedAt: string;
  __v: number;
}