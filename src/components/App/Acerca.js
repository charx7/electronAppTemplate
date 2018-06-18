import React from 'react';
import { Link } from 'react-router-dom';

class Acerca extends React.Component {
  render() {
    return (
      <div>
        <h1>Holi soy acerca</h1>
        <Link to="/">Home</Link>
      </div>
    )
  }
}

export default Acerca;
