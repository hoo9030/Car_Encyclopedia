// 제조사별 로고 URL (Wikipedia API로 확인된 정확한 URL)
export const manufacturerLogos: Record<string, string> = {
  '현대': 'https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg',
  '기아': 'https://upload.wikimedia.org/wikipedia/commons/4/47/KIA_logo2.svg',
  '제네시스': '', // Wikimedia에 없음
  'BMW': 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
  '메르세데스-벤츠': 'https://upload.wikimedia.org/wikipedia/commons/3/32/Mercedes-Benz_Star_2022.svg',
  '테슬라': 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg',
  '포르쉐': 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Porsche_Wortmarke.svg',
  '토요타': 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg',
  '혼다': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg',
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
