// House Data Types and Processing
export interface HouseData {
  id: string;
  date: Date;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft_living: number;
  sqft_lot: number;
  floors: number;
  waterfront: boolean;
  view: number;
  condition: number;
  grade: number;
  sqft_above: number;
  sqft_basement: number;
  yr_built: number;
  yr_renovated: number;
  zipcode: string;
  lat: number;
  long: number;
  sqft_living15: number;
  sqft_lot15: number;
  // Calculated fields
  propertyAge: number;
  priceCategory: string;
  sizeCategory: string;
  pricePerSqft: number;
}

// Parse CSV data
export const parseCSVData = (csvText: string): HouseData[] => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.match(/(".*?"|[^",]+)/g)?.map(v => v.replace(/"/g, '')) || [];
    
    const dateStr = values[1];
    const date = new Date(
      parseInt(dateStr.substring(0, 4)),
      parseInt(dateStr.substring(4, 6)) - 1,
      parseInt(dateStr.substring(6, 8))
    );
    
    const price = parseFloat(values[2]);
    const sqft_living = parseFloat(values[5]);
    const yr_built = parseInt(values[14]);
    const currentYear = 2015; // Dataset is from 2014-2015
    
    const propertyAge = currentYear - yr_built;
    const pricePerSqft = sqft_living > 0 ? price / sqft_living : 0;
    
    let priceCategory: string;
    if (price < 250000) priceCategory = 'Budget';
    else if (price < 500000) priceCategory = 'Mid-Range';
    else if (price < 1000000) priceCategory = 'Premium';
    else priceCategory = 'Luxury';
    
    let sizeCategory: string;
    if (sqft_living < 1000) sizeCategory = 'Small';
    else if (sqft_living < 2000) sizeCategory = 'Medium';
    else if (sqft_living < 3000) sizeCategory = 'Large';
    else sizeCategory = 'Very Large';
    
    return {
      id: values[0],
      date,
      price,
      bedrooms: parseInt(values[3]),
      bathrooms: parseFloat(values[4]),
      sqft_living,
      sqft_lot: parseFloat(values[6]),
      floors: parseFloat(values[7]),
      waterfront: values[8] === '1',
      view: parseInt(values[9]),
      condition: parseInt(values[10]),
      grade: parseInt(values[11]),
      sqft_above: parseFloat(values[12]),
      sqft_basement: parseFloat(values[13]),
      yr_built,
      yr_renovated: parseInt(values[15]),
      zipcode: values[16],
      lat: parseFloat(values[17]),
      long: parseFloat(values[18]),
      sqft_living15: parseFloat(values[19]),
      sqft_lot15: parseFloat(values[20]),
      propertyAge,
      priceCategory,
      sizeCategory,
      pricePerSqft,
    };
  });
};

// Aggregate functions
export const calculateMetrics = (data: HouseData[]) => {
  const totalProperties = data.length;
  const totalValue = data.reduce((sum, d) => sum + d.price, 0);
  const avgPrice = totalValue / totalProperties;
  const avgSqft = data.reduce((sum, d) => sum + d.sqft_living, 0) / totalProperties;
  const avgPricePerSqft = data.reduce((sum, d) => sum + d.pricePerSqft, 0) / totalProperties;
  
  const waterfrontProps = data.filter(d => d.waterfront);
  const avgWaterfrontPrice = waterfrontProps.length > 0 
    ? waterfrontProps.reduce((sum, d) => sum + d.price, 0) / waterfrontProps.length 
    : 0;
  const avgNonWaterfrontPrice = data.filter(d => !d.waterfront).reduce((sum, d) => sum + d.price, 0) / 
    data.filter(d => !d.waterfront).length;
  const waterfrontPremium = avgNonWaterfrontPrice > 0 
    ? ((avgWaterfrontPrice - avgNonWaterfrontPrice) / avgNonWaterfrontPrice) * 100 
    : 0;
  
  return {
    totalProperties,
    totalValue,
    avgPrice,
    avgSqft,
    avgPricePerSqft,
    waterfrontPremium,
  };
};

// Group by functions
export const groupByBedrooms = (data: HouseData[]) => {
  const groups: Record<number, { count: number; avgPrice: number; totalPrice: number }> = {};
  
  data.forEach(d => {
    if (!groups[d.bedrooms]) {
      groups[d.bedrooms] = { count: 0, avgPrice: 0, totalPrice: 0 };
    }
    groups[d.bedrooms].count++;
    groups[d.bedrooms].totalPrice += d.price;
  });
  
  return Object.entries(groups)
    .map(([bedrooms, stats]) => ({
      bedrooms: parseInt(bedrooms),
      count: stats.count,
      avgPrice: stats.totalPrice / stats.count,
    }))
    .sort((a, b) => a.bedrooms - b.bedrooms);
};

