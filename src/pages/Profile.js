import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Profile extends React.Component {
  state = {
    musicasFavoritas: [],
  };

  componentDidMount() {
    this.pegarMusicasFavoritas();
  }

  pegarMusicasFavoritas = async () => {
    const Musica = await getFavoriteSongs();
    this.setState({ musicasFavoritas: Musica });
  };

  render() {
    const { musicasFavoritas } = this.state;
    const numeroDeMusicasFavoritas = musicasFavoritas.length;
    return (
      <div data-testid="page-profile">
        <Header />
        <p>{`Você tem no total ${numeroDeMusicasFavoritas} musicas como favoritas`}</p>
        {numeroDeMusicasFavoritas > 0 ? (
          <button type="button" className="buttonVerMusicas">
            <Link to="/favorites" className="linkFavoritesButton">
              Ver Musicas
            </Link>
          </button>
        ) : (
          <button type="button" className="buttonVerMusicas">
            <Link to="/search" className="linkFavoritesButton">
              Adicionar Musicas
            </Link>
          </button>
        )}
      </div>
    );
  }
}

export default Profile;
