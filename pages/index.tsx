"use client";
import { useSse } from "../core/hooks/useSse";

const user = "TEST";

export default function Home() {
  const { notify } = useSse(user);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div>
        <h1>Notifications {user}</h1>
        <ul>
          {notify?.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
