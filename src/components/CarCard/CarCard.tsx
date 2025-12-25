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
    <div className={styles.card}>
      <Link to={`/car/${car.id}`} className={styles.cardLink}>
        <div className={styles.imageContainer}>
          <div className={styles.imagePlaceholder}>
            <span className={styles.carEmoji}>{getCategoryEmoji(car.category)}</span>
          </div>
          <span className={styles.category}>{car.category}</span>
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.manufacturer}>{car.manufacturer}</span>
            <span className={styles.year}>{car.year}</span>
          </div>

          <h3 className={styles.model}>{car.model}</h3>

          <div className={styles.specs}>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>마력</span>
              <span className={styles.specValue}>{car.specs.horsepower}hp</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>연비</span>
              <span className={styles.specValue}>{car.specs.fuelEfficiency}</span>
            </div>
          </div>

          <div className={styles.price}>{car.price}</div>
        </div>
      </Link>

      <button
        className={`${styles.compareBtn} ${inCompare ? styles.inCompare : ''}`}
        onClick={handleCompareClick}
        disabled={!inCompare && compareCars.length >= 3}
        title={inCompare ? '비교에서 제거' : compareCars.length >= 3 ? '최대 3대까지 비교 가능' : '비교에 추가'}
      >
        {inCompare ? '✓ 비교중' : '+ 비교'}
      </button>
    </div>
  );
}
