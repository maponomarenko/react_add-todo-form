import { FC } from 'react';
import { User } from '../../App';

interface UserInfoInt {
  user: User;
}

export const UserInfo: FC<UserInfoInt> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
