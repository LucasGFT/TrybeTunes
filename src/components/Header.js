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
                <h2 data-testid="header-user-name">
                  Nome:
                  {' '}
                  {usuario.name}
                </h2>
                <nav>
                  <ul className="nav">
                    <li><Link to="/search" data-testid="link-to-search">Search</Link></li>
                    <li>
                      <Link
                        to="/favorites"
                        data-testid="link-to-favorites"
                      >
                        Favorites
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile"
                        data-testid="link-to-profile"
                      >
                        Profile
                      </Link>
                    </li>
                  </ul>
                </nav>

              </div>
            )}
        </header>
      </div>
    );
  }
}

export default Header;
