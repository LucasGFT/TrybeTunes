import React from 'react';
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
        <p>{`Você tem ${numeroDeMusicasFavoritas} musicas salvas em favoritas`}</p>
      </div>
    );
  }
}

export default Profile;
