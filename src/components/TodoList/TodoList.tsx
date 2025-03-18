import { FC } from 'react';
import { ToDoItem, User } from '../../App';
import { TodoInfo } from '../TodoInfo';

interface Item {
  item: ToDoItem;
  user: User | undefined;
}

interface Props {
  todos: Item[];
}

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((item: Item) => (
        <TodoInfo item={item.item} user={item.user} key={item.item.id} />
      ))}
    </section>
  );
};
