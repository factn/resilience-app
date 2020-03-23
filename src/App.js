import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './App.css';
import theme from './theme';

// Holds all routes with the BrowserRouter, Switch, Route logic
import Router from './app/router/Router';

const customTheme = createMuiTheme(theme);
function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={customTheme}>
        <Router />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
