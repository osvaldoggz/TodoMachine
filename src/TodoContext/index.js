import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider({ children }) {
    const {
        item: todos,   //Los ':' sirven para renombrar una variable
        saveItem: saveTodos,
        loading, 
        error,
    } = useLocalStorage('TODOS_V1', []);
    const[searchValue, setSearchValue] = React.useState('');
    const[openModal, setOpenModal] = React.useState(false);   //Abrir el modal de agregar TODOS

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

    const addTodo = (text) => {
        const newTodos = [...todos];   //los ... sirven para crear una copia de los todos
        newTodos.push({
            text,
            completed: false,
        });
        saveTodos(newTodos);
    };

    const completeTodo = (text) => {
        const newTodos = [...todos];   //los ... sirven para crear una copia de los todos
        const todoIndex = newTodos.findIndex(
            (todo) => todo.text === text
        );
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
    };

    const deleteTodo = (text) => {
        const newTodos = [...todos];   //los ... sirven para crear una copia de los todos
        const todoIndex = newTodos.findIndex(
            (todo) => todo.text === text
        );
        newTodos.splice(todoIndex, 1);   //el método .splice nos pide como primer parámetro la posición de nuestro array que queramos eliminar y como segundo parámetro le enviamos la cantidad de índices que queramos eliminar a partir del índice que le indicamos en el primer parámetro
        saveTodos(newTodos);
    };

    return(
        <TodoContext.Provider value={{
            loading,
            error,
            completedTodos,
            totalTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            addTodo,
            completeTodo,
            deleteTodo,
            openModal,
            setOpenModal,
        }}>
            {children}
        </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider };