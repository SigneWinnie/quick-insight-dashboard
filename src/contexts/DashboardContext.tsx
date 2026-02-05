import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { HouseData, parseCSVData, getDateRange, getUniqueZipcodes } from '@/lib/houseData';
import houseDataCSV from '@/data/house-data.csv?raw';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface DashboardContextType {
  allData: HouseData[];
  filteredData: HouseData[];
  isLoading: boolean;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  availableDateRange: { min: Date; max: Date } | null;
  selectedZipcodes: string[];
  setSelectedZipcodes: (zipcodes: string[]) => void;
  availableZipcodes: string[];
  selectedBedrooms: number[];
  setSelectedBedrooms: (bedrooms: number[]) => void;
  resetFilters: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allData, setAllData] = useState<HouseData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
  const [selectedZipcodes, setSelectedZipcodes] = useState<string[]>([]);
  const [selectedBedrooms, setSelectedBedrooms] = useState<number[]>([]);
  
  useEffect(() => {
    const data = parseCSVData(houseDataCSV);
    setAllData(data);
    setIsLoading(false);
  }, []);
  
  const availableDateRange = useMemo(() => {
    if (allData.length === 0) return null;
    return getDateRange(allData);
  }, [allData]);
  
  const availableZipcodes = useMemo(() => {
    return getUniqueZipcodes(allData);
  }, [allData]);
  
  const filteredData = useMemo(() => {
    let result = allData;
    
    if (dateRange.start) {
      result = result.filter(d => d.date >= dateRange.start!);
    }
    if (dateRange.end) {
      result = result.filter(d => d.date <= dateRange.end!);
    }
    if (selectedZipcodes.length > 0) {
      result = result.filter(d => selectedZipcodes.includes(d.zipcode));
    }
    if (selectedBedrooms.length > 0) {
      result = result.filter(d => selectedBedrooms.includes(d.bedrooms));
    }
    
    return result;
  }, [allData, dateRange, selectedZipcodes, selectedBedrooms]);
  
  const resetFilters = () => {
    setDateRange({ start: null, end: null });
    setSelectedZipcodes([]);
    setSelectedBedrooms([]);
  };
  
  return (
    <DashboardContext.Provider
      value={{
        allData,
        filteredData,
        isLoading,
        dateRange,
        setDateRange,
        availableDateRange,
        selectedZipcodes,
        setSelectedZipcodes,
        availableZipcodes,
        selectedBedrooms,
        setSelectedBedrooms,
        resetFilters,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
