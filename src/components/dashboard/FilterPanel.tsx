import { useDashboard } from '@/contexts/DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Bed, RotateCcw } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterPanel = () => {
  const {
    filteredData,
    allData,
    dateRange,
    setDateRange,
    availableDateRange,
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
      setDateRange({
        start: new Date(yearNum, 0, 1),
        end: new Date(yearNum, 11, 31),
      });
    }
  };
  
  const handleZipcodeChange = (zipcode: string) => {
    if (zipcode === 'all') {
      setSelectedZipcodes([]);
    } else {
      setSelectedZipcodes([zipcode]);
    }
  };
  
  const handleBedroomsChange = (bedrooms: string) => {
    if (bedrooms === 'all') {
      setSelectedBedrooms([]);
    } else {
      setSelectedBedrooms([parseInt(bedrooms)]);
    }
  };
  
  const currentYear = dateRange.start ? dateRange.start.getFullYear().toString() : 'all';
  const currentZipcode = selectedZipcodes.length === 1 ? selectedZipcodes[0] : 'all';
  const currentBedrooms = selectedBedrooms.length === 1 ? selectedBedrooms[0].toString() : 'all';
  
  return (
    <Card className="border-primary/20 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center justify-between">
          <span>Filters</span>
          <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2">
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {/* Year Filter */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <Select value={currentYear} onValueChange={handleYearChange}>
              <SelectTrigger className="w-[120px] h-9">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2014">2014</SelectItem>
                <SelectItem value="2015">2015</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Zipcode Filter */}
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <Select value={currentZipcode} onValueChange={handleZipcodeChange}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Zipcode" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                <SelectItem value="all">All Zipcodes</SelectItem>
                {availableZipcodes.slice(0, 20).map((zip) => (
                  <SelectItem key={zip} value={zip}>{zip}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Bedrooms Filter */}
          <div className="flex items-center gap-2">
            <Bed className="h-4 w-4 text-primary" />
            <Select value={currentBedrooms} onValueChange={handleBedroomsChange}>
              <SelectTrigger className="w-[130px] h-9">
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bedrooms</SelectItem>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>{num} Bedroom{num > 1 ? 's' : ''}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Results Count */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredData.length.toLocaleString()}</span> of {allData.length.toLocaleString()} properties
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
