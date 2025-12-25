export interface CarDimensions {
  length: number;
  width: number;
  height: number;
  wheelbase: number;
  groundClearance?: number;  // 최저지상고
  curbWeight?: number;       // 공차중량 (kg)
  trunkCapacity?: number;    // 트렁크 용량 (L)
  fuelTankCapacity?: number; // 연료탱크 용량 (L)
}

export interface EngineSpecs {
  type: string;              // 엔진 타입
  displacement?: number;     // 배기량 (cc)
  cylinders?: number;        // 실린더 수
  valves?: number;           // 밸브 수
  compressionRatio?: string; // 압축비
  bore?: number;             // 보어 (mm)
  stroke?: number;           // 스트로크 (mm)
}

export interface PerformanceSpecs {
  acceleration?: number;     // 0-100km/h (초)
  topSpeed?: number;         // 최고속도 (km/h)
  combinedFuelEconomy?: string;  // 복합연비
  cityFuelEconomy?: string;      // 도심연비
  highwayFuelEconomy?: string;   // 고속연비
}

export interface ElectricSpecs {
  batteryCapacity?: number;      // 배터리 용량 (kWh)
  range?: number;                // 1회 충전 주행거리 (km)
  fastChargingTime?: string;     // 급속 충전 시간
  normalChargingTime?: string;   // 완속 충전 시간
  motorType?: string;            // 모터 종류
}

export interface SuspensionSpecs {
  front?: string;   // 전륜 서스펜션
  rear?: string;    // 후륜 서스펜션
}

export interface BrakeSpecs {
  front?: string;       // 전륜 브레이크
  rear?: string;        // 후륜 브레이크
  frontDiscSize?: number;  // 전륜 디스크 크기 (mm)
  rearDiscSize?: number;   // 후륜 디스크 크기 (mm)
}

export interface TireSpecs {
  front?: string;   // 전륜 타이어 규격
  rear?: string;    // 후륜 타이어 규격
  wheelSize?: string;  // 휠 사이즈
}

export interface SafetySpecs {
  airbags?: number;        // 에어백 개수
  adasFeatures?: string[]; // ADAS 기능 목록
}

export interface ComfortSpecs {
  seats?: number;          // 좌석 수
  seatMaterial?: string;   // 시트 재질
  sunroof?: string;        // 썬루프 종류
}

export interface CarSpecs {
  // 기본 파워트레인
  engine: string;
  horsepower: number;
  torque: number;
  transmission: string;
  drivetrain: string;
  fuelEfficiency: string;
  dimensions: CarDimensions;

  // 상세 스펙 (선택)
  engineDetails?: EngineSpecs;
  performance?: PerformanceSpecs;
  electric?: ElectricSpecs;
  suspension?: SuspensionSpecs;
  brakes?: BrakeSpecs;
  tires?: TireSpecs;
  safety?: SafetySpecs;
  comfort?: ComfortSpecs;
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
