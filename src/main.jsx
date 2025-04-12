import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import './index.css';

const App = React.lazy(() => import('./App.jsx'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
