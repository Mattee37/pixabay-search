import React, { useState, useEffect } from "react";

import Form from "./components/Form";
import ImageList from "./components/ImageList";

function App() {
  //[estado, actualizador]
  const [busqueda, setBusqueda] = useState("");
  //[estado, actualizador]
  const [imagenes, setImagenes] = useState([]);
  //[estado, actualizador]
  const [paginaactual, setPaginaActual] = useState(1);
  //[estado, actualizador]
  const [totalpaginas, setTotalPaginas] = useState(1);

  //consulta la API, guarda la respuesta, hace los calculos de la paginacion y por ultimo toma al elemento jumbotron para el scroll
  useEffect(() => {
    const consultarApi = async () => {
      //valida
      if (busqueda === "") return;

      //define parametros del url
      const imagenesPorPagina = 30;
      const key = "15403268-4f07342578f7b935aa643df69";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      //hace la consulta
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      //carga el array que responde la API al estado
      setImagenes(resultado.hits);

      //calcula la cantidad total de paginas
      const calcularTotalPaginas = Math.ceil(
        resultado.totalHits / imagenesPorPagina
      );
      //guarda la cantidad de paginas en el estado
      setTotalPaginas(calcularTotalPaginas);

      //obtiene y utiliza el selector
      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth" });
    };
    consultarApi();
  }, [busqueda, paginaactual]);

  //envia la aplicacion a la pag anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    if (nuevaPaginaActual === 0) return;

    setPaginaActual(nuevaPaginaActual);
  };

  //envia la aplicacion a la pag siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if (nuevaPaginaActual > totalpaginas) return;

    setPaginaActual(nuevaPaginaActual);
  };
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Form setBusqueda={setBusqueda} />
      </div>
      <div className="row justify-content-center mb-2">
        <ImageList imagenes={imagenes} />
        {paginaactual === 1 ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={paginaAnterior}
          >
            &laquo; Anterior
          </button>
        )}
        {paginaactual === totalpaginas ? null : (
          <button
            type="button"
            className="btn btn-info"
            onClick={paginaSiguiente}
          >
            Siguiente &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
