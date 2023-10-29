import { IUser } from "./useGetUsers";

export interface INotifyById {
  [key: string]: {
    id: string;
    title: string;
    content: string;
    users: IUser[];
  };
}
