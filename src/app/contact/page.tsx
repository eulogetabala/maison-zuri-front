'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Send, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-24 px-6 text-luxury-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-luxury-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-6 block"
          >
            Contact
          </motion.span>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-serif text-luxury-black mb-8"
          >
            Parlons de votre style
          </motion.h1>
          <p className="text-luxury-black max-w-2xl mx-auto text-lg font-medium italic">
            Une question sur une collection ou une commande ? Notre équipe est à votre entière disposition pour vous accompagner.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <motion.div 
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-luxury-gray flex items-center justify-center">
                    <Mail className="w-5 h-5 text-luxury-black" />
                  </div>
                  <h3 className="text-sm uppercase tracking-widest font-bold">Email</h3>
                </div>
                <p className="text-luxury-black text-sm font-bold">contact@maisonzuri.com</p>
                <p className="text-luxury-black text-sm font-bold">service@maisonzuri.com</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-luxury-gray flex items-center justify-center text-green-600">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm uppercase tracking-widest font-bold">WhatsApp</h3>
                </div>
                <p className="text-luxury-black text-sm font-bold">+242 06 123 45 67</p>
                <a 
                  href="https://wa.me/242061234567" 
                  className="inline-block text-[10px] uppercase tracking-widest font-bold text-luxury-gold border-b border-luxury-gold pb-1"
                >
                  Démarrer la discussion
                </a>
              </div>
            </div>

            <div className="pt-12 border-t border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-luxury-gray flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-luxury-black" />
                </div>
                <h3 className="text-sm uppercase tracking-widest font-bold">Notre Boutique</h3>
              </div>
              <p className="text-luxury-black text-sm leading-relaxed font-bold italic">
                Retrouvez l&apos;élégance Maison Zuri dans notre showroom exclusif.<br />
                <span className="text-luxury-gold">Brazzaville, Congo</span>
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white border border-gray-100 p-12 md:p-16 shadow-sm"
          >
            <form className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-black">Nom Complet</label>
                <input type="text" className="w-full bg-transparent border-b border-black/20 py-3 outline-none focus:border-luxury-gold transition-colors text-sm font-bold text-luxury-black placeholder:text-luxury-black/50" placeholder="Votre nom" />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-black">Sujet</label>
                <input type="text" className="w-full bg-transparent border-b border-black/20 py-3 outline-none focus:border-luxury-gold transition-colors text-sm font-bold text-luxury-black placeholder:text-luxury-black/50" placeholder="Comment pouvons-nous vous aider ?" />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-black">Message</label>
                <textarea rows={6} className="w-full bg-transparent border-b border-black/20 py-3 outline-none focus:border-luxury-gold transition-colors text-sm font-bold text-luxury-black placeholder:text-luxury-black/50 resize-none" placeholder="Votre message..."></textarea>
              </div>
              
              <button className="w-full bg-luxury-black text-white p-6 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-luxury-gold transition-all duration-500 flex items-center justify-center gap-4 group">
                Envoyer le Message 
                <Send className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
