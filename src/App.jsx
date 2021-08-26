import React, { useState } from "react";
import "./styles.css";
import { albumes } from "./recursos/albumes";
import { estadosIniciales } from "./recursos/estadosIniciales";

export default function App() {
  const [genero, actualizarGenero] = useState(estadosIniciales.genero);
  const [agrupacion, actualizarAgrupacion] = useState(
    estadosIniciales.agrupacion
  );

  const manejarCambioAgrupacion = (evento) => {
    actualizarAgrupacion(evento.target.value);
  };

  const manejarCambioGenero = (evento) => {
    actualizarGenero(evento.target.value);
  };

  const crearLista = () => {
    const nuevaLista = albumes
      .filter((album) => {
        if (genero !== estadosIniciales.genero) {
          return album.genero === genero;
        }
        return album;
      })
      .filter((album) => {
        if (agrupacion !== estadosIniciales.agrupacion) {
          return album.agrupacion === agrupacion;
        }
        return album;
      });
    return nuevaLista;
  };

  let listaFiltrada = crearLista();

  return (
    <div className="App">
      <div className="container">
        <div className="filtros">
          <div className="filtro-genero">
            <div>Género</div>
            <select
              onChange={manejarCambioGenero}
              className="select"
              value={genero}
            >
              <option value={estadosIniciales.genero}>
                {estadosIniciales.genero}
              </option>
              <option value="pop">pop</option>
              <option value="soul">soul</option>
              <option value="rock">rock</option>
              <option value="dance">dance</option>
            </select>
          </div>

          <div className="filtro-genero">
            <div>Agrupación</div>
            <select
              onChange={manejarCambioAgrupacion}
              className="select"
              value={agrupacion}
            >
              <option value={estadosIniciales.agrupacion}>
                {estadosIniciales.agrupacion}
              </option>
              <option value="solista">solista</option>
              <option value="banda">banda</option>
            </select>
          </div>
        </div>
        <div className="lista-album">
          {listaFiltrada.length > 0
            ? listaFiltrada.map((album) => (
                <Album
                  key={album.id}
                  artista={album.artista}
                  titulo={album.titulo}
                  fecha={album.lanzamiento}
                  portada={album.portada}
                  genero={album.genero}
                  agrupacion={album.agrupacion}
                />
              ))
            : "no hay resultados"}
        </div>
      </div>
    </div>
  );
}

function Album(props) {
  const fechaActual = new Date();
  const fechaAlbum = new Date(props.fecha);
  const añoAlbum = fechaAlbum.getFullYear();
  const añoActual = fechaActual.getFullYear();
  const añosDiferencia = añoActual - añoAlbum;

  return (
    <div className="album-container">
      <img height="100%" src={props.portada} alt="tf" />
      <div className="album-contenido">
        <div className="album-descripcion">
          <div>
            <h3 className="album-titulo">{props.artista}</h3>

            <h4 className="artista-tipo">{props.agrupacion}</h4>

            <h4 className="album-subtitulo">{props.titulo}</h4>
            <h4 className="album-subtitulo">
              ({añoAlbum}) -{" "}
              {añosDiferencia > 1 ? (
                <span className="cronologia">Hace {añosDiferencia} años</span>
              ) : (
                <span className="cronologia">Hace menos de un año</span>
              )}
            </h4>
          </div>
        </div>
        <div className="album-pie">
          <span className="genero">{props.genero}</span>
        </div>
      </div>
    </div>
  );
}
