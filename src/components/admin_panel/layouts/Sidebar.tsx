import { useLocation } from "wouter";
import { Link } from "wouter";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Users,
  BarChart2,
  Dice5,
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCw,
  Trophy,
  UsersRound,
  Sun,
  Moon,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  const navItems = [
    {
      heading: "Main",
      items: [
        { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5 mr-3" /> },
        { href: "/users", label: "User Management", icon: <Users className="w-5 h-5 mr-3" /> },
        { href: "/game-statistics", label: "Game Statistics", icon: <BarChart2 className="w-5 h-5 mr-3" /> },
        { href: "/bets", label: "Bet Management", icon: <Dice5 className="w-5 h-5 mr-3" /> },
      ]
    },
    {
      heading: "Transactions",
      items: [
        { href: "/deposits", label: "Deposit Requests", icon: <ArrowDownCircle className="w-5 h-5 mr-3" /> },
        { href: "/withdrawals", label: "Withdrawal Requests", icon: <ArrowUpCircle className="w-5 h-5 mr-3" /> },
        { href: "/transactions", label: "Transaction History", icon: <RefreshCw className="w-5 h-5 mr-3" /> },
      ]
    },
    {
      heading: "Operations",
      items: [
        { href: "/results", label: "Result Declaration", icon: <Trophy className="w-5 h-5 mr-3" /> },
        { href: "/referrals", label: "Referral System", icon: <UsersRound className="w-5 h-5 mr-3" /> },
      ]
    }
  ];

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 md:relative md:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-5 border-b dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Dice5 className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Satta Admin</h1>
        </div>
        <button 
          onClick={() => setOpen(false)} 
          className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <span className="sr-only">Close sidebar</span>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <ScrollArea className="h-[calc(100%-10rem)]">
        <nav className="px-2 py-3">
          {navItems.map((section, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                {section.heading}
              </h3>
              <div className="mt-2 space-y-1">
                {section.items.map((item, itemIdx) => {
                  const isActive = location === item.href;
                  return (
                    <Link 
                      key={itemIdx} 
                      href={item.href}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        isActive 
                          ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-100' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>
      
      <div className="absolute bottom-0 w-full border-t border-gray-200 dark:border-gray-700 p-4 space-y-2">
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            <>
              <Sun className="h-4 w-4 mr-2" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="h-4 w-4 mr-2" />
              <span>Dark Mode</span>
            </>
          )}
        </Button>
        
        <Button
          variant="outline"
          className="w-full justify-between text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-400 border-red-200 dark:border-red-800"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
}
