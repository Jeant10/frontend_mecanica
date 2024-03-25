import logo from './logo.svg';
import './App.css';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts';

export const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='text-4xl font-bold'>Mecanica</h1>
        <h2 className='text-2xl font-bold'>Welcome {user.full_name}</h2>
      </header>
    </div>
  );
}


