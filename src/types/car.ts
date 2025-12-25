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

// 미디어 등장 정보
export interface MediaAppearance {
  type: 'drama' | 'movie' | 'advertisement' | 'musicVideo' | 'game' | 'other';
  title: string;              // 작품명
  year?: number;              // 연도
  description?: string;       // 설명 (어떤 장면, 누가 탔는지 등)
  notable?: boolean;          // 주목할 만한 등장인지
}

// 리콜 정보
export interface RecallInfo {
  date: string;               // 리콜 일자
  reason: string;             // 리콜 사유
  affectedUnits?: string;     // 영향받은 대수
  remedy: string;             // 조치 내용
  severity: 'low' | 'medium' | 'high' | 'critical';  // 심각도
}

// 사용자 평가 요약
export interface UserReviewSummary {
  overallRating?: number;     // 전체 평점 (5점 만점)
  totalReviews?: number;      // 총 리뷰 수
  pros?: string[];            // 장점
  cons?: string[];            // 단점
  commonComplaints?: string[]; // 자주 언급되는 불만
  recommendationRate?: number; // 추천율 (%)
  ratings?: {
    performance?: number;     // 성능 평점
    comfort?: number;         // 편의성 평점
    fuelEfficiency?: number;  // 연비 평점
    value?: number;           // 가성비 평점
    reliability?: number;     // 신뢰성 평점
    design?: number;          // 디자인 평점
  };
}

// 옵션 패키지
export interface OptionPackage {
  name: string;               // 패키지명
  price: string;              // 가격
  includes: string[];         // 포함 옵션
  recommended?: boolean;      // 추천 여부
}

// 개별 옵션
export interface IndividualOption {
  category: string;           // 카테고리 (안전, 편의, 외관 등)
  name: string;               // 옵션명
  price: string;              // 가격
  description?: string;       // 설명
}

// 보증 정보
export interface WarrantyInfo {
  basic?: string;             // 기본 보증 (예: "5년/10만km")
  powertrain?: string;        // 파워트레인 보증
  battery?: string;           // 배터리 보증 (전기차)
  corrosion?: string;         // 부식 보증
  roadside?: string;          // 긴급출동 서비스
  maintenance?: string;       // 무상 정비
}

// 정비 정보
export interface ServiceInfo {
  oilChangePrice?: string;         // 엔진오일 교환 비용
  majorServicePrice?: string;      // 주요 정비 비용
  commonRepairCosts?: {
    item: string;
    price: string;
  }[];
  partAvailability?: string;       // 부품 수급성
  serviceCenterCount?: number;     // 전국 서비스센터 수
}

// 중고차 시세 정보
export interface UsedCarValue {
  depreciationRate?: string;       // 3년 감가율
  currentUsedPrice?: string;       // 현재 중고 시세 (1년차)
  threeYearValue?: string;         // 3년 후 예상 시세
  fiveYearValue?: string;          // 5년 후 예상 시세
  resaleRating?: string;           // 리세일 밸류 등급 (상/중/하)
  popularUsedTrims?: string[];     // 인기 중고 트림
}

// 환경 등급 정보
export interface EnvironmentInfo {
  emissionStandard?: string;       // 배출가스 등급 (유로6d 등)
  co2Emission?: string;            // CO2 배출량 (g/km)
  emissionGrade?: string;          // 환경부 등급 (1~5등급)
  greenCarType?: string;           // 친환경차 유형 (저공해 1종 등)
  fuelType?: string;               // 연료 종류
  noiseLevelDb?: number;           // 소음 수준 (dB)
}

// 보험 정보
export interface InsuranceInfo {
  insuranceGrade?: string;         // 보험 등급
  annualPremiumEstimate?: string;  // 연간 보험료 예상 (30대 기준)
  repairCostIndex?: string;        // 수리비 지수
  theftRisk?: string;              // 도난 위험도
  accidentRate?: string;           // 사고율
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

// 시승/테스트 정보
export interface TestDriveInfo {
  professionalReviews?: {
    source: string;                // 매체명
    rating?: number;               // 평점
    summary: string;               // 요약
    date?: string;                 // 리뷰 날짜
  }[];
  testResults?: {
    testName: string;              // 테스트명 (예: "0-100km/h 가속")
    result: string;                // 결과
    conditions?: string;           // 테스트 조건
  }[];
}

// 구매 정보
export interface PurchaseInfo {
  availableAt?: string[];          // 구매 가능 채널
  deliveryTime?: string;           // 예상 출고 대기 기간
  incentives?: string[];           // 현재 프로모션/인센티브
  financingOptions?: {
    type: string;                  // 금융 상품 종류
    rate?: string;                 // 금리
    terms?: string;                // 조건
  }[];
  tradeInBonus?: string;           // 보상 판매 혜택
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

  // 추가 확장 정보
  media?: MediaAppearance[];       // 미디어 등장 정보
  recalls?: RecallInfo[];          // 리콜 이력
  userReviews?: UserReviewSummary; // 사용자 평가 요약
  optionPackages?: OptionPackage[];     // 옵션 패키지
  individualOptions?: IndividualOption[]; // 개별 옵션
  warranty?: WarrantyInfo;         // 보증 정보
  service?: ServiceInfo;           // 정비 정보
  usedCarValue?: UsedCarValue;     // 중고차 시세
  environment?: EnvironmentInfo;   // 환경 등급
  insurance?: InsuranceInfo;       // 보험 정보
  aftermarket?: AftermarketInfo;   // 튜닝/애프터마켓
  comparison?: ComparisonInfo;     // 경쟁 모델 비교
  specialEditions?: SpecialEdition[]; // 특별판/한정판
  testDrive?: TestDriveInfo;       // 시승/테스트 정보
  purchase?: PurchaseInfo;         // 구매 정보
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
