"use client";
import { useEffect, useState } from "react";
import { UserLogged } from "@/core/userLogged";
import { useRouter } from "next/router";
import { useGetNotify } from "@/core/hooks/useGetNotify";

export default function Home() {
  const [user, setUser] = useState<string>("");
  const router = useRouter();
  const { notify, notifyError, notifyIsLoading } = useGetNotify(user);

  useEffect(() => {
    const user = UserLogged.get();
    if (!user) {
      setUser("");
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
        {user ? "Usuário logado " + user : "Usuário admin"}
        <div>
          <button className="" onClick={() => handleLoggout()}>
            Loggout
          </button>
        </div>

        <ul>
          {notify?.map((notification) => (
            <li key={notification.title}>
              {notification.title} - {notification.content} -
              {JSON.stringify(notification.users)}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
