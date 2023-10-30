import { useGetUsers } from "../core/useGetUsers";
import { UserLogged } from "@/core/userLogged";
import { Link } from "../components/link";
import { useRouter } from "next/router";
import { Button } from "../components/button";
import { Text } from "../components/text";
import { ApiService } from "../core/apiService";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const { users, usersError, usersIsLoading } = useGetUsers();
  const [destroyDone, setDestroIsDone] = useState<boolean>(false);

  const makeLogin = (user: string) => {
    UserLogged.set(user);
    router.push("/home");
  };

  const destroyAllNotifications = () => {
    ApiService.get("/clearNotify");
    setDestroIsDone(true);

    setTimeout(() => {
      setDestroIsDone(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center pt-[5rem] pb-[5rem] min-h-screen">
      <Text as="h1" className="mt-2">
        Log in as a user to test notification collection
      </Text>

      <div className="mt-2">
        <div>
          {usersIsLoading ? (
            <div className="flex gap-4 justify-center">
              <p className="text-md text-md text-gray-400">
                Wait starting free api...
              </p>
              <div className="h-6 w-6 rounded-full border-2 border-t-black animate-spin border-gray-300"></div>
            </div>
          ) : undefined}
        </div>

        <div>
          {usersError ? (
            <p className="text-red-400">{usersError}</p>
          ) : undefined}
        </div>

        <div className="flex gap-4 mt-3">
          {users.map((user) => {
            return (
              <Button
                type="button"
                onClick={() => makeLogin(user.name)}
                key={user.name}
              >
                {user.name}
              </Button>
            );
          })}
        </div>
      </div>

      <Text as="p" className="mt-2">
        OR
      </Text>

      <Link href="/admin">Send notifications📨 </Link>

      <Button
        type="button"
        className="mt-2"
        onClick={() => destroyAllNotifications()}
      >
        {destroyDone ? "done" : "destroy all notifications 💥"}
      </Button>
    </div>
  );
}
