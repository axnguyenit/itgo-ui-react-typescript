import React from 'react';
import { MotionLazyContainer } from './components/animate';
import NotistackProvider from './components/NotistackProvider';
import Router from './routes';
import ThemeProvider from './theme';

function App() {
  return (
    <ThemeProvider>
      <NotistackProvider>
        <MotionLazyContainer>
          <Router />
        </MotionLazyContainer>
      </NotistackProvider>
    </ThemeProvider>
  );
}

export default App;
