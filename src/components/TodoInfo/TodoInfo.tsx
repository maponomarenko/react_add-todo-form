import cn from 'classnames';
import { ToDoItem, User } from '../../App';
import { UserInfo } from '../UserInfo';
import { FC } from 'react';

interface Prop {
  todo: ToDoItem;
  user: User | undefined;
}

export const TodoInfo: FC<Prop> = ({ todo, user }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
