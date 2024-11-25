import React from 'react';
import ShopCard from '../components/ShopCard';
import { storage } from '../utils/storage';
import type { Shop } from '../types';

export default function Shops() {
  const shops = storage.get<Shop[]>('shops', []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Local Shops</h1>
      {shops.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No shops available yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shops.map(shop => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      )}
    </div>
  );
}