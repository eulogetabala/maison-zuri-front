'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_PRODUCT } from '@/graphql/queries';
import { ChevronLeft, ShoppingBag, Heart, Share2, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { formatPrice, cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import ProductCard from '@/components/product/ProductCard';

interface ProductData {
  product: any;
  products: any[];
}

export default function ProductPage() {
  const { id } = useParams();
  const { data, loading, error } = useQuery<ProductData>(GET_PRODUCT, {
    variables: { id }
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isVideoSelected, setIsVideoSelected] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error || !data?.product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <p className="font-serif italic text-2xl">Produit introuvable</p>
      <Link href="/produits" className="text-[10px] uppercase tracking-widest font-bold text-luxury-gold border-b border-luxury-gold pb-1">Retour boutique</Link>
    </div>
  );

  const product = data.product;
  const allProductsData = data;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const relatedProducts = allProductsData?.products
    ?.filter((p: any) => p.category === product.category && p.id !== product.id)
    .slice(0, 4) || [];

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      {/* Breadcrumb */}
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
            onMouseMove={!isVideoSelected ? handleMouseMove : undefined}
            onMouseEnter={() => !isVideoSelected && setIsHovering(true)}
            onMouseLeave={() => !isVideoSelected && setIsHovering(false)}
          >
            {isVideoSelected ? (
              <video 
                src={product.video} 
                autoPlay 
                loop 
                controls 
                className="w-full h-full object-cover"
              />
            ) : (
              <motion.div
                className="w-full h-full relative"
                animate={{
                  scale: isHovering ? 1.5 : 1,
                  originX: `${mousePos.x}%`,
                  originY: `${mousePos.y}%`,
                }}
                transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
              >
                <Image 
                  src={selectedImage || product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover"
                  priority
                />
              </motion.div>
            )}
          </motion.div>
          
          <div className="grid grid-cols-5 gap-4">
            {/* Main Image Thumbnail */}
            <motion.div 
              onClick={() => { setSelectedImage(product.image); setIsVideoSelected(false); }}
              className={cn(
                "relative aspect-square bg-luxury-gray cursor-pointer hover:opacity-80 transition-all border-2",
                (!isVideoSelected && (selectedImage === product.image || !selectedImage)) ? "border-luxury-gold" : "border-transparent"
              )}
            >
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </motion.div>
            
            {/* Gallery Thumbnails */}
            {product.gallery?.map((img: string, i: number) => (
              <motion.div 
                key={i}
                onClick={() => { setSelectedImage(img); setIsVideoSelected(false); }}
                className={cn(
                  "relative aspect-square bg-luxury-gray cursor-pointer hover:opacity-80 transition-all border-2",
                  (!isVideoSelected && selectedImage === img) ? "border-luxury-gold" : "border-transparent"
                )}
              >
                <Image src={img} alt={`${product.name} detail ${i}`} fill className="object-cover" />
              </motion.div>
            ))}

            {/* Video Thumbnail */}
            {product.video && (
              <motion.div 
                onClick={() => setIsVideoSelected(true)}
                className={cn(
                  "relative aspect-square bg-black cursor-pointer hover:opacity-80 transition-all border-2 flex items-center justify-center overflow-hidden",
                  isVideoSelected ? "border-luxury-gold" : "border-transparent"
                )}
              >
                <video src={product.video} className="absolute inset-0 w-full h-full object-cover opacity-50" muted />
                <Play className="relative z-10 text-white w-6 h-6 fill-white" />
                <div className="absolute bottom-1 left-1 text-[8px] text-white font-bold uppercase tracking-tighter bg-black/40 px-1 rounded">Vidéo</div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10"
          >
            <div>
              <p className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] font-black mb-4">
                {product.category}
              </p>
              <h1 className="text-5xl md:text-6xl font-serif text-luxury-black mb-6 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-6">
                <p className="text-3xl font-serif text-luxury-black">
                  {formatPrice(product.discountPrice || product.price)}
                </p>
                {product.discountPrice && (
                  <p className="text-xl text-luxury-black/30 line-through font-light">
                    {formatPrice(product.price)}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6 mb-12 text-lg text-luxury-black/70 leading-relaxed font-light">
              <p>{product.description}</p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <button className="flex-1 bg-luxury-black text-white py-6 text-[11px] uppercase tracking-[0.4em] font-black hover:bg-luxury-gold transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 group">
                  <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                  Ajouter au panier
                </button>
                <button className="p-6 border border-gray-200 hover:border-luxury-gold hover:text-luxury-gold transition-all duration-500 group">
                  <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
                </button>
              </div>
              
              <button className="w-full py-4 text-[10px] uppercase tracking-widest font-bold text-luxury-black/40 hover:text-luxury-black transition-colors flex items-center justify-center gap-2">
                <Share2 className="w-3 h-3" />
                Partager cet article
              </button>
            </div>

            {/* Shipping Info */}
            <div className="pt-10 grid grid-cols-2 gap-8 border-t border-gray-50">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-black text-luxury-black mb-2">Livraison</p>
                <p className="text-xs text-luxury-black/50 font-light">Expédition sous 24/48h. Livraison sécurisée dans le monde entier.</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-black text-luxury-black mb-2">Authenticité</p>
                <p className="text-xs text-luxury-black/50 font-light">Certificat d&apos;authenticité Maison Zuri inclus avec chaque pièce.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-32">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-4xl font-serif text-luxury-black">Vous aimerez aussi</h2>
            <Link href="/produits" className="text-[10px] uppercase tracking-widest font-black text-luxury-gold hover:text-luxury-black transition-colors border-b-2 border-luxury-gold/20 pb-1">
              Voir tout
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {relatedProducts.map((p: any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
