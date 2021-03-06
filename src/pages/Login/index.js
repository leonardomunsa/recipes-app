import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();

    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ meals: {}, cocktails: {} }),
    );
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([]),
    );
    history.push('/comidas');
  };

  const REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const MIN_PASSWORD_LENGTH = 6;

  return (
    <form onSubmit={ handleLogin }>
      <input
        type="text"
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
        data-testid="email-input"
      />
      <input
        type="password"
        value={ password }
        onChange={ (e) => setPassword(e.target.value) }
        data-testid="password-input"
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ !(REGEX.test(email) && password.length > MIN_PASSWORD_LENGTH) }
      >
        Login
      </button>
    </form>
  );
}

export default Login;
