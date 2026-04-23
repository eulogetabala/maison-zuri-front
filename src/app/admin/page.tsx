'use client';

import { Package, ShoppingCart, TrendingUp, Users, ArrowUpRight, Clock, Plus } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

export default function AdminDashboard() {
  const stats = [
    { name: 'Chiffre d\'Affaires', value: 142850, icon: TrendingUp, trend: '+3.2%', trendUp: true },
    { name: 'Commandes', value: 324, icon: ShoppingCart, trend: 'En hausse', trendUp: true },
    { name: 'Panier Moyen', value: 440.90, icon: Package, trend: '+1.5%', trendUp: true },
    { name: 'Taux de Conversion', value: '3.2%', icon: Users, trend: '-0.4%', trendUp: false },
  ];

  const recentOrders = [
    { id: '#8923', client: 'Marie Lefebvre', product: 'Sac Iconique "Atelier"', amount: 1850, status: 'Payé', date: 'Il y a 12 min' },
    { id: '#8922', client: 'Thomas Dubois', product: 'Bracelet "Aura"', amount: 3200, status: 'Expédié', date: 'Il y a 45 min' },
    { id: '#8921', client: 'Sophie Martin', product: 'Carré de Soie "Héritage"', amount: 480, status: 'Payé', date: 'Il y a 2h' },
  ];

  return (
    <div className="flex flex-col gap-12 p-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif font-bold">Atelier Admin</h1>
          <p className="text-muted-foreground text-sm mt-2 font-light">Vue d&apos;ensemble de la performance • Avril 2026</p>
        </div>
        <button className="bg-luxury-black text-white px-6 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-luxury-gold transition-all flex items-center gap-3">
          <Plus className="w-4 h-4" />
          Nouveau Produit
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white p-8 border border-gray-100 items-start flex flex-col group hover:border-luxury-gold transition-all duration-500">
              <div className="flex items-center justify-between w-full mb-6">
                <div className="p-3 bg-gray-50 group-hover:bg-luxury-gold transition-colors duration-500">
                  <Icon className="w-5 h-5 text-luxury-black group-hover:text-luxury-black" />
                </div>
                <span className={`text-[10px] font-bold tracking-widest flex items-center gap-1 ${stat.trendUp ? 'text-green-600' : 'text-red-500'}`}>
                  {stat.trend}
                  {stat.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <div className="rotate-90"><ArrowUpRight className="w-3 h-3" /></div>}
                </span>
              </div>
              <h3 className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-bold mb-1">{stat.name}</h3>
              <p className="text-4xl font-serif">
                {typeof stat.value === 'number' && stat.name !== 'Commandes' ? formatPrice(stat.value) : stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recent Orders table - 2 cols */}
        <div className="lg:col-span-2 bg-white p-10 border border-gray-100">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-serif">Commandes Récentes</h2>
            <button className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-luxury-black border-b border-gray-100 pb-1">Tout voir</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50 text-[10px] uppercase tracking-widest text-muted-foreground">
                  <th className="pb-4 font-bold">ID</th>
                  <th className="pb-4 font-bold">Client</th>
                  <th className="pb-4 font-bold">Produit</th>
                  <th className="pb-4 font-bold">Montant</th>
                  <th className="pb-4 font-bold">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="group">
                    <td className="py-6 text-sm font-bold">{order.id}</td>
                    <td className="py-6 text-sm text-muted-foreground">{order.client}</td>
                    <td className="py-6 text-sm italic font-serif">{order.product}</td>
                    <td className="py-6 text-sm font-bold">{formatPrice(order.amount)}</td>
                    <td className="py-6">
                      <span className={`px-3 py-1 text-[9px] uppercase tracking-widest font-bold ${order.status === 'Payé' ? 'bg-green-50 text-green-700' : 'bg-luxury-gold/10 text-luxury-gold'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Inventory / Product Ads (1 col) */}
        <div className="bg-luxury-black p-10 text-white">
          <h2 className="text-2xl font-serif mb-8 border-b border-white/10 pb-4">Catalogue Curaté</h2>
          <div className="space-y-8">
            {[1, 4, 8].map((id) => {
              const p = [1, 4, 8].map(i => ({ id: i.toString(), name: 'Sac Iconique', price: 1850, image: `/29.png` }))[0]; // fallback simplified
              return (
                <div key={id} className="flex gap-4 group cursor-pointer">
                  <div className="relative w-20 h-24 flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500">
                    <Image src={`/${id === 1 ? '29.png' : id === 4 ? '12.jpg' : '24.jpg'}`} alt="Product" fill className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] uppercase tracking-widest text-luxury-gold mb-1">Stock: 12</span>
                    <h4 className="text-sm font-serif group-hover:text-luxury-gold transition-colors">Produit Ref. {id}</h4>
                    <div className="flex items-center gap-2 mt-2 text-white/40 text-[10px]">
                      <Clock className="w-3 h-3" />
                      Modifié hier
                    </div>
                  </div>
                </div>
              );
            })}
            <button className="w-full border border-white/20 py-4 text-[10px] uppercase tracking-widest font-bold mt-8 hover:bg-white hover:text-luxury-black transition-all">
              Éditer le Catalogue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
