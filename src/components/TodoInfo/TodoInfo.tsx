import cn from 'classnames';
import { ToDoItem, User } from '../../App';
import { UserInfo } from '../UserInfo';
import { FC } from 'react';

interface Prop {
  item: ToDoItem;
  user: User | undefined;
}

export const TodoInfo: FC<Prop> = ({ item, user }) => {
  return (
    <article
      data-id={item.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': item.completed,
      })}
    >
      <h2 className="TodoInfo__title">{item.title}</h2>

      {user && <UserInfo {...user} />}
    </article>
  );
};
