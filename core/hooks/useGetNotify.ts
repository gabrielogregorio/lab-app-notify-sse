import { ApiService } from "@/core/apiService";
import { IUser } from "@/core/hooks/useGetUsers";
import { useState, useEffect } from "react";

export interface INotify {
  title: string;
  content: string;
  users: IUser[];
}

export const useGetNotify = (user: string) => {
  const [notify, setNotify] = useState<INotify[]>([]);
  const [notifyError, setNotifyError] = useState<string>("");
  const [notifyIsLoading, setNotifyIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setNotifyIsLoading(true);
    setNotify([]);
    setNotifyError("");

    ApiService.get("/notify", { user: user || "" })
      .then(async (user) => {
        setNotify(await user.json());
      })
      .catch(() => {
        setNotifyError("Error on fetch notify");
      })
      .finally(() => {
        setNotifyIsLoading(false);
      });
  }, [user]);

  return {
    notify,
    notifyError,
    notifyIsLoading,
  };
};
