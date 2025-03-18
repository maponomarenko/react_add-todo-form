import { User } from '../../App';

export const UserInfo = (user: User) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
