'use client';

import { products } from '@/lib/mockData';
import { formatPrice } from '@/lib/utils';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import Image from 'next/image';

export default function AdminProduits() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold">Produits</h1>
          <p className="text-gray-500 mt-1">Gérez votre inventaire et vos collections.</p>
        </div>
        <button className="bg-luxury-black text-white px-6 py-3 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-luxury-black/90 transition-all">
          <Plus className="w-4 h-4" />
          Ajouter un produit
        </button>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Rechercher un produit..." 
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-100 rounded-md focus:outline-none focus:border-luxury-black transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-100 rounded-md hover:bg-gray-50 transition-colors w-full md:w-auto justify-center">
            <Filter className="w-4 h-4" />
            Catégories
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] uppercase tracking-widest font-bold text-gray-500 border-b border-gray-100">
                <th className="px-6 py-4">Produit</th>
                <th className="px-6 py-4">Catégorie</th>
                <th className="px-6 py-4">Prix</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded bg-gray-100 overflow-hidden shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <span className="text-sm font-bold text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-gray-600 capitalize">{product.category}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded font-bold uppercase">
                      En Stock
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button className="p-2 text-gray-400 hover:text-luxury-black transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
