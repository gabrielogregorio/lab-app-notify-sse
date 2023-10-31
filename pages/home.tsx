import { useEffect, useState } from "react";
import { UserLogged } from "@/core/userLogged";
import { useRouter } from "next/router";
import { Button } from "../components/button";
import { Text } from "../components/text";

import dynamic from "next/dynamic";

const NotifySse = dynamic<{ user: string }>(
  () => import("notify/component/Notify").then((m) => m.Notify),
  {
    ssr: false,
  }
);

const NotifyWs = dynamic<{ user: string }>(
  () => import("notify/component/Notify").then((m) => m.NotifyWs),
  {
    ssr: false,
  }
);

export default function Home() {
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = UserLogged.get();
    if (user) {
      setUser(user);
    } else {
      router.push("/");
    }
  }, [router]);

  const handleLogout = () => {
    UserLogged.logout();
    router.push("/");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div>
        <Button type="button" onClick={() => handleLogout()}>
          Logout
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Text as="h1" className="text-xl">
              {`[SSE]: `} Testing receiving notifications as {`'${user}'`}
            </Text>

            <NotifySse user={user} />
          </div>

          <div>
            <Text as="h1" className="text-xl">
              {`[WEB SOCKETS]: `} Testing receiving notifications as{" "}
              {`'${user}'`}
            </Text>
            <NotifyWs user={user} />
          </div>
        </div>
      </div>
    </main>
  );
}
