'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, Mail, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client/react';
import { GET_CATEGORIES } from '@/graphql/queries';

interface CategoriesData {
  categories: any[];
}

export default function Footer() {
  const { data: categoriesData } = useQuery<CategoriesData>(GET_CATEGORIES);
  const categories = categoriesData?.categories || [];

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-luxury-black text-white px-6 md:px-12 py-16 md:py-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="inline-block">
            <Image
              src="/brand-maison-zuri.svg"
              alt="Maison Zuri"
              width={180}
              height={64}
              className="object-contain h-14 w-auto brightness-0 invert"
            />
          </Link>
          <p className="text-sm text-white/80 leading-relaxed max-w-xs font-medium">
            L&apos;élégance dans chaque détail. Une collection de maroquinerie d&apos;exception pensée pour sublimer votre style avec caractère et authenticité.
          </p>
          <div className="flex gap-6 items-center">
            <Link href="#" className="hover:text-luxury-gold transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </Link>
            <Link href="#" className="hover:text-luxury-gold transition-colors">
              <MessageCircle className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-luxury-gold transition-colors">
              <X className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Boutique Navigation */}
        <div className="flex flex-col gap-8">
          <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-gold">La Boutique</h3>
          <ul className="flex flex-col gap-4 text-sm text-white/70 font-medium">
            <li><Link href="/produits" className="hover:text-luxury-gold transition-colors">Tout Explorer</Link></li>
            {categories.slice(0, 3).map(cat => (
              <li key={cat.id}>
                <Link href={`/produits?category=${cat.id}`} className="hover:text-white transition-colors font-black">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Maison Zuri Info */}
        <div className="flex flex-col gap-8">
          <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-gold">La Maison</h3>
          <ul className="flex flex-col gap-4 text-sm text-white/70 font-medium">
            <li><Link href="/a-propos" className="hover:text-white transition-colors">Notre Histoire</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Nous Contacter</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Boutiques Physiques</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Livraison & Retours</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-8">
          <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-gold">Newsletter</h3>
          <p className="text-sm text-white/80 leading-relaxed font-medium">
            Inscrivez-vous pour recevoir les exclusivités de la Maison Zuri.
          </p>
          <div className="flex flex-col gap-4">
            <input 
              type="email" 
              placeholder="votre@email.com" 
              className="bg-transparent border-b border-luxury-gray/20 py-3 text-sm focus:border-luxury-gold outline-none transition-colors text-white"
            />
            <button className="text-[10px] uppercase tracking-[0.4em] font-bold self-start hover:text-luxury-gold transition-colors bg-white/5 px-6 py-3 rounded-sm">
              S&apos;inscrire
            </button>
          </div>
        </div>
      </div>

      <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.4em] text-white/50 font-bold">
        <div>© {new Date().getFullYear()} Maison Zuri. Tous droits réservés.</div>
        <div className="flex gap-8">
          <Link href="#" className="hover:text-white transition-colors">Mentions Légales</Link>
          <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
        </div>
      </div>
    </motion.footer>
  );
}
