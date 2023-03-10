import { User } from "@prisma/client";

export const extractUser = (user: User) => {
  return {
    id: user.id,
    name: user.userName,
    isBanned: user.isBanned,
    email: user.email,
    roles: user.userRoles,
  };
};
