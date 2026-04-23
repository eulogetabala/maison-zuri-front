'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useCart } from '@/store/useCart';
import { formatPrice } from '@/lib/utils';
import { motion, Variants } from 'framer-motion';

import { useApolloClient } from '@apollo/client/react';
import { GET_PRODUCT } from '@/graphql/queries';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

import { useEffect, useState } from 'react';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [hasMounted, setHasMounted] = useState(false);
  const client = useApolloClient();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const prefetchProduct = () => {
    client.query({
      query: GET_PRODUCT,
      variables: { id: product.id },
    }).catch(() => {}); // Silent catch for prefetch
  };

  if (!hasMounted) return (
    <div className="flex flex-col h-full opacity-0 animate-pulse bg-luxury-gray aspect-[3/4]" />
  );

  return (
    <motion.div 
      variants={variants}
      onMouseEnter={prefetchProduct}
      className="group flex flex-col h-full relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden mb-5 bg-luxury-gray">
        <Link href={`/produit/${product.id}`} className="block h-full">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              className="object-cover transition-all duration-1000 grayscale-[10%] group-hover:grayscale-0"
            />
          </motion.div>
        </Link>
        
        {/* Quick Add Button - Floating Style */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            addItem(product as any);
          }}
          className="absolute bottom-4 right-4 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-luxury-gold hover:text-white"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col flex-grow px-2">
        <div className="flex flex-col gap-1 mb-3">
          <div className="flex justify-between items-start">
            <span className="text-[8px] uppercase tracking-[0.3em] text-luxury-gold font-black">
              {product.category.replace(/-/g, ' ')}
            </span>
            <Link href={`/produit/${product.id}`} className="text-luxury-black/30 hover:text-luxury-black">
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          
          <Link href={`/produit/${product.id}`} className="block">
            <h3 className="text-lg md:text-xl font-serif text-luxury-black leading-tight group-hover:text-luxury-gold transition-colors duration-500">
              {product.name}
            </h3>
          </Link>
        </div>
        
        <div className="mt-auto border-t border-gray-50 pt-3">
          <p className="text-sm font-bold text-luxury-black tracking-tight tabular-nums">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
