import { ApiService } from "@/core/apiService";
import { useState, useEffect } from "react";

export interface IUser {
  name: string;
}

export const useGetUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [usersError, setUsersError] = useState<string>("");
  const [usersIsLoading, setUsersIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setUsersIsLoading(true);
    setUsers([]);
    setUsersError("");

    ApiService.get("/users")
      .then(async (user) => {
        setUsers(await user.json());
      })
      .catch(() => {
        setUsersError("Error on fetch users");
      })
      .finally(() => {
        setUsersIsLoading(false);
      });
  }, []);

  return {
    users,
    usersError,
    usersIsLoading,
  };
};
