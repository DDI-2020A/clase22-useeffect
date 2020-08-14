import React, { useState } from 'react';
import '../styles/App.css';
import UserList from './UserList';
import TodoList from './TodoList';

const App = () => {
  const [ viewTodo, setViewTodo ] = useState( true );

  return (
    <>
      <UserList />

      <button onClick={ () => setViewTodo( !viewTodo ) }>
        {
          viewTodo
            ? 'Ocultar'
            : 'Ver'
        } lista de tareas
      </button>


      { viewTodo && <TodoList /> }
    </>
  );
};

export default App;

