import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { FC } from 'react';
import { Item } from '../TodoList/TodoList';

export const TodoInfo: FC<{ todo: Item }> = ({ todo }) => {
  return (
    <article
      data-id={todo.toDoItem.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.toDoItem.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.toDoItem.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
