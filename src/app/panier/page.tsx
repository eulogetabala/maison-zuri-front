'use client';

import { useCart } from '@/store/useCart';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PanierPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-32 flex flex-col items-center justify-center text-center min-h-[70vh]">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 border border-gray-100 flex items-center justify-center mb-10"
        >
          <ShoppingBag className="w-8 h-8 text-luxury-gold/50" />
        </motion.div>
        <h1 className="text-4xl font-serif mb-6 text-luxury-black">Votre Panier est vide</h1>
        <p className="text-luxury-black mb-12 max-w-sm leading-relaxed font-medium italic">
          &quot;L&apos;élégance commence là où les choix se font.&quot; Parcourez nos nouvelles collections pour trouver votre prochaine pièce de signature.
        </p>
        <Link 
          href="/produits" 
          className="bg-luxury-black text-white px-12 py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-luxury-gold transition-all duration-500 shadow-xl"
        >
          Découvrir la Boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-luxury-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <Link href="/produits" className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-luxury-black hover:text-luxury-gold mb-6 group transition-colors font-bold">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> 
              Retourner à la boutique
            </Link>
            <h1 className="text-5xl md:text-6xl font-serif leading-tight">Mon Panier</h1>
          </div>
          <div className="text-[11px] uppercase tracking-[0.3em] font-bold text-luxury-gold border-b border-luxury-gold/20 pb-2">
            {getTotalItems()} Articles sélectionnés
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Cart Items List */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="hidden md:grid grid-cols-12 text-[9px] uppercase tracking-[0.2em] font-black border-b border-gray-100 pb-6 mb-8 text-luxury-black">
              <div className="col-span-7">Produit</div>
              <div className="col-span-3 text-center">Quantité</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <AnimatePresence>
              {items.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-12 gap-6 py-10 border-b border-gray-50 items-center group"
                >
                  {/* Product Info */}
                  <div className="col-span-12 md:col-span-7 flex gap-6">
                    <div className="relative w-28 aspect-[3/4] bg-white border border-gray-100 overflow-hidden">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                      <span className="text-[8px] uppercase tracking-widest text-luxury-gold font-black">
                        {item.category.replace(/-/g, ' ')}
                      </span>
                      <h3 className="text-xl font-serif">
                        <Link href={`/produit/${item.id}`} className="hover:text-luxury-gold transition-colors">
                          {item.name}
                        </Link>
                      </h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-[9px] uppercase tracking-widest font-bold text-red-400 hover:text-red-600 transition-colors mt-2 text-left flex items-center gap-2"
                      >
                        <Trash2 className="w-3 h-3" /> Supprimer
                      </button>
                    </div>
                  </div>

                  {/* Quantity Control */}
                  <div className="col-span-6 md:col-span-3 flex justify-center">
                    <div className="flex items-center border border-gray-100 px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-3 hover:text-luxury-gold transition-colors"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="w-10 text-center text-sm font-bold tabular-nums">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-3 hover:text-luxury-gold transition-colors"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-6 md:col-span-2 text-right">
                    <p className="text-lg font-medium tabular-nums">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 h-fit lg:sticky lg:top-32">
            <div className="border border-gray-100 p-10 md:p-12 shadow-sm bg-white">
              <h2 className="text-2xl font-serif mb-10">Résumé de commande</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-xs uppercase tracking-widest text-luxury-black font-bold">
                  <span>Sous-total</span>
                  <span className="font-bold">{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-xs uppercase tracking-widest text-luxury-black font-bold">
                  <span>Livraison</span>
                  <span className="text-green-600 font-bold">Inclus &bull; Gratuit</span>
                </div>
                <div className="h-px bg-gray-100 my-8" />
                <div className="flex justify-between items-end">
                  <span className="text-sm uppercase tracking-[0.2em] font-black">Total</span>
                  <span className="text-3xl font-serif">{formatPrice(getTotalPrice())}</span>
                </div>
              </div>

              <Link 
                href="/commande"
                className="w-full bg-luxury-black text-white px-8 py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-luxury-gold transition-all duration-500 flex items-center justify-center gap-4 group shadow-xl"
              >
                Passer la Commande
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <div className="mt-12 space-y-4 pt-10 border-t border-gray-50">
                <div className="flex items-center gap-4 text-[9px] uppercase tracking-widest font-bold text-luxury-black">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Paiement sécurisé à la livraison
                </div>
                <div className="flex items-center gap-4 text-[9px] uppercase tracking-widest font-bold text-luxury-black">
                  <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" /> Emballage cadeau offert
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
