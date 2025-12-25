import { Car } from '../../types/car';
import { useCompare } from '../../context/CompareContext';
import styles from './CompareTable.module.css';

export default function CompareTable() {
  const { compareCars, removeFromCompare } = useCompare();

  if (compareCars.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>📊</span>
        <h3>비교할 차량을 선택해주세요</h3>
        <p>검색 페이지에서 최대 3대의 차량을 비교 목록에 추가할 수 있습니다.</p>
      </div>
    );
  }

  const specs: { key: string; label: string; getValue: (car: Car) => string }[] = [
    { key: 'manufacturer', label: '제조사', getValue: (car) => car.manufacturer },
    { key: 'year', label: '연식', getValue: (car) => `${car.year}년` },
    { key: 'category', label: '차종', getValue: (car) => car.category },
    { key: 'engine', label: '엔진', getValue: (car) => car.specs.engine },
    { key: 'horsepower', label: '마력', getValue: (car) => `${car.specs.horsepower}hp` },
    { key: 'torque', label: '토크', getValue: (car) => `${car.specs.torque}Nm` },
    { key: 'transmission', label: '변속기', getValue: (car) => car.specs.transmission },
    { key: 'drivetrain', label: '구동방식', getValue: (car) => car.specs.drivetrain },
    { key: 'fuelEfficiency', label: '연비', getValue: (car) => car.specs.fuelEfficiency },
    { key: 'length', label: '전장', getValue: (car) => `${car.specs.dimensions.length}mm` },
    { key: 'width', label: '전폭', getValue: (car) => `${car.specs.dimensions.width}mm` },
    { key: 'height', label: '전고', getValue: (car) => `${car.specs.dimensions.height}mm` },
    { key: 'wheelbase', label: '휠베이스', getValue: (car) => `${car.specs.dimensions.wheelbase}mm` },
    { key: 'price', label: '가격', getValue: (car) => car.price },
  ];

  const getCategoryEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      '세단': '🚗',
      'SUV': '🚙',
      '스포츠카': '🏎️',
      '전기차': '⚡',
      '하이브리드': '🔋',
      '트럭': '🛻',
      '왜건': '🚐'
    };
    return emojis[category] || '🚗';
  };

  return (
    <div className={styles.compareTable}>
      <div className={styles.headerRow}>
        <div className={styles.labelCell}></div>
        {compareCars.map((car) => (
          <div key={car.id} className={styles.carHeader}>
            <div className={styles.carEmoji}>{getCategoryEmoji(car.category)}</div>
            <h3 className={styles.carName}>{car.model}</h3>
            <button
              className={styles.removeBtn}
              onClick={() => removeFromCompare(car.id)}
            >
              ✕ 제거
            </button>
          </div>
        ))}
      </div>

      {specs.map((spec) => (
        <div key={spec.key} className={styles.row}>
          <div className={styles.labelCell}>{spec.label}</div>
          {compareCars.map((car) => (
            <div key={car.id} className={styles.valueCell}>
              {spec.getValue(car)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
