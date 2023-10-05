import React from 'react';
import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';

const defaultTodos = [
  {text: 'Cortar cebolla', completed: true},
  {text: 'Tomar el curso de introducción a React.js', completed: false},
  {text: 'Llorar con la Llorona', completed: false},
  {text: 'Lalala', completed: false},
];

function App() {
  const[todos, setTodos]=React.useState(defaultTodos);
  const[searchValue, setSearchValue]=React.useState('');
  const completedTodos = todos.filter(todo => !!todo.completed).length;  //todos.filter nos va a devolver un array con todos los elementos que coinciden con cierta validación
  //los !! sirven para que todo lo que devuelva la función todo sea booleano
  //la propiedad .length sirve para que solo tome en cuenta la cantidad de elementos en el array que nos devuelve "todos.filter"
  const totalTodos = todos.length;
  const searchedTodos = todos.filter(    //estado derivado para buscar los todos iguales
    (todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);   //el metodo .includes sirve para saber si hay letras que coincidan entre la palabra que está en el todo list y la que buscamos con el input
      //el método .toLowerCase sirve para convertir todo a minúsculas
    }
  );

  const completeTodo = (text) => {
    const newTodos = [...todos];   //los ... sirven para crear una copia de los todos
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text == text
    );
    newTodos[todoIndex].completed = true;
    setTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const newTodos = [...todos];   //los ... sirven para crear una copia de los todos
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text == text
    );
    newTodos.splice(todoIndex, 1);   //el método .splice nos pide como primer parámetro la posición de nuestro array que queramos eliminar y como segundo parámetro le enviamos la cantidad de índices que queramos eliminar a partir del índice que le indicamos en el primer parámetro
    setTodos(newTodos);
  };

  return (
    <>
      <TodoCounter completed={completedTodos} total={totalTodos}/>

      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <TodoList>
        {searchedTodos.map(todo=>(
          <TodoItem 
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>

      <CreateTodoButton/>
    </>
  );
}

export default App;
