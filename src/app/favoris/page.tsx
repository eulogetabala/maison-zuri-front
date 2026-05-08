'use client';

import { useFavorites } from '@/store/useFavorites';
import ProductCard from '@/components/product/ProductCard';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FavoritesPage() {
  const { items } = useFavorites();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className="h-screen flex items-center justify-center font-serif italic text-luxury-gold">
        Maison Zuri - Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-luxury-black pt-20">
      {/* Cinematic Header */}
      <section className="relative h-[30vh] md:h-[40vh] flex items-center justify-center overflow-hidden bg-luxury-gray/30">
        <div className="relative z-10 text-center px-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.5em] font-bold block mb-4 text-luxury-gold"
          >
            Votre Sélection
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-serif text-luxury-black"
          >
            Mes Favoris
          </motion.h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {items.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-12 text-[10px] uppercase tracking-widest font-bold text-luxury-black">
              <span>{items.length} Articles enregistrés</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
              {items.map((product) => (
                <ProductCard key={product.id} product={product as any} />
              ))}
            </div>
          </>
        ) : (
          <div className="py-24 text-center">
            <Heart className="w-12 h-12 mx-auto text-luxury-gold/30 mb-6" />
            <p className="text-luxury-black/60 italic font-serif text-xl mb-8">
              Votre liste de favoris est vide.
            </p>
            <Link 
              href="/produits"
              className="inline-block bg-luxury-black text-white text-[10px] uppercase tracking-[0.3em] font-bold px-12 py-5 hover:bg-luxury-gold transition-colors duration-500"
            >
              Explorer les Collections
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
