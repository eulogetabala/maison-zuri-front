'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, Search, User, ChevronDown, Heart } from 'lucide-react';
import { useFavorites } from '@/store/useFavorites';
import { useCart } from '@/store/useCart';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useQuery } from '@apollo/client/react';
import { GET_CATEGORIES } from '@/graphql/queries';

interface CategoriesData {
  categories: any[];
}

export default function Navbar() {
  const { data: categoriesData } = useQuery<CategoriesData>(GET_CATEGORIES);
  const categories = categoriesData?.categories || [];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const { getTotalItems } = useCart();
  const { items: favoriteItems } = useFavorites();
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    setHasMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'À Propos', href: '/a-propos' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 md:px-12",
      isScrolled 
        ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-md text-luxury-black py-2" 
        : "bg-white text-luxury-black border-b border-gray-50 py-4"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Boutique Dropdown (Desktop) */}
        <div className="hidden lg:flex items-center gap-8 flex-1">
          <div className="relative group">
            <button 
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold hover:text-luxury-gold transition-colors py-2"
              onMouseEnter={() => setIsCollectionsOpen(true)}
            >
              Sacs <ChevronDown className="w-3 h-3" />
            </button>
            <AnimatePresence>
              {isCollectionsOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onMouseLeave={() => setIsCollectionsOpen(false)}
                  className="absolute top-full left-0 w-80 bg-white shadow-2xl p-8 grid grid-cols-1 gap-4 border border-gray-100 mt-2 z-50"
                >
                  <Link 
                    href="/produits"
                    className="text-[11px] uppercase tracking-widest hover:text-luxury-gold transition-colors text-luxury-black font-black border-b border-gray-50 pb-2 flex justify-between items-center"
                    onClick={() => setIsCollectionsOpen(false)}
                  >
                    Voir tout <span>&rarr;</span>
                  </Link>
                  <div className="flex flex-col gap-3">
                    {categories.map((cat) => (
                      <Link 
                        key={cat.id} 
                        href={`/produits?category=${cat.id}`}
                        className="text-[10px] uppercase tracking-[0.2em] hover:text-luxury-gold transition-colors text-luxury-black/70 font-semibold"
                        onClick={() => setIsCollectionsOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link 
            href="/a-propos" 
            className="text-[10px] uppercase tracking-[0.3em] font-bold hover:text-luxury-gold transition-colors"
          >
            À Propos
          </Link>
        </div>

        {/* Center: Logo */}
        <Link 
          href="/" 
          className="transition-transform hover:scale-105 mx-auto lg:mx-0 flex items-center"
        >
          <Image
            src="/brand-maison-zuri.svg"
            alt="Maison Zuri"
            width={300}
            height={108}
            className="object-contain h-14 md:h-20 w-auto mix-blend-multiply transition-all duration-500"
            priority
          />
        </Link>

        {/* Right: Desktop Links */}
        <div className="hidden lg:flex items-center justify-end gap-8 flex-1">
          <Link 
            href="/contact" 
            className="text-[10px] uppercase tracking-[0.3em] font-bold hover:text-luxury-gold transition-colors"
          >
            Contact
          </Link>
          
          <div className="flex items-center gap-6 ml-6">
            <button className="hover:text-luxury-gold transition-colors p-1">
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>
            <Link href="/favoris" className="relative p-1 hover:text-luxury-gold transition-colors group">
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {hasMounted && favoriteItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {favoriteItems.length}
                </span>
              )}
            </Link>
            <Link href="/panier" className="relative p-1 hover:text-luxury-gold transition-colors group">
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {hasMounted && getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <Link href="/favoris" className="relative p-1">
            <Heart className="w-6 h-6" />
            {hasMounted && favoriteItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {favoriteItems.length}
              </span>
            )}
          </Link>
          <Link href="/panier" className="relative p-1">
            <ShoppingBag className="w-6 h-6" />
            {hasMounted && getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {getTotalItems()}
              </span>
            )}
          </Link>
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] bg-white z-[70] p-12 flex flex-col shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-12">
                <Image
                  src="/brand-maison-zuri.svg"
                  alt="Maison Zuri"
                  width={130}
                  height={46}
                  className="object-contain h-10 w-auto mix-blend-multiply"
                />
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex flex-col gap-8">
                <div className="space-y-4">
                  <div className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold mb-4">Sacs</div>
                  <Link 
                    href="/produits"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm uppercase tracking-widest font-black py-2 decoration-luxury-gold underline underline-offset-8"
                  >
                    Tout explorer
                  </Link>
                  <div className="flex flex-col gap-4 pl-4 border-l border-gray-100">
                    {categories.map((cat) => (
                      <Link 
                        key={cat.id} 
                        href={`/produits?category=${cat.id}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-xs uppercase tracking-widest font-bold py-1 text-luxury-black/60"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col gap-6 border-t border-gray-50 pt-8">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm uppercase tracking-[0.3em] font-bold"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-12 border-t border-gray-100 italic text-xs text-muted-foreground font-serif text-center">
                &quot;L&apos;élégance dans chaque détail.&quot;
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
