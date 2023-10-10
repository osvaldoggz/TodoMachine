import './CreateTodoButton.css';

function CreateTodoButton({setOpenModal}) {
    return(
      <button 
        className="CreateTodoButton"
        onClick={
          () => {
            setOpenModal(state => !state);   //Llamamos al actualizador del estado de OpenModal y le envío una función que recibe un parámetro (state) y devolvemos la negación de ese estado
          }
        }
      >+</button>
    );
  }

  export {CreateTodoButton};