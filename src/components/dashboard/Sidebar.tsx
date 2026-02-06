import { Home, TrendingUp, MapPin, Table2 } from "lucide-react";
import logo from '@/assets/real-estate-logo.png';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'overview', icon: Home, label: 'Overview' },
  { id: 'price-trends', icon: TrendingUp, label: 'Trends' },
  { id: 'location', icon: MapPin, label: 'Location' },
  { id: 'details', icon: Table2, label: 'Details' },
];

const Sidebar = ({ currentPage, onNavigate }: SidebarProps) => {
  return (
    <aside className="w-16 md:w-20 bg-sidebar flex flex-col items-center py-5 border-r border-sidebar-border shrink-0">
      {/* Logo */}
      <div className="mb-8">
        <img src={logo} alt="Logo" className="h-10 w-10 object-contain rounded-lg" />
      </div>
      
      {/* Nav Icons */}
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={item.label}
              className={`p-3 rounded-xl transition-all duration-200 group relative ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon className="h-5 w-5" />
              {/* Tooltip */}
              <span className="absolute left-full ml-3 px-2 py-1 rounded-md bg-popover text-popover-foreground text-xs font-medium opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
