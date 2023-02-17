import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const {
      trackName,
      previewUrl,
      funcaoFavoritar,
      element,
      funcaoPegarFavoritas,
    } = this.props;
    return (
      <div>
        <h5>{trackName}</h5>
        <div className="audioButton">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <button
            type="button"
            className="buttonVerMusicas"
            onClick={ async () => {
              await funcaoFavoritar(element);
              await funcaoPegarFavoritas();
            } }
          >
            Favoritar
          </button>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  funcaoFavoritar: PropTypes.func.isRequired,
  element: PropTypes.shape().isRequired,
  funcaoPegarFavoritas: PropTypes.func.isRequired,
};

export default MusicCard;
