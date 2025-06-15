import React, { useState, useEffect } from 'react';
import {
  Package,
  LayoutDashboard,
  Users,
  ShoppingCart,
  ChevronLeft,
  LogOut,
  Menu,
  BadgeIndianRupee,
  CreditCard,
  MessageCircleWarning,
  Truck,
  Bell,
  Settings,
  User,
  Tag
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { NavItem, SidebarProps } from '@/lib/types';
import Link from 'next/link';




export default function Sidebar({ defaultCollapsed = false }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const syncCollapse = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    syncCollapse();
    window.addEventListener('resize', syncCollapse);
    return () => window.removeEventListener('resize', syncCollapse);
  }, []);

  const navItems: NavItem[] = [
    { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />},
    { href: '/customers', label: 'Customers', icon: <Users className="h-5 w-5" /> },
    { href: '/marketing', label: 'Marketing', icon: <BadgeIndianRupee className="h-5 w-5" /> },
    { href: '/products', label: 'Products', icon: <Package className="h-5 w-5" /> },
    { href: '/orders', label: 'Orders', icon: <ShoppingCart className="h-5 w-5" /> },
    { href: '/payments', label: 'Payments', icon: <CreditCard className="h-5 w-5" /> },
    { href: '/reports', label: 'Reports', icon: <MessageCircleWarning className="h-5 w-5" /> },
    { href: '/shipments', label: 'Shipments', icon: <Truck className="h-5 w-5" /> },
    { href: '/coupons', label: 'Coupons', icon: <Tag className="h-5 w-5" /> },
  ];

  const secondaryItems: NavItem[] = [
    { href: '/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
    { href: '/notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" />},
    { href: '/profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 md:hidden bg-gradient-to-br from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white p-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative top-0 left-0 z-50 h-screen flex flex-col
          bg-gradient-to-br from-slate-50 via-white to-slate-100
          dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
          border-r border-slate-200/60 dark:border-slate-700/60
          backdrop-blur-xl
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-20' : 'w-72'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          shadow-2xl md:shadow-lg
        `}
      >
        {/* Header with glassmorphism effect */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 backdrop-blur-sm" />
          <header className={`
            relative flex items-center h-20 px-6 border-b border-slate-200/60 dark:border-slate-700/60
            ${collapsed ? 'justify-center px-4' : 'justify-between'}
          `}>
            {!collapsed && (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 shadow-lg">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                    Admin
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">Dashboard Pro</span>
                </div>
              </div>
            )}

            {collapsed && (
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 shadow-lg">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border border-white animate-pulse" />
              </div>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className={`
                hidden md:flex items-center justify-center w-8 h-8 rounded-lg
                bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700
                border border-slate-200 dark:border-slate-600
                transition-all duration-200 hover:scale-105 hover:shadow-md
                ${collapsed ? 'rotate-180' : ''}
              `}
            >
              <ChevronLeft className="h-4 w-4 text-slate-600 dark:text-slate-300" />
            </button>
          </header>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-hide">
          {/* Main Navigation */}
          <div className="space-y-2">
            {!collapsed && (
              <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                Main Menu
              </h3>
            )}
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                {...item}
                isActive={pathname === item.href}
                isCollapsed={collapsed}
                onHover={setHoveredItem}
                isHovered={hoveredItem === item.href}
              />
            ))}
          </div>

          {/* Secondary Navigation */}
          <div className="space-y-2">
            {!collapsed && (
              <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                Account
              </h3>
            )}
            {secondaryItems.map((item) => (
              <NavLink
                key={item.href}
                {...item}
                isActive={pathname === item.href ? true : false}
                isCollapsed={collapsed}
                onHover={setHoveredItem}
                isHovered={hoveredItem === item.href}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200/60 dark:border-slate-700/60">
          <button
            className={`
              w-full flex items-center gap-3 px-3 py-3 rounded-xl
              text-slate-600 dark:text-slate-300
              hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400
              transition-all duration-200 group
              ${collapsed ? 'justify-center' : ''}
            `}
          >
            <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            {!collapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}

interface NavLinkProps extends NavItem {
  isActive: boolean;
  isCollapsed: boolean;
  onHover: (href: string | null) => void;
  isHovered: boolean;
}

function NavLink({ 
  href, 
  label, 
  icon, 
  isActive, 
  isCollapsed, 
  onHover, 
  isHovered 
}: NavLinkProps) {
  return (
    <div className="relative group">
      <Link
        href={href}
        onMouseEnter={() => onHover(href)}
        onMouseLeave={() => onHover(null)}
        className={`
          relative flex items-center gap-3 px-3 py-3 rounded-xl font-medium
          transition-all duration-200 group
          ${isCollapsed ? 'justify-center' : ''}
          ${isActive
            ? 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-700 dark:text-violet-300 shadow-md border border-violet-200/50 dark:border-violet-700/50'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'
          }
        `}
      >
        {/* Active indicator */}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-violet-500 to-purple-600 rounded-r-full" />
        )}

        {/* Icon with animation */}
        <div className={`
          flex items-center justify-center transition-transform duration-200
          ${isHovered ? 'scale-110' : ''}
          ${isActive ? 'text-violet-600 dark:text-violet-400' : ''}
        `}>
          {icon}
        </div>

        {/* Label */}
        {!isCollapsed && (
          <span className="flex-1 truncate">{label}</span>
        )}
      </Link>

      {/* Tooltip for collapsed state */}
      {isCollapsed && isHovered && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50">
          <div className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-3 py-2 rounded-lg text-sm font-medium shadow-xl whitespace-nowrap">
            {label}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-slate-900 dark:border-r-slate-100" />
          </div>
        </div>
      )}
    </div>
  );
}