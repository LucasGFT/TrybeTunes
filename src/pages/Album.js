import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    objArtista: [],
  };

  componentDidMount() {
    this.getMusica();
  }

  getMusica = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const Musica = await getMusics(id);
    this.setState({ objArtista: Musica });
  };

  render() {
    const { objArtista } = this.state;
    return (
      <div data-testid="page-album">
        {/* Eu fiz o requisito: Exiba o nome da banda ou artista na tela.
        Você pode usar qualquer tag HTML que faça sentido,
        desde que ela tenha o atributo data-testid="artist-name".
         No Requisito 7, so continuar */}
        <Header />
        Album
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
                />))}
            </div>
          </div>
        ) : null}
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
