import { useGetUsers } from "@/core/hooks/useGetUsers";

export const UsersAvailables = () => {
  const { users, usersError, usersIsLoading } = useGetUsers();

  return (
    <div>
      <h2>Usuários diponíveis:</h2>
      <div>{usersIsLoading ? "loading users available..." : ""}</div>
      <div>{usersError ? usersError : ""}</div>
      <div className="flex gap-4">
        {users.map((user) => {
          return (
            <div
              className="bg-teal-500 text-white px-3 py-2 rounded-md"
              key={user.name}
            >
              {user.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
