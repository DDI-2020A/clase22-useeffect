/**
 * Created by chalosalvador on 8/2/20
 */
import React, { useEffect, useState } from 'react';
import Loader from './Loader';

const TodoList = () => {

  const [ todos, setTodos ] = useState( [] );
  const [ completed, setCompleted ] = useState( [] );
  const [ count, setCount ] = useState( 0 );
  const [ darkMode, setDarkMode ] = useState( false );
  const [ userData, setUserData ] = useState( null );
  const [ windowWidth, setWindowWidth ] = useState( window.innerWidth );

  useEffect( () => {
    console.log( 'SOLO CUANDO SE MONTA EL COMPONENTE' );

    fetch( 'https://jsonplaceholder.typicode.com/users/1' )
      .then( ( data ) => {
        console.log( 'data', data );
        return data.json();
      } )
      .then( ( userJSON ) => {
        console.log( 'userJSON', userJSON );
        setUserData( userJSON );
      } );

    console.log( 'SENTENCIA DESPUES DEL FETCH' );

  }, [] );

  useEffect( () => {
    console.log( 'SE REALIZÓ UN CAMBIO!' );
  } );

  useEffect( () => {
    console.log( 'EFFECTO Cantidad de tareas', todos.length );

    if( todos.length > 0 ) {
      document.title = `Tienes ${ todos.length } tareas pendientes`;
    } else {
      document.title = 'No tienes tareas pendientes';
    }
  }, [ todos ] );

  useEffect( () => {
    console.log( 'Cambio color de fondo', darkMode );
  }, [ darkMode ] );


  useEffect( () => {
    console.log( 'INICIO DEL EFECTO' );
    window.addEventListener( 'resize', handleResize );

    return () => {
      console.log( 'FIN DE EFECTO' );
      window.removeEventListener( 'resize', handleResize );
    };
  } );

  const handleResize = () => {
    console.log( 'Cambio el ancho' );
    setWindowWidth( window.innerWidth );
  };

  const handleAddTask = () => {
    const task = document.querySelector( '#task' ).value;
    setTodos( prevState => [ ...prevState, task ] );
    document.querySelector( '#task' ).value = '';
  };

  const handleDeleteTask = ( index ) => {

    console.log( 'handleDeleteTask' );

    setTodos( ( prevState ) => {
      return prevState.filter( ( task, i ) => i !== index );
    } );
  };

  const handleCompleteTask = ( index ) => {
    console.log( 'handleCompleteTask' );
    setCompleted( ( prevState ) => [
      ...prevState,
      todos[ index ]
    ] );

    handleDeleteTask( index );
  };


  return (
    <div className={ darkMode
      ? 'dark-mode'
      : '' }>

      <div>
        El ancho de la ventana es: { windowWidth }
      </div>


      <div>
        <h1>Información del usuario</h1>

        {
          userData
            ? <ul>
              <li>{ userData.name }</li>
              <li>{ userData.website }</li>
              <li>{ userData.phone }</li>
            </ul>
            : <Loader />
        }

      </div>


      <button onClick={ () => setDarkMode( !darkMode ) }>
        Cambiar a modo {
        darkMode
          ? ' claro'
          : ' oscuro'
      }</button>

      <div>
        { count }
        <button onClick={ () => setCount( count + 1 ) }>Sumar</button>
      </div>

      <div>
        <label htmlFor='task'>Tarea</label>
        <input type='text' id='task' />

        <button onClick={ handleAddTask }>Agregar tarea</button>
      </div>
      <h1>Lista de tareas pendientes ({ todos.length } en total)</h1>
      <table>
        <thead>
        <tr>
          <th>Nombre</th>
          <th>Eliminar</th>
          <th>Completar</th>
        </tr>
        </thead>
        <tbody>
        {
          todos.map( ( task, index ) => (
              <tr key={ index }>
                <td>{ task }</td>
                <td>
                  <button onClick={ () => handleDeleteTask( index ) }>Eliminar</button>
                </td>
                <td>
                  <button onClick={ () => handleCompleteTask( index ) }>Completada</button>
                </td>
              </tr>
            )
          )
        }
        </tbody>
      </table>

      <h1>Lista de tareas completadas ({ completed.length } en total)</h1>
      <table>
        <thead>
        <tr>
          <th>Nombre</th>
        </tr>
        </thead>
        <tbody>
        {
          completed.map( ( task, index ) => (
              <tr key={ index }>
                <td>{ task }</td>
              </tr>
            )
          )
        }
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
