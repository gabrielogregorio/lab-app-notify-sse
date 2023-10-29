import { useEffect, useState } from "react";
import { useGetNotify } from "./useGetNotify";
import { INotifyById } from "./types";

export const useSse = (user: string) => {
  const [notify, setNotify] = useState<INotifyById>({});
  const [status, setStatus] = useState({
    isOpen: false,
    hasError: false,
  });

  const notifyBase = useGetNotify(user);

  useEffect(() => {
    if (notifyBase.notify) {
      let allNotify: INotifyById = {};

      notifyBase.notify.forEach((items) => {
        allNotify[items.id] = items;
      });

      setNotify((prev) => {
        return {
          ...prev,
          ...allNotify,
        };
      });
    }
  }, [notifyBase.notify]);

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/listen?user=${user}`
    );
    eventSource.onopen = () => {
      setStatus(() => {
        return {
          hasError: false,
          isOpen: true,
        };
      });
    };

    eventSource.onerror = () => {
      setStatus(() => {
        return {
          isOpen: false,
          hasError: true,
        };
      });
    };

    eventSource.addEventListener("notify", (e) => {
      const newNotify = JSON.parse(e.data).message;

      setNotify((prev) => {
        return {
          ...prev,
          [newNotify.id.toString()]: newNotify,
        };
      });
    });

    return () => {
      eventSource.close();
    };
  }, [user]);

  return { notify, status };
};
