import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../components/Carregando';

class Album extends React.Component {
  state = {
    objArtista: [],
    carregando: false,
    musicasFavoritas: [],
  };

  componentDidMount() {
    this.getMusica();
    this.pegarMusicasFavoritas();
  }

  getMusica = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const Musica = await getMusics(id);
    this.setState({ objArtista: Musica });
  };

  pegarMusicasFavoritas = async () => {
    this.setState({ carregando: true });
    const musica = await getFavoriteSongs();
    this.setState({ carregando: false, musicasFavoritas: musica });
  };

  adicionarFavoritos = async (obj) => {
    this.setState({ carregando: true });
    await addSong(obj);
    this.setState({ carregando: false });
  };

  render() {
    const { objArtista, carregando, musicasFavoritas } = this.state;
    return (
      <div data-testid="page-album">
        {/* Eu fiz o requisito: Exiba o nome da banda ou artista na tela.
        Você pode usar qualquer tag HTML que faça sentido,
        desde que ela tenha o atributo data-testid="artist-name".
         No Requisito 7, so continuar */}
        <Header />
        {objArtista.length > 0 ? (
          <div>
            <h3 data-testid="artist-name">{objArtista[0].artistName}</h3>
            <h5 data-testid="album-name">
              {
                `Album: ${objArtista[0].collectionName}
                 |Artista: ${objArtista[0].artistName}`
              }
            </h5>
            <div>
              { objArtista.map((element, index) => (
                index > 0 && <MusicCard
                  key={ element.previewUrl }
                  trackName={ element.trackName }
                  previewUrl={ element.previewUrl }
                  trackId={ element.trackId }
                  funcaoFavoritar={ this.adicionarFavoritos }
                  element={ element }
                  funcaoPegarFavoritas={ this.pegarMusicasFavoritas }
                  checked={
                    musicasFavoritas.some((e) => e.trackId === element.trackId)
                  }
                />))}
            </div>
          </div>
        ) : null}
        <div>
          {carregando ? (<Carregando />) : null}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