export const groupByPriceCategory = (data: HouseData[]) => {
  const groups: Record<string, number> = {};
  const order = ['Budget', 'Mid-Range', 'Premium', 'Luxury'];
  
  data.forEach(d => {
    groups[d.priceCategory] = (groups[d.priceCategory] || 0) + 1;
  });
  
  return order.map(category => ({
    category,
    count: groups[category] || 0,
    percentage: ((groups[category] || 0) / data.length) * 100,
  }));
};

export const groupByCondition = (data: HouseData[]) => {
  const groups: Record<number, { count: number; avgPrice: number; totalPrice: number }> = {};
  
  data.forEach(d => {
    if (!groups[d.condition]) {
      groups[d.condition] = { count: 0, avgPrice: 0, totalPrice: 0 };
    }
    groups[d.condition].count++;
    groups[d.condition].totalPrice += d.price;
  });
  
  const conditionLabels: Record<number, string> = {
    1: 'Poor',
    2: 'Fair',
    3: 'Average',
    4: 'Good',
    5: 'Excellent'
  };
  
  return Object.entries(groups)
    .map(([condition, stats]) => ({
      condition: parseInt(condition),
      label: conditionLabels[parseInt(condition)] || `Condition ${condition}`,
      count: stats.count,
      avgPrice: stats.totalPrice / stats.count,
    }))
    .sort((a, b) => a.condition - b.condition);
};

export const groupByGrade = (data: HouseData[]) => {
  const groups: Record<number, { count: number; avgPrice: number; totalPrice: number }> = {};
  
  data.forEach(d => {
    if (!groups[d.grade]) {
      groups[d.grade] = { count: 0, avgPrice: 0, totalPrice: 0 };
    }
    groups[d.grade].count++;
    groups[d.grade].totalPrice += d.price;
  });
  
  return Object.entries(groups)
    .map(([grade, stats]) => ({
      grade: parseInt(grade),
      count: stats.count,
      avgPrice: stats.totalPrice / stats.count,
    }))
    .sort((a, b) => a.grade - b.grade);
};

export const groupByMonth = (data: HouseData[]) => {
  const groups: Record<string, { count: number; avgPrice: number; totalPrice: number }> = {};
  
  data.forEach(d => {
    const monthKey = `${d.date.getFullYear()}-${String(d.date.getMonth() + 1).padStart(2, '0')}`;
    if (!groups[monthKey]) {
      groups[monthKey] = { count: 0, avgPrice: 0, totalPrice: 0 };
    }
    groups[monthKey].count++;
    groups[monthKey].totalPrice += d.price;
  });
  
  return Object.entries(groups)
    .map(([month, stats]) => ({
      month,
      count: stats.count,
      avgPrice: stats.totalPrice / stats.count,
      totalValue: stats.totalPrice,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
};

export const groupByZipcode = (data: HouseData[]) => {
  const groups: Record<string, { count: number; avgPrice: number; totalPrice: number; avgLat: number; avgLong: number; totalLat: number; totalLong: number }> = {};
  
  data.forEach(d => {
    if (!groups[d.zipcode]) {
      groups[d.zipcode] = { count: 0, avgPrice: 0, totalPrice: 0, avgLat: 0, avgLong: 0, totalLat: 0, totalLong: 0 };
    }
    groups[d.zipcode].count++;
    groups[d.zipcode].totalPrice += d.price;
    groups[d.zipcode].totalLat += d.lat;
    groups[d.zipcode].totalLong += d.long;
  });
  
  return Object.entries(groups)
    .map(([zipcode, stats]) => ({
      zipcode,
      count: stats.count,
      avgPrice: stats.totalPrice / stats.count,
      totalValue: stats.totalPrice,
      lat: stats.totalLat / stats.count,
      long: stats.totalLong / stats.count,
    }))
    .sort((a, b) => b.avgPrice - a.avgPrice);
};

export const getUniqueZipcodes = (data: HouseData[]): string[] => {
  return [...new Set(data.map(d => d.zipcode))].sort();
};

export const getDateRange = (data: HouseData[]): { min: Date; max: Date } => {
  const dates = data.map(d => d.date.getTime());
  return {
    min: new Date(Math.min(...dates)),
    max: new Date(Math.max(...dates)),
  };
};

export const getPriceVsSqft = (data: HouseData[]) => {
  // Sample data for scatter plot (limit to 500 points for performance)
  return data.slice(0, 500).map(d => ({
    sqft: d.sqft_living,
    price: d.price,
    bedrooms: d.bedrooms,
    waterfront: d.waterfront,
  }));
};
