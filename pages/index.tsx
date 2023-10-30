import { useGetUsers } from "../core/useGetUsers";
import { UserLogged } from "@/core/userLogged";
import { Link } from "../components/link";
import { useRouter } from "next/router";
import { Button } from "../components/button";
import { Text } from "../components/text";
import { ApiService } from "../core/apiService";

export default function Login() {
  const router = useRouter();
  const { users, usersError, usersIsLoading } = useGetUsers();

  const makeLogin = (user: string) => {
    UserLogged.set(user);
    router.push("/home");
  };

  const destroyAllNotifications = () => {
    ApiService.get("/clearNotify");
  };

  return (
    <div className="flex flex-col items-center justify-center pt-[5rem] pb-[5rem] min-h-screen">
      <Text as="h1" className="mt-2">
        Log in as a user to test notification collection
      </Text>

      <div className="mt-2">
        <div>{usersIsLoading ? "loading users available..." : ""}</div>
        <div>{usersError ? usersError : ""}</div>

        <div className="flex gap-4">
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

      <Link href="/admin">Send notifications</Link>

      <Button
        type="button"
        className="mt-2"
        onClick={() => destroyAllNotifications()}
      >
        destroy all notifications
      </Button>
    </div>
  );
}
