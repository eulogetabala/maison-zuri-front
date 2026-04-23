'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, ShieldCheck, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1.1, 1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [0.8, 0.5]);

  return (
    <div ref={containerRef} className="bg-white min-h-screen text-luxury-black">
      {/* SECTION HERO - ART GALLERY STYLE */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-white">
        {/* Vertical Side Text */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-20 items-center opacity-20 group">
          <span className="rotate-90 text-[8px] uppercase tracking-[1.5em] font-black whitespace-nowrap text-luxury-black">
            L&apos;ART DE VIVRE
          </span>
          <div className="w-[1px] h-24 bg-luxury-black" />
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Text Side */}
          <div className="lg:col-span-5 z-10 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-[1px] bg-luxury-gold" />
                <span className="text-luxury-gold text-[10px] uppercase tracking-[0.6em] font-black">
                  Héritage & Vision
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-serif text-luxury-black leading-[0.9] tracking-tighter">
                Le Sens du <br />
                <span className="italic pl-4 text-luxury-gold">Détail.</span>
              </h1>
              
              <p className="text-luxury-black/60 text-lg font-medium leading-relaxed max-w-md italic">
                &quot;L&apos;élégance n&apos;est pas une question de se faire remarquer, mais une question de se faire retenir.&quot;
              </p>
              
              <div className="pt-8">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 60 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="h-1 bg-luxury-black" 
                />
              </div>
            </motion.div>
          </div>

          {/* Framed Image Side */}
          <div className="lg:col-span-7 relative order-1 lg:order-2">
            <motion.div
              style={{ scale: heroScale }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] md:aspect-[3/2] lg:aspect-square w-full bg-luxury-gray p-4 md:p-8 shadow-2xl border border-gray-50"
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/14.jpg"
                  alt="L'art de vivre Maison Zuri"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-1000"
                />
              </div>
              
              {/* Decorative Frame Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-luxury-gold/30 hidden md:block" />
              <div className="absolute -bottom-10 -left-10 text-[8px] uppercase tracking-[1em] font-black opacity-10 rotate-90 origin-left hidden lg:block">
                MAISON ZURI • STUDIO
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION MANIFESTE - EDITORIAL */}
      <section className="py-32 md:py-48 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-1 hidden lg:block">
              <span className="rotate-90 block whitespace-nowrap text-[8px] uppercase tracking-[1em] opacity-30 origin-left translate-x-2 translate-y-12 font-black">
                MAISON ZURI • EST. 2024
              </span>
            </div>
            
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="aspect-[4/5] relative overflow-hidden shadow-2xl"
              >
                <Image 
                  src="/12.jpg" 
                  alt="Détails de confection" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover scale-110"
                />
              </motion.div>
              <div className="absolute -bottom-10 -right-10 bg-luxury-gold p-8 hidden md:block">
                <p className="text-white text-xs uppercase tracking-widest font-black leading-relaxed max-w-[150px]">
                  L&apos;excellence se cache dans les détails invisibles.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-12">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-luxury-gold text-[10px] uppercase tracking-[0.5em] font-black block"
              >
                Le Manifeste
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-serif text-luxury-black leading-tight"
              >
                Une quête de <br />
                <span className="italic">perfection constante.</span>
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-luxury-black text-lg font-medium leading-loose space-y-8"
              >
                <p>
                  Maison Zuri est née d’un désir simple mais exigeant : redéfinir la maroquinerie d&apos;exception non plus comme un complément, mais comme la pièce maîtresse d&apos;une silhouette accomplie.
                </p>
                <p className="italic border-l-2 border-luxury-gold pl-8 py-2">
                  &quot;Nous ne créons pas pour une saison, mais pour une vie. Nos pièces sont des témoins du temps qui passe, gardant leur noblesse au fil des ans.&quot;
                </p>
                <p>
                  Des cuirs sélectionnés avec une rigueur absolue aux finitions polies à la main, chaque création Maison Zuri porte en elle l&apos;âme d&apos;un savoir-faire qui refuse tout compromis.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION PHILOSOPHIE - GALLERY GRID */}
      <section className="py-32 bg-luxury-gray px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif text-luxury-black mb-6">Nos Piliers</h2>
            <div className="w-16 h-[2px] bg-luxury-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Excellence", 
                desc: "Chaque cuir, chaque boucle et chaque couture font l'objet d'un contrôle de qualité minutieux et intransigeant.",
                icon: <Star className="w-8 h-8 text-luxury-gold" />,
                img: "/15.jpg"
              },
              { 
                title: "Intemporalité", 
                desc: "Nous dessinons des lignes qui ignorent les modes éphémères pour privilégier l'élégance qui traverse les époques.",
                icon: <ShieldCheck className="w-8 h-8 text-luxury-gold" />,
                img: "/16.jpg"
              },
              { 
                title: "Passion", 
                desc: "Notre moteur est l'amour du bel objet et le plaisir de voir nos clients porter nos créations avec fierté.",
                icon: <Heart className="w-8 h-8 text-luxury-gold" />,
                img: "/18.jpg"
              }
            ].map((val, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="group bg-white overflow-hidden shadow-xl"
              >
                <div className="h-64 relative overflow-hidden">
                  <Image 
                    src={val.img} 
                    alt={val.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="p-12 text-center relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white flex items-center justify-center shadow-lg rounded-full">
                    {val.icon}
                  </div>
                  <h3 className="text-2xl font-serif mb-6 text-luxury-black">{val.title}</h3>
                  <p className="text-[10px] text-luxury-black uppercase tracking-[0.2em] leading-relaxed font-black opacity-60">
                    {val.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION ENGAGEMENT - SIGNATURE */}
      <section className="py-48 px-6 text-center bg-white relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <span className="text-luxury-gold text-[12px] uppercase tracking-[0.8em] font-black block">L&apos;Engagement</span>
            <h2 className="text-5xl md:text-8xl font-serif text-luxury-black leading-tight tracking-tighter">
              Plus qu&apos;une marque, <br />
              <span className="italic">une promesse.</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 max-w-2xl mx-auto">
              {['Sélectivité', 'Durabilité', 'Rareté', 'Honnêteté'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-luxury-gold" />
                  <span className="text-[10px] uppercase tracking-widest font-black text-luxury-black">{item}</span>
                </div>
              ))}
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              viewport={{ once: true }}
              className="text-2xl font-serif italic text-luxury-black/40 pt-10"
            >
              &quot;Parce que vous méritez des pièces de maroquinerie qui vous ressemblent et qui traversent le temps.&quot;
            </motion.p>

            <div className="pt-20">
              <Link 
                href="/produits"
                className="inline-flex items-center gap-6 bg-luxury-black text-white px-12 py-6 text-[10px] uppercase tracking-[0.4em] font-black hover:bg-luxury-gold transition-all duration-500 group"
              >
                Rejoindre l&apos;Expérience
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Subtle decorative elements */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
        <div className="absolute bottom-20 left-10 text-[8px] uppercase tracking-[1em] font-black opacity-10 rotate-90 origin-left hidden md:block">
          MAISON ZURI PARIS
        </div>
      </section>
    </div>
  );
}
