import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  state = {
    usuario: {},
    carregamento: false,
  };

  componentDidMount() {
    this.pegarUser();
  }

  pegarUser = async () => {
    this.setState({ carregamento: true });
    const objeto = await getUser();
    this.setState({
      carregamento: false,
      usuario: objeto });
  };

  render() {
    const { carregamento, usuario } = this.state;
    return (
      <div>
        <header data-testid="header-component">
          {carregamento === true ? (<Carregando />)
            : (
              <div>
                <h3>Header</h3>
                <h2 data-testid="header-user-name">{usuario.name}</h2>
                <Link to="/search" data-testid="link-to-search">Search</Link>
                <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
                <Link to="/profile" data-testid="link-to-profile">Profile</Link>
              </div>
            )}
        </header>
      </div>
    );
  }
}

export default Header;
