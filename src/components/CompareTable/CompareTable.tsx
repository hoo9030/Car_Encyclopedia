import { Car } from '../../types/car';
import { useCompare } from '../../context/CompareContext';
import styles from './CompareTable.module.css';

export default function CompareTable() {
  const { compareCars, removeFromCompare } = useCompare();

  if (compareCars.length === 0) {
    return (
      <div className={styles.empty}>
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

  return (
    <div className={styles.compareTable}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.labelCell}></th>
            {compareCars.map((car) => (
              <th key={car.id} className={styles.carHeader}>
                <div className={styles.carInfo}>
                  <span className={styles.carManufacturer}>{car.manufacturer}</span>
                  <span className={styles.carName}>{car.model}</span>
                </div>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeFromCompare(car.id)}
                >
                  제거
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {specs.map((spec) => (
            <tr key={spec.key}>
              <th className={styles.labelCell}>{spec.label}</th>
              {compareCars.map((car) => (
                <td key={car.id} className={styles.valueCell}>
                  {spec.getValue(car)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
