import { useState, FormEvent } from "react";
import { ApiService } from "@/core/apiService";
import { Button } from "../components/button";
import { UserLogged } from "../core/userLogged";
import { useRouter } from "next/router";
import { Text } from "../components/text";
import { UsersAvailable } from "../components/UsersAvailable";

export default function AddNotify() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [usersTo, setUsersTo] = useState<string[]>([]);
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const submitAddUser = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setError("");
    setIsSending(true);
    setIsSuccess(false);

    ApiService.post(
      "/notify",
      JSON.stringify({
        title,
        content,
        users: usersTo.map((item) => {
          return { name: item };
        }),
      })
    )
      .then(() => {
        setIsSuccess(true);
      })
      .catch((error) => {
        console.error(error);
        setError("Some error on send notify");
        setIsSuccess(false);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const handleLogout = () => {
    UserLogged.logout();
    router.push("/");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Button type="button" onClick={() => handleLogout()}>
        Logout
      </Button>

      <Text as="h1" className="text-xl mt-6">
        Send Notify to
      </Text>

      <form
        onSubmit={(event) => submitAddUser(event)}
        className="flex flex-col gap-4 mt-6"
      >
        <label className="flex flex-col" htmlFor="title">
          <Text as="p" className="text-sm">
            Title
          </Text>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            className="border border-black bg-transparent focus:outline-blue-400 px-2 py-2 rounded-md"
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

        <label className="flex flex-col" htmlFor="content">
          <Text as="p" className="text-sm">
            Body
          </Text>

          <textarea
            rows={5}
            cols={40}
            name="content"
            id="content"
            value={content}
            className="border border-black bg-transparent focus:outline-blue-400 px-2 py-2 rounded-md"
            onChange={(event) => setContent(event.target.value)}
          />
        </label>

        <hr />
        <UsersAvailable />

        <label className="flex flex-col" htmlFor="usersTo">
          <Text as="p" className="text-sm">
            users split by ,. Example, (ana,lisa,v)
          </Text>

          <input
            type="text"
            name="usersTo"
            id="usersTo"
            value={usersTo}
            className="border border-black bg-transparent focus:outline-blue-400 px-2 py-2 rounded-md"
            onChange={(event) =>
              setUsersTo(
                event.target.value.split(",").map((user) => user.trim())
              )
            }
          />
        </label>

        <Button type="submit">send notify</Button>

        {isSending ? <Text as="p">Sending notify</Text> : undefined}
        {error ? (
          <Text as="p" className="text-red-400">
            {error}
          </Text>
        ) : undefined}

        {isSuccess ? <Text as="p">Sucess send notify</Text> : undefined}
      </form>
    </main>
  );
}
