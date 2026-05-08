'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useQuery } from '@apollo/client/react';
import { GET_HOME_DATA } from '@/graphql/queries';
import ProductCard from '@/components/product/ProductCard';
import { Star, ShieldCheck, Heart, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HomeData {
  products: any[];
  categories: any[];
}

export default function Home() {
  const { data, loading } = useQuery<HomeData>(GET_HOME_DATA);

  const products = data?.products || [];
  const categories = data?.categories || [];
  
  const featuredProducts = products.slice(0, 8);
  const aboutRef = useRef(null);
  
  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });

  const aboutImageY = useTransform(aboutScroll, [0, 1], ["-10%", "10%"]);

  const heroSlides = [
    {
      image: '/29.png',
      subtitle: "L'élégance au quotidien",
      title: "Maison Zuri",
      description: "La beauté se porte au quotidien, dans les détails qui font toute la différence. Des sacs et des bijoux pensés pour sublimer votre style, avec élégance et caractère."
    },
    {
      image: '/24.jpg',
      subtitle: "Nouvelle Collection",
      title: "Distinction",
      description: "Chaque pièce est pensée pour apporter une touche de distinction, sans en faire trop, mais toujours avec justesse."
    },
    {
      image: '/12.jpg',
      subtitle: "Accessoires d'Exception",
      title: "Caractère",
      description: "Sélectionnés pour leur qualité et leur authenticité, nos accessoires affirment votre personnalité avec finesse."
    }
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* SECTION HERO (KEN BURNS SLIDER) */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        
        {/* Slides Container */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* The Ken Burns Image */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 10, ease: "linear" }}
              className="absolute inset-0"
            >
              <Image
                src={heroSlides[currentSlide].image}
                alt={`Maison Zuri Collection - Slide ${currentSlide + 1}`}
                fill
                priority={currentSlide === 0}
                className="object-cover"
                unoptimized
              />
            </motion.div>
            
            {/* Dark Overlay inside the crossfade */}
            <div className="absolute inset-0 bg-black/30 z-0" />

            {/* Glassmorphism Text Block (Animated per slide) */}
            <div className="relative z-10 w-full px-6 flex items-center justify-center pt-24 md:pt-32 h-full">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="backdrop-blur-md bg-black/10 border border-white/20 p-10 md:p-16 max-w-4xl w-full text-center shadow-2xl rounded-sm"
              >
                <motion.span 
                  initial={{ letterSpacing: "0.2em", opacity: 0 }}
                  animate={{ letterSpacing: "0.5em", opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                  className="text-white text-[10px] md:text-xs uppercase block font-bold mb-6 tracking-[0.5em]"
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.span>
                
                <motion.h1 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="text-white text-5xl md:text-7xl lg:text-9xl font-serif mb-6 leading-tight tracking-tighter"
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="text-white/90 text-sm md:text-xl font-light mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="flex justify-center"
                >
                  <Link 
                    href="/produits" 
                    className="bg-white text-luxury-black px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-luxury-gold hover:text-white transition-all duration-500 min-w-[260px] shadow-xl"
                  >
                    Découvrir la collection
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Progress Indicators */}
        <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-4">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="group py-2"
            >
              <div className="relative w-12 h-[2px] bg-white/30 overflow-hidden">
                {currentSlide === index && (
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="absolute top-0 left-0 h-full bg-white" 
                  />
                )}
              </div>
            </button>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hidden md:flex"
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-white to-transparent" 
          />
        </motion.div>
      </section>

      {/* SECTION CATEGORIES (Nos Univers) */}
      <section className="py-24 md:py-32 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif text-luxury-black mb-4">Nos Univers</h2>
            <div className="w-12 h-px bg-luxury-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-[400px] bg-gray-200 animate-pulse rounded-sm" />
              ))
            ) : (
              categories.slice(0, 6).map((category, i) => (
                <motion.div 
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative h-[400px] overflow-hidden cursor-pointer shadow-lg"
                >
                  <Link href={`/produits?category=${category.id}`} className="relative block w-full h-full">
                    <Image 
                      src={category.image} 
                      alt={category.name} 
                      fill 
                      unoptimized
                      className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    />
                    <div className={cn(
                      "absolute inset-0 transition-colors duration-500",
                      category.id === 'hot' ? "bg-red-500/10 group-hover:bg-red-500/20" : "bg-black/20 group-hover:bg-black/40"
                    )} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                      <h3 className={cn(
                        "text-2xl md:text-3xl font-serif mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 uppercase tracking-widest text-center",
                        category.id === 'hot' && "text-red-500 font-black",
                        category.id === 'soldes' && "text-red-600 font-bold"
                      )}>
                        {category.name}
                      </h3>
                      <p className="text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-bold border-b border-white pb-2">
                        Explorer
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* SECTION PRODUITS (Pièces de Signature) */}
      <section className="py-24 md:py-32 bg-luxury-gray px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-serif text-luxury-black mb-4">Des pièces pensées pour vous</h2>
              <p className="text-sm text-luxury-black/60 uppercase tracking-[0.2em]">Sacs et bijoux qui s&apos;adaptent à votre quotidien</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/produits" 
                className="text-[10px] uppercase tracking-[0.4em] font-bold border-b-2 border-luxury-black pb-3 hover:border-luxury-gold hover:text-luxury-gold transition-all duration-500 text-luxury-black whitespace-nowrap block"
              >
                Toute la Collection ({products.length})
              </Link>
            </motion.div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12"
          >
            {loading ? (
              // Skeletons pendant le chargement
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <div className="aspect-[3/4] bg-gray-200 animate-pulse rounded-sm" />
                  <div className="h-4 w-2/3 bg-gray-100 animate-pulse" />
                  <div className="h-4 w-1/3 bg-gray-50 animate-pulse" />
                </div>
              ))
            ) : (
              featuredProducts.map((product, i) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  priority={i < 4}
                />
              ))
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center mt-16"
          >
            <Link 
              href="/produits" 
              className="bg-luxury-black text-white px-12 py-5 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-luxury-gold transition-all duration-500 shadow-xl"
            >
              Voir toute la collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION À PROPOS */}
      <section ref={aboutRef} className="py-32 md:py-48 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <motion.div style={{ y: aboutImageY }} className="absolute inset-0 h-[120%] -top-[10%]">
              <Image 
                src="/14.jpg" 
                alt="L'univers Maison Zuri" 
                fill 
                unoptimized
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">L&apos;univers Maison Zuri</span>
            <h2 className="text-4xl md:text-6xl font-serif text-luxury-black mb-8 leading-tight">Élégance, Qualité et Authenticité</h2>
            <div className="space-y-6 text-luxury-black/70 text-lg leading-relaxed font-light">
              <p>
                Maison Zuri est une marque née d’un désir simple : proposer des accessoires qui allient élégance, qualité et authenticité.
              </p>
              <p>
                Nous sélectionnons des sacs et des bijoux conçus pour accompagner chaque moment de votre vie, du quotidien aux occasions les plus importantes. Chaque pièce est pensée pour apporter une touche de distinction, sans en faire trop, mais toujours avec justesse.
              </p>
            </div>
            
            <div className="mt-12 pt-12 border-t border-luxury-gray">
              <span className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">Notre Vision</span>
              <p className="text-luxury-black/80 text-xl font-serif italic mb-8">
                &quot;Chez Maison Zuri, nous croyons que les accessoires ne sont pas de simples objets. Ils sont une manière de s’exprimer, d’affirmer son style et de révéler sa personnalité.&quot;
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: <Star className="w-5 h-5 text-luxury-gold" />, label: "Qualité des matériaux" },
                  { icon: <ShieldCheck className="w-5 h-5 text-luxury-gold" />, label: "Finesse des finitions" },
                  { icon: <Heart className="w-5 h-5 text-luxury-gold" />, label: "Harmonie des designs" }
                ].map((val, i) => (
                  <div key={i} className="flex items-center gap-4 text-luxury-black/60 text-[10px] uppercase tracking-widest font-bold">
                    {val.icon}
                    {val.label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION ENGAGEMENT */}
      <section className="py-24 md:py-32 bg-luxury-black text-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-serif mb-8">Notre engagement</h2>
            <p className="text-lg text-white/60 font-light mb-12">
              Nous nous engageons à vous proposer des produits élégants, durables, accessibles et soigneusement sélectionnés. Porque vous méritez des accessoires qui vous ressemblent et qui traversent le temps.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {['Élégant', 'Durable', 'Accessible', 'Sélectif'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-luxury-gold" />
                  <span className="text-sm uppercase tracking-widest font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/3 text-center border-l border-white/10 pl-12 hidden md:block">
            <span className="text-[10px] uppercase tracking-[0.5em] opacity-40 block mb-6">Maison Zuri — Signature</span>
            <p className="text-2xl font-serif leading-relaxed italic">
              &quot;L’élégance dans chaque détail.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* SECTION SIGNATURE FINALE */}
      <section className="py-48 px-6 bg-white text-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="w-12 h-px bg-luxury-gold mx-auto mb-16" />
          <h2 className="text-4xl md:text-7xl font-serif text-luxury-black italic mb-16 leading-tight">
            &quot;S’exprimer, s’affirmer, se révéler.&quot;
          </h2>
          <Link 
            href="/produits" 
            className="inline-block text-[10px] uppercase tracking-[0.6em] text-white bg-luxury-black px-12 py-6 hover:bg-luxury-gold transition-colors duration-500 font-bold shadow-2xl"
          >
            Découvrir l&apos;élégance
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
