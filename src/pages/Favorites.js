import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
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

  removerFavorita = async (obj) => {
    await removeSong(obj);
  };

  render() {
    const { musicasFavoritas } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="tituloFavorites">
          <h2>Musicas Salvadas como Favoritas</h2>
        </div>
        <div className="listaResultado">
          {musicasFavoritas.map((element, index) => (
            <div key={ `${element.artworkUrl100}${index}` }>
              <span className="listaResultadoImg">
                <img src={ element.artworkUrl100 } alt={ element.artistName } />
              </span>
              <h3>
                {`Nome: ${element.collectionName}`}
              </h3>
              <h5>{`Artista ${element.artistName}`}</h5>
              <h5>{element.artistName}</h5>
              <span className="listaResultadoButton">
                <button
                  type="button"
                  onClick={ async () => {
                    await this.removerFavorita(element);
                  } }
                >
                  Remover dos Favoritos

                </button>

              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Favorites;
