import React from "react";

function useLocalStorage(itemName, initialValue) {
  const[item, setItem] = React.useState(initialValue);
  const[loading, setloading] = React.useState(true);
  const[error, setError] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;
  
        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem=initialValue;
        } else {
          parsedItem=JSON.parse(localStorageItem);
          setItem(parsedItem);
        }
  
        setloading(false);
      } catch(error){
        setloading(false);
        setError(true);
      }
    }, 2000);
  }, []);

  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };

  return {
    item, 
    saveItem, 
    loading, 
    error,
  };
}

export {useLocalStorage};

// localStorage.removeItem('TODOS_V1');

// const defaultTodos = [
//   {text: 'Cortar cebolla', completed: true},
//   {text: 'Tomar el curso de introducción a React.js', completed: false},
//   {text: 'Llorar con la Llorona', completed: false},
//   {text: 'Lalala', completed: false},
// ];

// localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos));