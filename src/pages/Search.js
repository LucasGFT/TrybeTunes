import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

let nomeArt;
let AlbumArtista;
let Lista;
class Search extends React.Component {
  state = {
    nomeArtista: '',
    isDisableButton: true,
    carregando: false,
    resposta: false,
  };

  listarMusicas = () => {
    Lista = (
      <div className="listaResultado">
        {AlbumArtista.length > 0 ? (
          AlbumArtista.map((element) => (
            <div key={ element.artworkUrl100 }>
              <span className="listaResultadoImg">
                <img src={ element.artworkUrl100 } alt={ element.artistName } />
              </span>
              <h3>
                {`Nome: ${element.collectionName}`}
              </h3>
              <h5>{`Artista ${element.artistName}`}</h5>
              <h5>{element.artistName}</h5>
              <span className="listaResultadoButton">
                <Link
                  to={ `/album/${element.collectionId}` }
                  data-testid={ `link-to-album-${element.collectionId}` }
                >
                  Procurar Album
                </Link>
              </span>
            </div>))
        ) : (<h1>Nenhum álbum foi encontrado</h1>)}
      </div>
    );
  };

  clickButton = async () => {
    const { nomeArtista } = this.state;
    nomeArt = nomeArtista;
    this.setState({ carregando: true });
    AlbumArtista = await searchAlbumsAPI(nomeArtista);
    this.setState({ nomeArtista: '', carregando: false, resposta: true });
    this.listarMusicas();
    console.log(AlbumArtista);
  };

  haveChange = (event) => {
    const { target } = event;
    const { value } = target;
    this.setState({
      nomeArtista: value,
    }, () => {
      const { nomeArtista } = this.state;
      if (nomeArtista.length > 1) {
        this.setState({ isDisableButton: false });
      } else { this.setState({ isDisableButton: true }); }
    });
  };

  render() {
    const { nomeArtista, isDisableButton, carregando, resposta } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { carregando === true ? (<Carregando />) : (
          <div className="formPesquisaArtista">
            <form>
              <input
                placeholder="Nome do Artista:"
                data-testid="search-artist-input"
                onChange={ this.haveChange }
                value={ nomeArtista }
              />
              <button
                type="button"
                disabled={ isDisableButton }
                data-testid="search-artist-button"
                onClick={ this.clickButton }
              >
                Pesquisar
              </button>
            </form>
          </div>
        ) }
        {
          resposta
          && (
            <div className="resultadoPesquisa">
              <h2>
                Álbuns de:
                {' '}
                {nomeArt}
              </h2>
              <br />
              {Lista}
            </div>
          )
        }
      </div>
    );
  }
}

export default Search;
