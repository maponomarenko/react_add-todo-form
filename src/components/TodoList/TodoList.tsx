import { FC } from 'react';
import { ToDoItem, User } from '../../App';
import { TodoInfo } from '../TodoInfo';

export interface Item {
  toDoItem: ToDoItem;
  user: User;
}

interface Props {
  todos: Item[];
}

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(item => (
        <TodoInfo todo={item} key={item.toDoItem.id} />
      ))}
    </section>
  );
};
