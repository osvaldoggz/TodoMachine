import React from "react";
import ReactDOM from "react-dom";
import './Modal.css';

function Modal({ children }) {
    return ReactDOM.createPortal(
        <div className="ModalBackground">
            {children}
        </div>,   //El primer parámetro que nos pide ReactDOM es el contenido que queremos teletransportar
        document.getElementById('modal')   //El segundo parámetro es a donde lo queremos teletransportar
    );
}

export { Modal };