import React from "react";
import { Link } from "react-router-dom";
import './index.css'
import { IoIosAlert } from "react-icons/io";

function Alert({ chipId, onClose }) {
  return (
    <div className="alert-overlay">
      <div className="alert-modal">
        <IoIosAlert className="iconalert"/>
        <h2>Alerta de Temperatura!</h2>
        <p>
          O sensor <strong>{chipId}</strong> está com a
          temperatura instável. É recomendável verificar o dispositivo imediatamente.
        </p>

        <div className="alert-buttons">
          <button className="btn-close" onClick={onClose}>
            Ignorar
          </button>
          <Link to={`/dashboard/${chipId}`} className="btn-view-sensor">
            Ver Sensor
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Alert;
