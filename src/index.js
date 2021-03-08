import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(

  <BrowserRouter>
    <App />
  </BrowserRouter>, 
  document.getElementById('root')
);

reportWebVitals();
