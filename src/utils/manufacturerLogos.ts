// 제조사별 로고 URL (Wikimedia Commons SVG 로고 사용)
export const manufacturerLogos: Record<string, string> = {
  '현대': 'https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg',
  '기아': 'https://upload.wikimedia.org/wikipedia/commons/1/13/Kia-logo.svg',
  '제네시스': 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Genesis_Motors_logo.svg',
  'BMW': 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
  '메르세데스-벤츠': 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg',
  '테슬라': 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
  '포르쉐': 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Porsche_logo.svg',
  '토요타': 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Toyota_EU.svg',
  '혼다': 'https://upload.wikimedia.org/wikipedia/commons/7/76/Honda_logo.svg',
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
