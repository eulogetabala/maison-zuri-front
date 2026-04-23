'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client/react';
import { GET_PRODUCTS, GET_CATEGORIES, GET_PRODUCTS_BY_CATEGORY } from '@/graphql/queries';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Suspense, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface CategoriesData {
  categories: any[];
}

interface ProductsData {
  products?: any[];
  productsByCategory?: any[];
}

function ProductListContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryFilter = searchParams.get('category');

  const { data: categoriesData } = useQuery<CategoriesData>(GET_CATEGORIES);
  const categories = categoriesData?.categories || [];

  const { data: productsData, loading, error } = useQuery<ProductsData>(
    categoryFilter ? GET_PRODUCTS_BY_CATEGORY : GET_PRODUCTS,
    { 
      variables: categoryFilter ? { categoryId: categoryFilter } : {},
      fetchPolicy: 'cache-and-network'
    }
  );

  const products = useMemo(() => {
    return productsData?.products || productsData?.productsByCategory || [];
  }, [productsData]);

  const currentPage = parseInt(searchParams.get('page') || '1');
  const itemsPerPage = 12;

  const filteredProducts = products;

  const sortFilter = searchParams.get('sort') || 'new';

  let sortedProducts = [...filteredProducts];
  if (sortFilter === 'price-asc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortFilter === 'price-desc') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const currentCategory = categoryFilter 
    ? categories.find(c => c.id === categoryFilter)
    : null;

  const currentCategoryName = currentCategory?.name || 'Toutes les Collections';
  const categoryImage = currentCategory?.image || '/29.png';

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/produits?${params.toString()}`);
  };

  const updateSort = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);
    params.set('page', '1'); // Reset to page 1 on sort
    router.push(`/produits?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white text-luxury-black">
      {/* Cinematic Header */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          key={categoryFilter}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <Image
            src={categoryImage}
            alt={currentCategoryName}
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white px-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.5em] font-bold block mb-4"
          >
            Maison Zuri
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-serif"
          >
            {currentCategoryName}
          </motion.h1>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
          <div className="flex items-center gap-10 h-16 whitespace-nowrap scrollbar-hide">
            <Link 
              href="/produits"
              className={cn(
                "text-[10px] uppercase tracking-widest transition-all relative py-2",
                !categoryFilter ? "text-luxury-black font-black" : "text-luxury-black/40 hover:text-luxury-black"
              )}
            >
              Tous
              {!categoryFilter && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold" />}
            </Link>
            {categories.map(cat => (
              <Link 
                key={cat.id}
                href={`/produits?category=${cat.id}`}
                className={cn(
                  "text-[10px] uppercase tracking-widest transition-all relative py-2",
                  categoryFilter === cat.id ? "text-luxury-black font-black" : "text-luxury-black/40 hover:text-luxury-black"
                )}
              >
                {cat.name}
                {categoryFilter === cat.id && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold" />}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Results Info */}
        <div className="flex justify-between items-center mb-12 text-[10px] uppercase tracking-widest font-bold text-luxury-black">
          <span>{sortedProducts.length} Articles</span>
          <div className="flex gap-4 items-center">
            <span>Trier par</span>
            <select 
              className="bg-transparent text-luxury-black outline-none cursor-pointer border-none appearance-none font-bold min-w-[120px]"
              onChange={(e) => updateSort(e.target.value)}
              value={sortFilter}
            >
              <option value="new" className="text-black">Nouveautés</option>
              <option value="price-asc" className="text-black">Prix croissant</option>
              <option value="price-desc" className="text-black">Prix décroissant</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 mb-16">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination UI */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-8 mt-20 pt-12 border-t border-gray-50">
                <button 
                  onClick={() => updatePage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 disabled:opacity-20 hover:text-luxury-gold transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-6">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => updatePage(page)}
                      className={cn(
                        "text-xs uppercase tracking-widest font-bold transition-all",
                        currentPage === page ? "text-luxury-gold border-b-2 border-luxury-gold pb-1" : "text-luxury-black hover:text-luxury-gold"
                      )}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => updatePage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 disabled:opacity-20 hover:text-luxury-gold transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-24 text-center">
            <p className="text-muted-foreground italic font-serif text-xl">Aucun produit trouvé.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProduitsPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center font-serif italic text-luxury-gold">Maison Zuri - Chargement...</div>}>
      <ProductListContent />
    </Suspense>
  );
}
