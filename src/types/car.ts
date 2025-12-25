export interface CarDimensions {
  length: number;
  width: number;
  height: number;
  wheelbase: number;
  groundClearance?: number;  // 최저지상고
  curbWeight?: number;       // 공차중량 (kg)
  trunkCapacity?: number;    // 트렁크 용량 (L)
  fuelTankCapacity?: number; // 연료탱크 용량 (L)
  frontOverhang?: number;    // 전면 오버행 (mm)
  rearOverhang?: number;     // 후면 오버행 (mm)
  dragCoefficient?: number;  // 공기저항계수 (Cd)
  turningRadius?: number;    // 회전반경 (m)
}

export interface EngineSpecs {
  type: string;              // 엔진 타입
  displacement?: number;     // 배기량 (cc)
  cylinders?: number;        // 실린더 수
  valves?: number;           // 밸브 수
  compressionRatio?: string; // 압축비
  bore?: number;             // 보어 (mm)
  stroke?: number;           // 스트로크 (mm)
  maxPowerRpm?: number;      // 최대출력 rpm
  maxTorqueRpm?: number;     // 최대토크 rpm
  fuelInjection?: string;    // 연료분사방식 (MPI, GDI, 듀얼 등)
  turbocharger?: string;     // 과급기 종류 (싱글터보, 트윈터보, 슈퍼차저 등)
}

export interface PerformanceSpecs {
  acceleration?: number;     // 0-100km/h (초)
  topSpeed?: number;         // 최고속도 (km/h)
  combinedFuelEconomy?: string;  // 복합연비
  cityFuelEconomy?: string;      // 도심연비
  highwayFuelEconomy?: string;   // 고속연비
  brakingDistance?: number;      // 제동거리 100-0 (m)
  quarterMile?: number;          // 1/4마일 시간 (초)
}

export interface ElectricSpecs {
  batteryCapacity?: number;      // 배터리 용량 (kWh)
  range?: number;                // 1회 충전 주행거리 (km)
  fastChargingTime?: string;     // 급속 충전 시간
  normalChargingTime?: string;   // 완속 충전 시간
  motorType?: string;            // 모터 종류
  motorPowerKw?: number;         // 모터 출력 (kW)
  motorTorque?: number;          // 모터 토크 (Nm)
  regenBrakingLevels?: number;   // 회생제동 단계 수
  v2l?: boolean;                 // V2L (외부전력공급) 지원
  batteryWarranty?: string;      // 배터리 보증 기간
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
  ncapRating?: number;     // 충돌테스트 등급 (별점, 1-5)
  ncapYear?: number;       // 충돌테스트 연도
  ncapOrg?: string;        // 테스트 기관 (KNCAP, Euro NCAP, IIHS 등)
}

export interface ComfortSpecs {
  seats?: number;          // 좌석 수
  seatMaterial?: string;   // 시트 재질
  sunroof?: string;        // 썬루프 종류
  doors?: number;          // 도어 수
  secondRowLegroom?: number;   // 2열 레그룸 (mm)
  secondRowHeadroom?: number;  // 2열 헤드룸 (mm)
  frontLegroom?: number;       // 1열 레그룸 (mm)
  frontHeadroom?: number;      // 1열 헤드룸 (mm)
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


// 글로벌 정보
export interface GlobalInfo {
  exportName?: string;        // 수출명
  salesCountries?: string[];  // 판매 국가
  productionPlant?: string;   // 생산 공장
}

// 미디어 등장 정보
export interface MediaAppearance {
  type: 'drama' | 'movie' | 'advertisement' | 'musicVideo' | 'game' | 'other';
  title: string;              // 작품명
  year?: number;              // 연도
  description?: string;       // 설명 (어떤 장면, 누가 탔는지 등)
  notable?: boolean;          // 주목할 만한 등장인지
}


// 튜닝/애프터마켓 정보
export interface AftermarketInfo {
  popularMods?: {
    category: string;              // 카테고리 (외관, 성능, 실내 등)
    items: string[];               // 인기 튜닝 항목
  }[];
  tuningBrands?: string[];         // 관련 튜닝 브랜드
  performanceUpgrades?: {
    name: string;
    effect: string;
    priceRange: string;
  }[];
  communitySize?: string;          // 동호회/커뮤니티 규모
  modFriendly?: boolean;           // 튜닝 용이성
}

// 비교 정보 (경쟁 모델과의 비교)
export interface ComparisonInfo {
  mainCompetitors?: {
    model: string;
    advantage: string;             // 그랜저 대비 장점
    disadvantage: string;          // 그랜저 대비 단점
  }[];
  marketPosition?: string;         // 시장 포지션
  uniqueSellingPoints?: string[];  // 차별화 포인트
}

// 특별판/한정판 정보
export interface SpecialEdition {
  name: string;                    // 에디션명
  year: number;                    // 출시 연도
  limitedUnits?: number;           // 한정 수량
  specialFeatures: string[];       // 특별 사양
  price?: string;                  // 가격
  available?: boolean;             // 현재 구매 가능 여부
}


// ============================================
// 모델 시리즈 (브랜드/모델 라인 공통 정보)
// ============================================
export interface ModelSeries {
  id: string;                       // 시리즈 ID (예: "grandeur", "sonata")
  manufacturer: string;             // 제조사
  modelName: string;                // 모델명 (예: "그랜저", "소나타")
  category: string;                 // 차종

  // 브랜드/모델 라인 공통 정보
  overview: string;                 // 모델 개요
  history: string;                  // 전체 역사 (모든 세대 포함)
  designPhilosophy?: string;        // 디자인 철학
  targetAudience?: string;          // 타겟 고객층

  // 세대별 정보 (전체 세대)
  generations: GenerationInfo[];    // 모든 세대 정보

  // 브랜드 차원의 정보
  awards?: string[];                // 수상 이력 (전체)
  trivia?: string[];                // 흥미로운 사실들
  media?: MediaAppearance[];        // 미디어 등장 (전체)

  // 글로벌/시장 정보
  global?: GlobalInfo;              // 글로벌 정보
  comparison?: ComparisonInfo;      // 경쟁 모델 비교

  // 커뮤니티/애프터마켓
  aftermarket?: AftermarketInfo;    // 튜닝/애프터마켓 정보

  // 특별판 (전 세대 걸쳐)
  specialEditions?: SpecialEdition[];

  // 이미지
  heroImage?: string;               // 대표 이미지
}

// ============================================
// 개별 차량 (특정 연도/트림의 구체적 정보)
// ============================================
export interface CarModelInfo {
  introduction: string;             // 주요 특징을 포함한 상세 소개글
}

export interface Car {
  id: string;
  manufacturer: string;
  model: string;
  year: number;
  variant?: string;                 // 트림/파워트레인 (예: "2.5 가솔린", "하이브리드")
  category: string;
  specs: CarSpecs;
  modelInfo: CarModelInfo;          // 해당 차량 특정 정보
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
