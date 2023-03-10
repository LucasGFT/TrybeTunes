import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';
import Contact from '../components/Contact';

class Login extends React.Component {
  state = {
    nome: '',
    isDisableButton: true,
    carregamento: false,
    apertoButton: false,
  };

  haveChange = (event) => {
    const { target } = event;
    const { value } = target;
    this.setState({
      nome: value,
    }, () => {
      const { nome } = this.state;
      if (nome.length > 2) {
        this.setState({ isDisableButton: false });
      } else { this.setState({ isDisableButton: true }); }
    });
  };

  haveClickButton = async () => {
    const { nome, carregamento, apertoButton } = this.state;
    console.log(carregamento);
    console.log(apertoButton);
    console.log(nome);
    this.setState({ carregamento: true });
    await createUser({ name: nome });
    this.setState({ carregamento: false }, () => {
      this.setState({ apertoButton: true });
    });
  };

  render() {
    const { nome, isDisableButton, carregamento, apertoButton } = this.state;
    return (
      <div data-testid="page-login">
        { carregamento === true ? (<Carregando />) : (
          <form className="formLogin">
            <label htmlFor="input-nome">
              <div className="nomeContact">
                <h2>Nome:</h2>
                <Contact />
              </div>
              <input
                data-testid="login-name-input"
                id="input-nome"
                onChange={ this.haveChange }
                value={ nome }
              />
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ isDisableButton }
                onClick={ this.haveClickButton }
              >
                Entrar
              </button>
            </label>
          </form>
        )}
        { carregamento === false && apertoButton === true ? (
          <Redirect to="/TrybeTunes/search" />
        ) : null}
      </div>
    );
  }
}

export default Login;
