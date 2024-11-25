import React from 'react';
import ProductCard from '../components/ProductCard';
import { storage } from '../utils/storage';
import type { Product } from '../types';

export default function Marketplace() {
  const products = storage.get<Product[]>('products', []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Marketplace</h1>
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No products available yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}