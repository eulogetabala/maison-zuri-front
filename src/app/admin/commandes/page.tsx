'use client';

import { formatPrice } from '@/lib/utils';
import { Eye, CheckCircle, Clock, XCircle, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminCommandes() {
  const orders = [
    { id: 'ORD-2024-001', customer: 'Jean Dupont', date: '21/04/2026', total: 1250, status: 'attente', items: 1 },
    { id: 'ORD-2024-002', customer: 'Marie Claire', date: '20/04/2026', total: 3400, status: 'confirmee', items: 3 },
    { id: 'ORD-2024-003', customer: 'Pierre Martin', date: '19/04/2026', total: 890, status: 'livree', items: 1 },
    { id: 'ORD-2024-004', customer: 'Sophie Lefebvre', date: '18/04/2026', total: 2100, status: 'annulee', items: 2 },
  ];

  const statusMap = {
    attente: { label: 'En attente', color: 'bg-yellow-50 text-yellow-700', icon: Clock },
    confirmee: { label: 'Confirmée', color: 'bg-blue-50 text-blue-700', icon: CheckCircle },
    livree: { label: 'Livrée', color: 'bg-green-50 text-green-700', icon: Truck },
    annulee: { label: 'Annulée', color: 'bg-red-50 text-red-700', icon: XCircle },
  };

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-serif font-bold">Commandes</h1>
        <p className="text-gray-500 mt-1">Suivez et gérez les commandes clients.</p>
      </header>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] uppercase tracking-widest font-bold text-gray-500 border-b border-gray-100">
                <th className="px-6 py-4">ID Commande</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => {
                const status = statusMap[order.status as keyof typeof statusMap];
                const StatusIcon = status.icon;
                
                return (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold font-mono text-gray-900">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{order.customer}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">{order.items} article(s)</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-[10px] px-3 py-1 rounded-full font-bold uppercase flex items-center gap-1 w-fit",
                        status.color
                      )}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold uppercase border border-gray-100 rounded hover:bg-gray-50 transition-colors">
                          <Eye className="w-3 h-3" />
                          Détails
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
