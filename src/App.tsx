import { lazy, Suspense } from 'react';
import './App.scss';

// import Products from './pages/Products';
const Products = lazy(() => import('./pages/Products'))

function App() {
  return (
    <div className="app">
      <Suspense fallback="LOADING...">
        <Products />
      </Suspense>
    </div>
  );
}

export default App;
