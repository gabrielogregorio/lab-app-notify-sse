import { useGetUsers } from "../core/useGetUsers";
import { Button } from "./button";
import { Text } from "./text";

export const UsersAvailable = () => {
  const { users, usersError, usersIsLoading } = useGetUsers();

  return (
    <div>
      <Text as="h2" className="text-sm">
        Users registered
      </Text>

      <div>
        {usersIsLoading ? (
          <Text as="p" className="text-sm">
            loading users available...
          </Text>
        ) : undefined}
      </div>

      <div>
        {usersError ? (
          <Text as="p" className="text-sm">
            {usersError}
          </Text>
        ) : undefined}
      </div>

      <div className="flex gap-4">
        {users.map((user) => {
          return (
            <Button type="button" key={user.name} className="select-all">
              {user.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
