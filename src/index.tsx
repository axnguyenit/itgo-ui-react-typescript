// highlight
import './utils/highlight';

// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
// import 'react-image-lightbox/style.css';

// editor
import 'react-quill/dist/quill.snow.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
// @mui
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// redux
import { store } from './redux/store';
// contexts
import { AuthProvider, CollapseDrawerProvider } from './contexts';

import App from './App';
import './index.css';
import LoadingScreen from './components/LoadingScreen';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <AuthProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {/* @ts-ignore */}
            <HelmetProvider>
              <Suspense fallback={<LoadingScreen />}>
                <CollapseDrawerProvider>
                  <App />
                </CollapseDrawerProvider>
              </Suspense>
            </HelmetProvider>
          </LocalizationProvider>
        </AuthProvider>
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
