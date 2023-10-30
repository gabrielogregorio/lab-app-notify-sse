import { useEffect, useState } from "react";
import { UserLogged } from "@/core/userLogged";
import { useRouter } from "next/router";
import { Button } from "../components/button";
import { Text } from "../components/text";

import dynamic from "next/dynamic";

const Notify = dynamic<{ user: string }>(
  () => import("notify/component/Notify").then((m) => m.Notify),
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

        <Text as="h1" className="text-xl">
          Testing receiving notifications as {`'${user}'`}
        </Text>

        <Notify user={user} />
      </div>
    </main>
  );
}
