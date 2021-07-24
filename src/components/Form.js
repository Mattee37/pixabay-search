import React, { useState } from "react";
import PropTypes from "prop-types";

import Error from "./Error";

const Form = ({ setBusqueda }) => {
  //[estado, actualizador]
  const [termino, setTermino] = useState("");
  //[estado, actualizador]
  const [error, setError] = useState(false);

  //previene el estado default del form, valida y guarda los datos de la busqueda
  const buscarImagenes = e => {
    e.preventDefault();

    //valida
    if (termino.trim() === "") {
      setError(true);
      return;
    }
    //actualiza y envia datos
    setError(false);
    setBusqueda(termino);
  };

  return (
    <form onSubmit={buscarImagenes}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca una image, Ej.: Perros"
            onChange={e => {
              setTermino(e.target.value);
            }}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>
      {error ? <Error mensaje="El campo a llenar es obligatorio" /> : null}
    </form>
  );
};

Form.propTypes = {
  setBusqueda: PropTypes.func.isRequired
};

export default Form;
