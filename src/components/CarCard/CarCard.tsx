import { Link } from 'react-router-dom';
import { Car } from '../../types/car';
import { useCompare } from '../../context/CompareContext';
import styles from './CarCard.module.css';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const { addToCompare, removeFromCompare, isInCompare, compareCars } = useCompare();
  const inCompare = isInCompare(car.id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(car.id);
    } else {
      addToCompare(car);
    }
  };

  return (
    <div className={styles.card}>
      <Link to={`/car/${car.id}`} className={styles.cardLink}>
        <div className={styles.header}>
          <span className={styles.category}>{car.category}</span>
          <span className={styles.year}>{car.year}</span>
        </div>

        <div className={styles.titleArea}>
          <span className={styles.manufacturer}>{car.manufacturer}</span>
          <h3 className={styles.model}>{car.model}</h3>
        </div>

        <div className={styles.specs}>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>엔진</span>
            <span className={styles.specValue}>{car.specs.engine}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>출력</span>
            <span className={styles.specValue}>{car.specs.horsepower}hp / {car.specs.torque}Nm</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>연비</span>
            <span className={styles.specValue}>{car.specs.fuelEfficiency}</span>
          </div>
        </div>

        <div className={styles.price}>{car.price}</div>
      </Link>

      <button
        className={`${styles.compareBtn} ${inCompare ? styles.inCompare : ''}`}
        onClick={handleCompareClick}
        disabled={!inCompare && compareCars.length >= 3}
        title={inCompare ? '비교에서 제거' : compareCars.length >= 3 ? '최대 3대까지 비교 가능' : '비교에 추가'}
      >
        {inCompare ? '비교중' : '+ 비교'}
      </button>
    </div>
  );
}
