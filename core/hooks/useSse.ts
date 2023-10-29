"use client";
import { useEffect, useState } from "react";

export const useSse = (user: string) => {
  const [notify, setNotify] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:3333/listen`);

    eventSource.addEventListener("notify", (e) => {
      setNotify((prev) => [...prev, JSON.parse(e.data).data]);
    });

    return () => {
      eventSource.close();
    };
  }, [user]);

  return { notify };
};
