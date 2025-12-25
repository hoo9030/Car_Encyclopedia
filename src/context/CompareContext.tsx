import { createContext, useContext, useState, ReactNode } from 'react';
import { Car } from '../types/car';

interface CompareContextType {
  compareCars: Car[];
  addToCompare: (car: Car) => void;
  removeFromCompare: (carId: string) => void;
  clearCompare: () => void;
  isInCompare: (carId: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareCars, setCompareCars] = useState<Car[]>([]);

  const addToCompare = (car: Car) => {
    if (compareCars.length < 3 && !compareCars.find(c => c.id === car.id)) {
      setCompareCars(prev => [...prev, car]);
    }
  };

  const removeFromCompare = (carId: string) => {
    setCompareCars(prev => prev.filter(car => car.id !== carId));
  };

  const clearCompare = () => {
    setCompareCars([]);
  };

  const isInCompare = (carId: string) => {
    return compareCars.some(car => car.id === carId);
  };

  return (
    <CompareContext.Provider value={{ compareCars, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
