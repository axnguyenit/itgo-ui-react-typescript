import React from 'react';
import NotistackProvider from './components/NotistackProvider';
import Router from './routes';
import ThemeProvider from './theme';

function App() {
  return (
    <ThemeProvider>
      <NotistackProvider>
        <Router />
      </NotistackProvider>
    </ThemeProvider>
  );
}

export default App;
