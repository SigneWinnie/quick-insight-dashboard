import logo from '@/assets/real-estate-logo.png';

interface DashboardHeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const pages = [
  { id: 'overview', label: 'Overview' },
  { id: 'price-trends', label: 'Price Trends' },
  { id: 'location', label: 'Location Analysis' },
  { id: 'details', label: 'Property Details' },
];

const DashboardHeader = ({ currentPage, onNavigate }: DashboardHeaderProps) => {
  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <img 
            src={logo} 
            alt="Real Estate Analytics" 
            className="h-14 object-contain"
          />
          <h1 className="text-xl md:text-2xl font-bold text-center flex-1 px-4">
            Real Estate Analytics Dashboard
          </h1>
          <div className="w-14" />
        </div>
        
        {/* Navigation Tabs */}
        <nav className="flex gap-1 bg-primary-foreground/10 rounded-lg p-1">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => onNavigate(page.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                currentPage === page.id
                  ? 'bg-primary-foreground text-primary shadow-sm'
                  : 'hover:bg-primary-foreground/20'
              }`}
            >
              {page.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default DashboardHeader;
