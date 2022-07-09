import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
// import {
//   Navbar, Nav, NavDropdown, Dropdown, Container, NavItem, NavLink,
// } from 'react-bootstrap';
import App from './app';
import './css/style.css';

document.title = 'Dragonball API';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
