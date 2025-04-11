import { Routes, Route } from 'react-router-dom';
import Product from './components/Product';
import ProductDetail from './components/ProductDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Product />} />
      <Route path="/p/:prod_id" element={<ProductDetail />} />
    </Routes>
  );
}

export default App;

