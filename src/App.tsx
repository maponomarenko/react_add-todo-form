import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { ChangeEvent, FormEvent, useState } from 'react';

export type ToDoItem = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Prop = {
  item: ToDoItem;
  user: User | undefined;
};

const preparedList = todosFromServer.map(item => {
  const user = usersFromServer.find(indUser => indUser.id === item.userId);

  return { item, user };
});

export const App = () => {
  const [visibleList, setVisibleList] = useState(preparedList);

  const [chosenUser, setChosenUser] = useState(0);
  const [chosenUserError, setChosenUserError] = useState(false);

  const [titleValue, setTitleValue] = useState('');
  const [titleError, setTitleError] = useState(false);

  const onAdd = (toDoItem: Prop) => {
    setVisibleList((currentList: Prop[]) => [...currentList, toDoItem]);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setChosenUser(+event.target.value);
    setChosenUserError(false);
  };

  const reset = () => {
    setChosenUser(0);
    setTitleValue('');

    setChosenUserError(false);
    setTitleError(false);
  };

  const getTodoId = () => {
    const maxId = Math.max(...visibleList.map(item => item.item.id));

    return maxId + 1;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (titleValue === '' && titleError === false) {
      setTitleError(!titleError);
    }

    if (chosenUser === 0 && chosenUserError === false) {
      setChosenUserError(!chosenUserError);
    }

    if (titleValue === '' || chosenUser === 0) {
      return;
    }

    onAdd({
      item: {
        id: getTodoId(),
        title: titleValue,
        completed: false,
        userId: +chosenUser,
      },
      user: {
        id: +chosenUser,
        name:
          usersFromServer.find(user => user.id === +chosenUser)?.name ||
          'Default',
        username:
          usersFromServer.find(user => user.id === +chosenUser)?.username ||
          'Default',
        email:
          usersFromServer.find(user => user.id === +chosenUser)?.email ||
          'Default',
      },
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => handleSubmit(event)}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              placeholder="Enter a Title"
              type="text"
              data-cy="titleInput"
              value={titleValue}
              onChange={handleTitleChange}
              onBlur={() => {
                if (!titleValue) {
                  setTitleError(!titleError);
                }
              }}
            />
            {titleError && <span className="error">Please enter a title</span>}
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={chosenUser}
              onChange={handleUserChange}
              onBlur={() => {
                if (chosenUser === 0) {
                  setChosenUserError(!chosenUserError);
                }
              }}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {chosenUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={visibleList} />
    </div>
  );
};
