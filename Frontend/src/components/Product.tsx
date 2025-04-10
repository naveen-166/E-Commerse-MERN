import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-10 text-gray-500">Loading products...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Our Products</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.prod_id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition duration-200 cursor-pointer overflow-hidden"
            onClick={() => navigate(`/p/${product.prod_id}`)}
          >
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-56 object-cover"
              />
            ) : (
              <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                No image available
              </div>
            )}
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h2>
              <p className="text-green-600 font-bold text-xl">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500 truncate">{product.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
