import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    nomeArtista: '',
    isDisableButton: true,
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
    const { nomeArtista, isDisableButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            onChange={ this.haveChange }
            value={ nomeArtista }
          />
          <button
            type="button"
            disabled={ isDisableButton }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
