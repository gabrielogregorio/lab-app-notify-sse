"use client";
import { useEffect, useState } from "react";

export const useSse = (user: string) => {
  const [notify, setNotify] = useState<string[]>([]);
  const [status, setStatus] = useState({
    isOpen: false,
    hasError: false,
  });

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/listen?user=${user}`
    );
    eventSource.onopen = () => {
      setStatus((prev) => {
        return {
          ...prev,
          isOpen: true,
        };
      });
    };

    eventSource.onerror = () => {
      setStatus((prev) => {
        return {
          ...prev,
          hasError: true,
        };
      });
    };

    eventSource.addEventListener("notify", (e) => {
      setNotify((prev) => [...prev, JSON.parse(e.data).data]);
    });

    return () => {
      eventSource.close();
    };
  }, [user]);

  return { notify, status };
};
