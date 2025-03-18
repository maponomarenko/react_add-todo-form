import { FC } from 'react';

interface UserInfoInt {
  user: { id: number; name: string; username: string; email: string };
}

export const UserInfo: FC<UserInfoInt> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
