import { useEffect, useState } from "react";
import { UserLogged } from "@/core/userLogged";
import { useRouter } from "next/router";
import { useSse } from "../core/useSse";
import { Button } from "../components/button";
import { Text } from "../components/text";

export default function Home() {
  const [user, setUser] = useState("");
  const router = useRouter();
  const { notify, status } = useSse(user);

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

        <div className="pt-6">
          <ul className="flex flex-col gap-2">
            {Object.keys(notify).map((key, index) => {
              const notifyItem = notify[key];

              if (notifyItem) {
                return (
                  <li
                    key={notifyItem.id}
                    className="border-l-2 border-gray-500 min-h-[2rem] block px-3"
                  >
                    <div></div>
                    <div>
                      <Text as="h3" className="font-bold">
                        {notifyItem.title}
                      </Text>
                      <Text as="p">{notifyItem.content}</Text>
                    </div>
                  </li>
                );
              }

              return <span key=""></span>;
            })}
          </ul>

          {status.hasError ? (
            <Text as="p" className="text-red-600 text-sm">
              An error occurred while connecting
            </Text>
          ) : undefined}

          {Object.keys(notify).length === 0 ? (
            <Text as="p" className="text-gray-600 text-sm">
              No notifications received
            </Text>
          ) : undefined}
        </div>
      </div>
    </main>
  );
}
