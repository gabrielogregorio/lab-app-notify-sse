import { useGetUsers } from "@/core/hooks/useGetUsers";
import { UserLogged } from "@/core/userLogged";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const { users, usersError, usersIsLoading } = useGetUsers();

  const makeLogin = (user: string) => {
    UserLogged.set(user);
    router.push("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center pt-[5rem] pb-[5rem] min-h-screen">
      <h2 className="mt-2">Choice a user to make login</h2>

      <div>{usersIsLoading ? "loading users available..." : ""}</div>
      <div>{usersError ? usersError : ""}</div>

      <div className="flex gap-4">
        {users.map((user) => {
          return (
            <button
              type="button"
              onClick={() => makeLogin(user.name)}
              className="bg-teal-500 text-white px-3 py-2 rounded-md"
              key={user.name}
            >
              {user.name}
            </button>
          );
        })}
      </div>

      <div>OR</div>

      <div>
        <Link
          href="/admin"
          className="px-3 py-2 bg-teal-500 text-white rounded-md hover:scale-105 transition-all duration-150 block"
        >
          Entrar no modo admin
        </Link>
      </div>

      <div>
        <Link
          href="/notify"
          className="px-3 py-2 bg-teal-500 text-white rounded-md hover:scale-105 transition-all duration-150 block"
        >
          Entrar no modo ver todas notificações
        </Link>
      </div>
    </div>
  );
}
