import React from 'react';

class Contact extends React.Component {
  render() {
    const imgGit = 'https://grasielagomes.github.io/pixelartproject/assets/github.svg';
    return (
      <div className="contact">
        <a target="_blank" href="https://github.com/LucasGFT" rel="noreferrer">
          <img alt="github" src={ imgGit } />
        </a>
        <a target="_blank" href="https://www.linkedin.com/in/lucas-gomes-filgueiras/" rel="noreferrer">
          <img alt="linkedin" src="https://imagensfree.com.br/wp-content/uploads/2022/06/icone-linkedin-branco-png-635-2-300x255.png" />
        </a>
      </div>
    );
  }
}

export default Contact;
