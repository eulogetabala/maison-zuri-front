'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { name: 'Tableau de bord', href: '/admin', icon: LayoutDashboard },
    { name: 'Gestion Produits', href: '/admin/produits', icon: Package },
    { name: 'Gestion Commandes', href: '/admin/commandes', icon: ShoppingCart },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-8 border-b border-gray-100">
          <Link href="/" className="text-xl font-serif font-bold tracking-tighter">MAISON ZURI ADMIN</Link>
        </div>
        <nav className="flex-grow py-8 px-4 flex flex-col gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  pathname === link.href 
                    ? "bg-luxury-black text-white" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-8 border-t border-gray-100">
          <Link href="/" className="flex items-center gap-2 text-xs text-gray-400 hover:text-luxury-black transition-colors">
            <LogOut className="w-3 h-3" />
            Retour au site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
