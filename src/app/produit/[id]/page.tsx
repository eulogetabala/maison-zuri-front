'use client';

import { use } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_PRODUCT, GET_PRODUCTS } from '@/graphql/queries';
import { useCart } from '@/store/useCart';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronLeft, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';

interface ProductData {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
    gallery: string[];
  };
}

interface ProductsData {
  products: any[];
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addItem } = useCart();

  const { data, loading, error } = useQuery<ProductData>(GET_PRODUCT, {
    variables: { id },
    fetchPolicy: 'cache-first', // Optimization: Instant load if seen in the shop
  });

  const { data: allProductsData } = useQuery<ProductsData>(GET_PRODUCTS, {
    fetchPolicy: 'cache-first', // Use existing shop data for related products
  });

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-12 border-t-2 border-luxury-gold rounded-full animate-spin" />
        <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-luxury-gold">Maison Zuri</span>
      </div>
    </div>
  );

  if (error || !data?.product) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <h2 className="text-3xl font-serif mb-6">Produit introuvable</h2>
      <Link href="/produits" className="text-[10px] uppercase tracking-widest font-bold border-b border-luxury-black pb-2">
        Retour à la boutique
      </Link>
    </div>
  );

  const product = data.product;
  const relatedProducts = allProductsData?.products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4) || [];

  return (
    <div className="min-h-screen bg-white text-luxury-black pt-28">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <Link href="/produits" className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold hover:text-luxury-gold transition-colors group">
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Retour aux collections
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Gallery Section */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] bg-luxury-gray overflow-hidden shadow-2xl"
          >
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              className="object-cover"
              priority
            />
          </motion.div>
          
          {product.gallery && product.gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-6">
              {product.gallery.map((img, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="relative aspect-square bg-luxury-gray cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <Image src={img} alt={`${product.name} detail ${i}`} fill className="object-cover" />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold font-bold mb-4 block">
              {product.category.replace(/-/g, ' ')}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
              {product.name}
            </h1>
            <p className="text-2xl font-bold mb-10 tracking-tight text-luxury-black/90">
              {formatPrice(product.price)}
            </p>
            
            <div className="w-12 h-px bg-luxury-gold mb-10" />

            <div className="space-y-6 mb-12 text-lg text-luxury-black/70 leading-relaxed font-light">
              <p>{product.description}</p>
            </div>

            <div className="flex flex-col gap-6 mb-16">
              <button 
                onClick={() => addItem(product as any)}
                className="w-full bg-luxury-black text-white py-6 text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-luxury-gold transition-all duration-500 flex items-center justify-center gap-4 shadow-xl active:scale-[0.98]"
              >
                <ShoppingBag className="w-4 h-4" />
                Ajouter au panier
              </button>

              <div className="grid grid-cols-2 gap-4">
                <Link 
                  href="/panier"
                  className="bg-white border border-luxury-black text-luxury-black py-4 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-luxury-gray transition-all text-center"
                >
                  Voir le panier
                </Link>
                <Link 
                  href="/produits"
                  className="bg-white border border-luxury-black text-luxury-black py-4 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-luxury-gray transition-all text-center"
                >
                  Continuer les achats
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-4 text-[9px] uppercase tracking-widest font-bold text-luxury-black/60">
                  <Truck className="w-5 h-5 text-luxury-gold" />
                  Livraison gratuite (à domicile)
                </div>
                <div className="flex items-center gap-4 text-[9px] uppercase tracking-widest font-bold text-luxury-black/60">
                  <ShieldCheck className="w-5 h-5 text-luxury-gold" />
                  Paiement à la livraison
                </div>
              </div>
            </div>

            {/* Product Details Accordeon (Simplified) */}
            <div className="border-t border-gray-100 pt-8">
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-4">Matières & Entretien</h4>
              <p className="text-xs text-luxury-black/50 leading-relaxed">
                Cuir de veau d&apos;exception sélectionné dans les meilleures tanneries. Nettoyer avec un chiffon doux et sec. Éviter tout contact avec l&apos;eau et les parfums.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="py-24 mt-24 bg-luxury-gray">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-4xl font-serif mb-4">Vous aimerez aussi</h2>
              <div className="w-12 h-px bg-luxury-gold mx-auto" />
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
