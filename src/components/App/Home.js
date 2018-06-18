import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  
  manejaClickBoton = () => {
    alert('AuchXD');
  }

  render() {
    return (
      <div>
        <h1>Mi primera App electron!</h1>
        <Link to="/acerca">Acerca</Link>

      </div>
    )
  }
}

export default Home;
