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

// 세대별 상세 정보
export interface GenerationInfo {
  generation: number;         // 세대 번호
  codeName: string;           // 코드명 (예: "GN7")
  productionYears: string;    // 생산 기간 (예: "2022~현재")
  description: string;        // 해당 세대 설명
  keyChanges?: string[];      // 주요 변화점
  salesVolume?: string;       // 판매량 (선택)
}

// 트림/옵션 정보
export interface TrimInfo {
  name: string;               // 트림명
  price: string;              // 가격
  keyFeatures: string[];      // 주요 특징
}

// 색상 옵션
export interface ColorOption {
  name: string;               // 색상명
  code?: string;              // 색상 코드
  type: 'exterior' | 'interior';  // 외장/내장
  isPopular?: boolean;        // 인기 색상 여부
}

// 기술/편의사양 상세
export interface TechnologyInfo {
  infotainment?: {
    screenSize?: string;      // 화면 크기
    system?: string;          // 시스템명
    features?: string[];      // 기능 목록
  };
  connectivity?: string[];    // 커넥티드 기능
  soundSystem?: {
    brand?: string;           // 오디오 브랜드
    speakers?: number;        // 스피커 수
    power?: string;           // 출력
  };
  drivingModes?: string[];    // 주행 모드
  convenience?: string[];     // 편의 기능 목록
}

// 유지비 정보
export interface OwnershipCost {
  annualTax?: string;         // 자동차세
  insuranceEstimate?: string; // 보험료 예상
  maintenanceCycle?: {        // 소모품 교체 주기
    engineOil?: string;
    brakeFluid?: string;
    tires?: string;
    battery?: string;
  };
  fuelCostEstimate?: string;  // 월 예상 연료비
}

// 글로벌 정보
export interface GlobalInfo {
  exportName?: string;        // 수출명
  salesCountries?: string[];  // 판매 국가
  productionPlant?: string;   // 생산 공장
}

export interface ModelIntroduction {
  overview: string;           // 모델 개요 (간단한 소개)
  history: string;            // 개발 역사 및 세대 변화
  designPhilosophy?: string;  // 디자인 철학
  targetAudience?: string;    // 타겟 고객층
  competitorModels?: string[]; // 경쟁 모델
  highlights?: string[];      // 주요 특징/하이라이트
  awards?: string[];          // 수상 이력
  trivia?: string[];          // 알고 계셨나요? (흥미로운 사실)

  // 확장 정보
  generations?: GenerationInfo[];  // 세대별 상세 정보
  trims?: TrimInfo[];              // 트림/옵션 정보
  colors?: ColorOption[];          // 색상 옵션
  technology?: TechnologyInfo;     // 기술/편의사양 상세
  ownership?: OwnershipCost;       // 유지비 정보
  global?: GlobalInfo;             // 글로벌 정보
}

export interface Car {
  id: string;
  manufacturer: string;
  model: string;
  year: number;
  variant?: string;  // 트림/파워트레인 (예: "2.5 가솔린", "하이브리드")
  category: string;
  specs: CarSpecs;
  introduction: ModelIntroduction;  // 상세 모델 소개
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
