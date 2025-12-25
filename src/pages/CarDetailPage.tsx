import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useCompare } from '../context/CompareContext';
import carsData from '../data/cars.json';
import { Car } from '../types/car';
import styles from './CarDetailPage.module.css';

const cars: Car[] = carsData as Car[];

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCompare, removeFromCompare, isInCompare, compareCars } = useCompare();

  const car = useMemo(() => {
    return cars.find(c => c.id === id);
  }, [id]);

  if (!car) {
    return (
      <div className={styles.notFound}>
        <span className={styles.notFoundIcon}>😕</span>
        <h2>차량을 찾을 수 없습니다</h2>
        <p>요청하신 차량 정보가 존재하지 않습니다.</p>
        <Link to="/search" className={styles.backLink}>
          검색으로 돌아가기
        </Link>
      </div>
    );
  }

  const inCompare = isInCompare(car.id);

  const handleCompareClick = () => {
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

  const relatedCars = useMemo(() => {
    return cars
      .filter(c => c.id !== car.id && (c.manufacturer === car.manufacturer || c.category === car.category))
      .slice(0, 3);
  }, [car]);

  return (
    <div className={styles.detailPage}>
      <div className={styles.hero}>
        <div className={styles.container}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            ← 뒤로
          </button>
          <div className={styles.heroContent}>
            <div className={styles.carVisual}>
              <span className={styles.carEmoji}>{getCategoryEmoji(car.category)}</span>
            </div>
            <div className={styles.carInfo}>
              <span className={styles.category}>{car.category}</span>
              <h1 className={styles.title}>
                <span className={styles.manufacturer}>{car.manufacturer}</span>
                <span className={styles.model}>{car.model}</span>
              </h1>
              <p className={styles.year}>{car.year}년형</p>
              <div className={styles.price}>{car.price}</div>
              <button
                className={`${styles.compareBtn} ${inCompare ? styles.inCompare : ''}`}
                onClick={handleCompareClick}
                disabled={!inCompare && compareCars.length >= 3}
              >
                {inCompare ? '✓ 비교 목록에서 제거' : '+ 비교 목록에 추가'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.sections}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>📊 상세 사양</h2>
              <div className={styles.specsGrid}>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>엔진</span>
                  <span className={styles.specValue}>{car.specs.engine}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>최대 출력</span>
                  <span className={styles.specValue}>{car.specs.horsepower} hp</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>최대 토크</span>
                  <span className={styles.specValue}>{car.specs.torque} Nm</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>변속기</span>
                  <span className={styles.specValue}>{car.specs.transmission}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>구동방식</span>
                  <span className={styles.specValue}>{car.specs.drivetrain}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>연비</span>
                  <span className={styles.specValue}>{car.specs.fuelEfficiency}</span>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>📐 차량 크기</h2>
              <div className={styles.dimensionsGrid}>
                <div className={styles.dimensionItem}>
                  <span className={styles.dimensionLabel}>전장</span>
                  <span className={styles.dimensionValue}>{car.specs.dimensions.length} mm</span>
                </div>
                <div className={styles.dimensionItem}>
                  <span className={styles.dimensionLabel}>전폭</span>
                  <span className={styles.dimensionValue}>{car.specs.dimensions.width} mm</span>
                </div>
                <div className={styles.dimensionItem}>
                  <span className={styles.dimensionLabel}>전고</span>
                  <span className={styles.dimensionValue}>{car.specs.dimensions.height} mm</span>
                </div>
                <div className={styles.dimensionItem}>
                  <span className={styles.dimensionLabel}>휠베이스</span>
                  <span className={styles.dimensionValue}>{car.specs.dimensions.wheelbase} mm</span>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>📖 역사</h2>
              <p className={styles.history}>{car.history}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>💡 알고 계셨나요?</h2>
              <ul className={styles.triviaList}>
                {car.trivia.map((item, index) => (
                  <li key={index} className={styles.triviaItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {relatedCars.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>🚗 관련 차량</h2>
                <div className={styles.relatedGrid}>
                  {relatedCars.map(relatedCar => (
                    <Link
                      key={relatedCar.id}
                      to={`/car/${relatedCar.id}`}
                      className={styles.relatedCard}
                    >
                      <span className={styles.relatedEmoji}>{getCategoryEmoji(relatedCar.category)}</span>
                      <span className={styles.relatedManufacturer}>{relatedCar.manufacturer}</span>
                      <span className={styles.relatedModel}>{relatedCar.model}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
