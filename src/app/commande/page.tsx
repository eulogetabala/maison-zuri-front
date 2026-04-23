'use client';

import { useState } from 'react';
import { useCart } from '@/store/useCart';
import { formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowLeft, Send, ShieldCheck, Heart, MapPin, Search, Edit3 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// International Phone Input
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

// Google Places Autocomplete
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { useMutation } from '@apollo/client/react';
import { CREATE_ORDER } from '@/graphql/mutations';

export default function CommandePage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  
  const [createOrder, { loading: isSubmitting }] = useMutation(CREATE_ORDER);
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [phone, setPhone] = useState<string | undefined>('');
  const [address, setAddress] = useState<any>(null);
  const [isManualAddress, setIsManualAddress] = useState(true);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    manualAddress: '',
    city: '',
    notes: '',
  });

  if (items.length === 0 && !isSubmitted) {
    router.push('/panier');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReviewing(true); // First step: Recap
  };

  const handleFinalSubmit = async () => {
    try {
      const orderInput = {
        customerName: formData.fullName,
        email: formData.email,
        phone: phone || '',
        address: isManualAddress ? formData.manualAddress : address?.label || '',
        city: formData.city,
        total: getTotalPrice(),
        paymentMethod: 'PAYMENT_ON_DELIVERY',
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      };

      await createOrder({
        variables: { input: orderInput }
      });

      setIsSubmitted(true);
      clearCart();
    } catch (err) {
      console.error('Failed to create order:', err);
      alert('Une erreur est survenue lors de la validation de votre commande. Veuillez réessayer.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    // This part is now handled by the Modal overlay inside the main return
  }

  return (
    <div className="bg-white min-h-screen text-luxury-black pb-24 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-16 md:pt-24">
        {/* Header */}
        <div className="mb-20">
          <button 
            onClick={() => isReviewing ? setIsReviewing(false) : router.push('/panier')}
            className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-luxury-black hover:text-luxury-gold mb-6 group transition-colors font-bold"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> 
            {isReviewing ? 'Modifier mes informations' : 'Retour au panier'}
          </button>
          <h1 className="text-5xl md:text-6xl font-serif">
            {isReviewing ? 'Vérification' : 'Commander'}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Main Content Area */}
          <div className="lg:col-span-12">
            <AnimatePresence mode="wait">
              {!isReviewing ? (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-20"
                >
                  {/* Left Column: Form */}
                  <div className="lg:col-span-7">
                    <h2 className="text-2xl font-serif mb-12 border-b border-gray-50 pb-6">Coordonnées de livraison</h2>
                    <form onSubmit={handleSubmit} className="space-y-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex flex-col gap-3">
                          <label htmlFor="fullName" className="text-[10px] uppercase tracking-widest font-bold text-luxury-black">Nom Complet</label>
                          <input 
                            required
                            type="text" 
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Votre nom et prénom"
                            className="bg-transparent border-b border-luxury-black/20 py-4 text-sm font-medium focus:border-luxury-gold outline-none transition-all placeholder:text-luxury-black/50 text-luxury-black"
                          />
                        </div>
                        
                        <div className="flex flex-col gap-3">
                          <label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-luxury-black">Email</label>
                          <input 
                            required
                            type="email" 
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="votre@email.com"
                            className="bg-transparent border-b border-luxury-black/20 py-4 text-sm font-medium focus:border-luxury-gold outline-none transition-all placeholder:text-luxury-black/50 text-luxury-black"
                          />
                        </div>

                        <div className="flex flex-col gap-3">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-black">Téléphone</label>
                          <div className="border-b border-luxury-black/20 pb-2 custom-phone-input">
                            <PhoneInput
                              placeholder="Ex: 06 00 00 00 00"
                              value={phone}
                              onChange={setPhone}
                              defaultCountry="FR"
                              className="text-sm font-medium outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 pt-4">
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-black flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-luxury-gold" /> Adresse de Livraison
                          </label>
                          <button 
                            type="button"
                            onClick={() => setIsManualAddress(!isManualAddress)}
                            className="text-[9px] uppercase tracking-widest font-bold text-luxury-gold hover:text-luxury-black transition-colors flex items-center gap-2"
                          >
                            {isManualAddress ? (
                              <><Search className="w-3 h-3" /> Utiliser la suggestion</>
                            ) : (
                              <><Edit3 className="w-3 h-3" /> Saisir manuellement</>
                            )}
                          </button>
                        </div>

                        <div className="border-b border-luxury-black/20 min-h-[50px]">
                          {isManualAddress ? (
                            <input 
                              required
                              type="text"
                              name="manualAddress"
                              value={formData.manualAddress}
                              onChange={handleChange}
                              placeholder="Rue, quartier, immeuble..."
                              className="w-full bg-transparent py-4 text-sm font-medium outline-none text-luxury-black placeholder:text-luxury-black/50"
                            />
                          ) : (
                            <div className="custom-address-picker">
                              <GooglePlacesAutocomplete
                                apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
                                selectProps={{
                                  value: address,
                                  onChange: setAddress,
                                  placeholder: "Saisissez votre adresse...",
                                  styles: {
                                    control: (provided) => ({
                                      ...provided,
                                      backgroundColor: 'transparent',
                                      border: 'none',
                                      boxShadow: 'none',
                                      fontSize: '14px',
                                      fontWeight: '500',
                                      padding: '4px 0',
                                    }),
                                    input: (provided) => ({
                                      ...provided,
                                      color: '#121212',
                                    }),
                                    singleValue: (provided) => ({
                                      ...provided,
                                      color: '#121212',
                                    }),
                                    placeholder: (provided) => ({
                                      ...provided,
                                      color: '#12121280',
                                    }),
                                    option: (provided, state) => ({
                                      ...provided,
                                      backgroundColor: state.isFocused ? '#F5F5F5' : 'white',
                                      color: '#121212',
                                      cursor: 'pointer',
                                    })
                                  },
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex flex-col gap-3">
                          <label htmlFor="city" className="text-[10px] uppercase tracking-widest font-bold text-luxury-black">Ville</label>
                          <input 
                            required
                            type="text" 
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Votre ville"
                            className="bg-transparent border-b border-luxury-black/20 py-4 text-sm font-medium focus:border-luxury-gold outline-none transition-all placeholder:text-luxury-black/50 text-luxury-black"
                          />
                        </div>
                        <div className="flex flex-col gap-3 pt-6 text-luxury-black">
                          <label htmlFor="notes" className="text-[10px] uppercase tracking-widest font-bold text-luxury-black">Instructions (Optionnel)</label>
                          <textarea 
                            id="notes"
                            name="notes"
                            rows={1}
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Codes d'accès, étage..."
                            className="bg-transparent border-b border-luxury-black/20 py-4 text-sm font-medium focus:border-luxury-gold outline-none transition-all placeholder:text-luxury-black/50 text-luxury-black resize-none"
                          />
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-luxury-black text-white px-10 py-6 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-luxury-gold transition-all duration-500 flex items-center justify-center gap-4 group shadow-2xl mt-12"
                      >
                        Confirmer la Commande
                        <Send className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </button>
                    </form>
                  </div>

                  {/* Right Column: Mini Summary */}
                  <div className="lg:col-span-5 pt-10 lg:pt-0">
                    <div className="border border-gray-100 p-10 md:p-12 bg-white shadow-sm sticky top-24">
                      <h2 className="text-2xl font-serif mb-10 border-b border-gray-50 pb-6">Résumé</h2>
                      <div className="space-y-6 mb-12 max-h-[300px] overflow-y-auto pr-4 scrollbar-hide">
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center text-xs">
                            <div className="flex flex-col gap-1">
                              <span className="font-bold">{item.name}</span>
                              <span className="text-luxury-black uppercase text-[9px] tracking-widest font-bold">Qté: {item.quantity}</span>
                            </div>
                            <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-10 border-t border-gray-100">
                        <div className="flex justify-between text-sm items-end font-bold">
                          <span className="uppercase tracking-widest text-luxury-black text-[10px] font-bold">Total</span>
                          <span className="text-2xl font-serif text-luxury-gold">{formatPrice(getTotalPrice())}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="recap"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="bg-white border border-gray-100 p-10 md:p-16 shadow-2xl space-y-16">
                    <div>
                      <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-luxury-gold mb-10 border-b border-gray-50 pb-4">
                        Informations de Livraison
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                          <span className="text-[9px] uppercase tracking-widest font-bold text-luxury-black/40">Client</span>
                          <p className="text-lg font-serif">{formData.fullName}</p>
                          <p className="text-sm font-medium">{formData.email}</p>
                          <p className="text-sm font-medium text-luxury-gold">{phone}</p>
                        </div>
                        <div className="space-y-4">
                          <span className="text-[9px] uppercase tracking-widest font-bold text-luxury-black/40">Destination</span>
                          <p className="text-lg font-serif">
                            {isManualAddress ? formData.manualAddress : address?.label}
                          </p>
                          <p className="text-sm font-medium uppercase tracking-widest">{formData.city}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-luxury-gold mb-10 border-b border-gray-50 pb-4">
                        Détails de la Commande
                      </h3>
                      <div className="space-y-6">
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center border-b border-gray-50 pb-4">
                            <div className="flex flex-col gap-1">
                              <span className="font-serif text-lg">{item.name}</span>
                              <span className="text-[9px] uppercase tracking-widest font-bold text-luxury-black/40">Quantité: {item.quantity}</span>
                            </div>
                            <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-10 flex justify-between items-end">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-black">Total à payer à la livraison</span>
                        <span className="text-4xl font-serif text-luxury-gold">{formatPrice(getTotalPrice())}</span>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 pt-10">
                      <button 
                        onClick={() => setIsReviewing(false)}
                        className="flex-1 border border-luxury-black text-luxury-black py-6 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-luxury-gray transition-all"
                      >
                        Modifier mes infos
                      </button>
                      <button 
                        onClick={handleFinalSubmit}
                        disabled={isSubmitting}
                        className="flex-[2] bg-luxury-black text-white py-6 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-luxury-gold transition-all shadow-xl flex items-center justify-center gap-4 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            Validation finale...
                          </>
                        ) : (
                          <>
                            Valider Définitivement
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-luxury-black/90 backdrop-blur-sm"
              onClick={() => router.push('/')}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white max-w-lg w-full p-12 md:p-16 text-center shadow-2xl border border-gray-100"
            >
              <div className="w-20 h-20 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-10">
                <CheckCircle2 className="w-10 h-10 text-luxury-gold" />
              </div>
              <h2 className="text-4xl font-serif mb-6 leading-tight">Commande passée avec succès</h2>
              <p className="text-luxury-black/70 mb-12 text-lg font-medium">
                Merci pour votre confiance. Vous serez livré le plus tôt possible. Notre équipe vous contactera sous peu.
              </p>
              <button 
                onClick={() => router.push('/')}
                className="w-full bg-luxury-black text-white py-5 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-luxury-gold transition-all"
              >
                Fermer
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-phone-input .PhoneInputInput {
          background-color: transparent;
          border: none;
          outline: none;
          color: #121212;
          font-weight: 500;
        }
        .custom-phone-input .PhoneInputCountry {
          gap: 10px;
        }
      `}</style>
    </div>
  );
}
