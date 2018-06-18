import React from 'react';
import { ipcRenderer } from 'electron';
import {
  CATCH_ON_MAIN,
  MANDAR_AL_RENDERER_REACT
} from  '../../../utils/constants';
import {
  HashRouter,
  Route,
  Router
} from 'react-router-dom';

class HelloWorld extends React.Component {

  manejaClickBoton = () => {
    console.log('Auch me picastes');
    // Mandamos la informacion al metodo de main ej: utilidad de cambiar la dimension de nuestra ventana
    ipcRenderer.send(CATCH_ON_MAIN, 'Oli soy un rikolisioso mensaje del renderer (React)'); 

  }

  // Para mandar un mensaje del renderer al main
  manejaRenderer = (event, data) => {
    console.log('manejadorRenderer', data);
  }

  componentDidMount () {
    ipcRenderer.on(MANDAR_AL_RENDERER_REACT, this.manejaRenderer);
  }

  componentWillUnmount () {
    ipcRenderer.removeAllListeners(MANDAR_AL_RENDERER_REACT, this.manejaRenderer);
  }

  render () {
    return (
      <div>
        <h3>
          Hola soy Prueba
        </h3>
      </div>
    )
  }
}

export default HelloWorld;
