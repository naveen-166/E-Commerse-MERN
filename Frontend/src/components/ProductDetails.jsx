import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { prod_id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/p/${prod_id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Product not found');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [prod_id]);

  if (loading) return <div className="text-center py-10 text-gray-500">Loading product...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Link to="/" className="text-blue-600 hover:underline">&larr; Back to Products</Link>
      <div className="mt-4 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <img
            src={product.images?.[0] || '/placeholder.jpg'}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-green-600 text-2xl font-semibold">${product.price.toFixed(2)}</p>
          <p className="text-gray-700">{product.description || 'No description available.'}</p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {product.reviews.map((review, index) => (
              <div key={index} className="border border-gray-200 p-4 rounded-lg shadow">
                <p className="font-semibold mb-1">Rating: {review.rating} / 5</p>
                <p className="text-gray-700 mb-2">{review.caption}</p>
                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2">
                    {review.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="review"
                        className="w-20 h-20 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;