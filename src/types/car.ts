export interface CarDimensions {
  length: number;
  width: number;
  height: number;
  wheelbase: number;
}

export interface CarSpecs {
  engine: string;
  horsepower: number;
  torque: number;
  transmission: string;
  drivetrain: string;
  fuelEfficiency: string;
  dimensions: CarDimensions;
}

export interface Car {
  id: string;
  manufacturer: string;
  model: string;
  year: number;
  variant?: string;  // 트림/파워트레인 (예: "2.5 가솔린", "하이브리드")
  category: string;
  specs: CarSpecs;
  history: string;
  trivia: string[];
  image: string;
  price: string;
}

export type CarCategory = '세단' | 'SUV' | '스포츠카' | '전기차' | '하이브리드' | '트럭' | '왜건';

export interface FilterOptions {
  manufacturer: string;
  category: string;
  minYear: number;
  maxYear: number;
  searchQuery: string;
}
