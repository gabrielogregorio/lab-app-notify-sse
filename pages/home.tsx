"use client";
import { useEffect, useState } from "react";
import { useSse } from "../core/hooks/useSse";
import { UserLogged } from "@/core/userLogged";
import { useRouter } from "next/router";

export default function Home() {
  const [user, setUser] = useState<string>("");
  const router = useRouter();
  const { notify, status } = useSse(user);

  useEffect(() => {
    const user = UserLogged.get();
    if (!user) {
      router.push("/");
    } else {
      setUser(user);
    }
  }, [router]);

  const handleLoggout = () => {
    UserLogged.loggout();
    router.push("/");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div>
        <div>
          <button className="" onClick={() => handleLoggout()}>
            Loggout
          </button>
        </div>
        <h1>User {user}</h1>
        <div>
          <div>isOpen: {status.isOpen ? "🔗" : "⏳"}</div>

          <div>hasError: {status.hasError ? "❌" : "✅"}</div>
        </div>
        <ul>
          {notify?.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
