import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  state = {
    check: false,
  };

  render() {
    const { trackName, previewUrl, trackId,
      funcaoFavoritar, element, funcaoPegarFavoritas, checked } = this.props;
    const { check } = this.state;
    return (
      <div>
        <h5>{trackName}</h5>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ async () => {
              if (!check) {
                await funcaoFavoritar(element);
                await funcaoPegarFavoritas();
                this.setState({ check: true });
              } else {
                this.setState({ check: false });
              }
            } }
            checked={ checked }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  funcaoFavoritar: PropTypes.func.isRequired,
  element: PropTypes.shape().isRequired,
  funcaoPegarFavoritas: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default MusicCard;
