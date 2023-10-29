import { useState, FormEvent } from "react";
import { ApiService } from "@/core/apiService";
import { UsersAvailables } from "@/core/usersAvailable";

export default function AddNotify() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [usersTo, setUsersTo] = useState<string[]>([]);

  const submitAddUser = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    ApiService.post(
      "/notify",
      JSON.stringify({
        title,
        content,
        users: usersTo.map((item) => {
          return { name: item };
        }),
      })
    );

    console.log({
      title,
      content,
      usersTo,
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center pt-[5rem] pb-[5rem]">
      <h1 className="text-gray-400 font-medium text-4xl uppercase">
        Send Notify to
      </h1>

      <form
        onSubmit={(event) => submitAddUser(event)}
        className="flex flex-col gap-4 mt-[3rem]"
      >
        <label className="flex flex-col" htmlFor="title">
          Titulo
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            className="border border-gray-400 focus:outline-blue-400 px-2 py-2 rounded-md"
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

        <label className="flex flex-col" htmlFor="content">
          Conteudo
          <textarea
            rows={10}
            cols={40}
            name="content"
            id="content"
            value={content}
            className="border border-gray-400 focus:outline-blue-400 px-2 py-2 rounded-md"
            onChange={(event) => setContent(event.target.value)}
          />
        </label>

        <hr />
        <UsersAvailables />

        <label className="flex flex-col" htmlFor="usersTo">
          Usuários separado por virgula (ana,lucia)
          <input
            type="text"
            name="usersTo"
            id="usersTo"
            value={usersTo}
            className="border border-gray-400 focus:outline-blue-400 px-2 py-2 rounded-md"
            onChange={(event) =>
              setUsersTo(
                event.target.value.split(",").map((user) => user.trim())
              )
            }
          />
        </label>

        <button
          type="submit"
          className="px-3 py-2 bg-teal-500 text-white rounded-md hover:scale-105 transition-all duration-150"
        >
          send notify
        </button>
      </form>
    </div>
  );
}
