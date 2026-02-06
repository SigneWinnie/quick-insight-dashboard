import { Calendar, MapPin, Bed, RotateCcw } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const pageLabels: Record<string, string> = {
  overview: 'Overview',
  'price-trends': 'Price Trends',
  location: 'Location Analysis',
  details: 'Property Details',
};

const DashboardHeader = ({ currentPage }: DashboardHeaderProps) => {
  const {
    filteredData,
    allData,
    dateRange,
    setDateRange,
    selectedZipcodes,
    setSelectedZipcodes,
    availableZipcodes,
    selectedBedrooms,
    setSelectedBedrooms,
    resetFilters,
  } = useDashboard();

  const handleYearChange = (year: string) => {
    if (year === 'all') {
      setDateRange({ start: null, end: null });
    } else {
      const yearNum = parseInt(year);
      setDateRange({ start: new Date(yearNum, 0, 1), end: new Date(yearNum, 11, 31) });
    }
  };

  const handleZipcodeChange = (zipcode: string) => {
    setSelectedZipcodes(zipcode === 'all' ? [] : [zipcode]);
  };

  const handleBedroomsChange = (bedrooms: string) => {
    setSelectedBedrooms(bedrooms === 'all' ? [] : [parseInt(bedrooms)]);
  };

  const currentYear = dateRange.start ? dateRange.start.getFullYear().toString() : 'all';
  const currentZipcode = selectedZipcodes.length === 1 ? selectedZipcodes[0] : 'all';
  const currentBedrooms = selectedBedrooms.length === 1 ? selectedBedrooms[0].toString() : 'all';

  return (
    <header className="border-b border-border/50 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Page Title */}
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Real Estate Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            {pageLabels[currentPage] || 'Overview'} • {filteredData.length.toLocaleString()} of {allData.length.toLocaleString()} properties
          </p>
        </div>
        
        {/* Inline Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            <Select value={currentYear} onValueChange={handleYearChange}>
              <SelectTrigger className="w-[100px] h-8 text-xs bg-muted border-border">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2014">2014</SelectItem>
                <SelectItem value="2015">2015</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <Select value={currentZipcode} onValueChange={handleZipcodeChange}>
              <SelectTrigger className="w-[110px] h-8 text-xs bg-muted border-border">
                <SelectValue placeholder="Zipcode" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                <SelectItem value="all">All Zips</SelectItem>
                {availableZipcodes.slice(0, 20).map((zip) => (
                  <SelectItem key={zip} value={zip}>{zip}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1.5">
            <Bed className="h-3.5 w-3.5 text-primary" />
            <Select value={currentBedrooms} onValueChange={handleBedroomsChange}>
              <SelectTrigger className="w-[100px] h-8 text-xs bg-muted border-border">
                <SelectValue placeholder="Beds" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Beds</SelectItem>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>{num} Bed{num > 1 ? 's' : ''}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2 text-muted-foreground hover:text-foreground">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
