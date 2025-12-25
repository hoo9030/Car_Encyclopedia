// 제조사별 로고 URL (Wikimedia Commons SVG 로고 사용)
// 파일명은 Wikimedia Commons 검색 결과 기반
export const manufacturerLogos: Record<string, string> = {
  // 현대: File:Hyundai_Motor_Company_logo.svg 또는 File:Hyundai_logo.svg
  '현대': 'https://upload.wikimedia.org/wikipedia/commons/0/07/Hyundai_Motor_Company_logo.svg',
  // 기아: File:KIA_logo3.svg (2021년 새 로고)
  '기아': 'https://upload.wikimedia.org/wikipedia/commons/1/13/Kia-logo.svg',
  // 제네시스: Wikimedia에 없음 - 약어로 대체됨
  '제네시스': '',
  // BMW: File:BMW.svg
  'BMW': 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
  // 메르세데스-벤츠: File:Mercedes-Benz_Star_2022.svg
  '메르세데스-벤츠': 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg',
  // 테슬라: File:Tesla_T_symbol.svg
  '테슬라': 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
  // 포르쉐: File:Porsche_Wortmarke.svg
  '포르쉐': 'https://upload.wikimedia.org/wikipedia/commons/6/63/Porsche_Wortmarke.svg',
  // 토요타: File:Toyota_carlogo.svg 또는 File:Toyota.svg
  '토요타': 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Toyota.svg',
  // 혼다: File:Honda.svg 또는 File:Honda_Logo.svg
  '혼다': 'https://upload.wikimedia.org/wikipedia/commons/7/76/Honda.svg',
  // 아우디: File:Audi-Logo_2016.svg
  '아우디': 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg',
};

// 로고 로드 실패 시 대체 텍스트용 약어
export const manufacturerAbbr: Record<string, string> = {
  '현대': 'H',
  '기아': 'KIA',
  '제네시스': 'G',
  'BMW': 'BMW',
  '메르세데스-벤츠': 'MB',
  '테슬라': 'T',
  '포르쉐': 'P',
  '토요타': 'T',
  '혼다': 'H',
  '아우디': 'A',
};
