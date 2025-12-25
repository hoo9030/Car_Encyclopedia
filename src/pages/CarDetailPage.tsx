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

  const relatedCars = useMemo(() => {
    return cars
      .filter(c => c.id !== car.id && (c.manufacturer === car.manufacturer || c.category === car.category))
      .slice(0, 3);
  }, [car]);

  return (
    <div className={styles.detailPage}>
      <div className={styles.header}>
        <div className={styles.container}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            ← 뒤로
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.mainInfo}>
            <div className={styles.titleSection}>
              <span className={styles.category}>{car.category}</span>
              <span className={styles.manufacturer}>{car.manufacturer}</span>
              <h1 className={styles.model}>{car.model}</h1>
              <p className={styles.year}>{car.year}년형</p>
            </div>
            <div className={styles.priceSection}>
              <span className={styles.priceLabel}>가격</span>
              <span className={styles.price}>{car.price}</span>
              <button
                className={`${styles.compareBtn} ${inCompare ? styles.inCompare : ''}`}
                onClick={handleCompareClick}
                disabled={!inCompare && compareCars.length >= 3}
              >
                {inCompare ? '비교 목록에서 제거' : '비교 목록에 추가'}
              </button>
            </div>
          </div>

          <div className={styles.sections}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>상세 사양</h2>
              <table className={styles.specTable}>
                <tbody>
                  <tr>
                    <th>엔진</th>
                    <td>{car.specs.engine}</td>
                  </tr>
                  <tr>
                    <th>최대 출력</th>
                    <td>{car.specs.horsepower} hp</td>
                  </tr>
                  <tr>
                    <th>최대 토크</th>
                    <td>{car.specs.torque} Nm</td>
                  </tr>
                  <tr>
                    <th>변속기</th>
                    <td>{car.specs.transmission}</td>
                  </tr>
                  <tr>
                    <th>구동방식</th>
                    <td>{car.specs.drivetrain}</td>
                  </tr>
                  <tr>
                    <th>연비</th>
                    <td>{car.specs.fuelEfficiency}</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>차량 크기</h2>
              <table className={styles.specTable}>
                <tbody>
                  <tr>
                    <th>전장</th>
                    <td>{car.specs.dimensions.length} mm</td>
                  </tr>
                  <tr>
                    <th>전폭</th>
                    <td>{car.specs.dimensions.width} mm</td>
                  </tr>
                  <tr>
                    <th>전고</th>
                    <td>{car.specs.dimensions.height} mm</td>
                  </tr>
                  <tr>
                    <th>휠베이스</th>
                    <td>{car.specs.dimensions.wheelbase} mm</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>역사</h2>
              <p className={styles.history}>{car.history}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>알고 계셨나요?</h2>
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
                <h2 className={styles.sectionTitle}>관련 차량</h2>
                <div className={styles.relatedList}>
                  {relatedCars.map(relatedCar => (
                    <Link
                      key={relatedCar.id}
                      to={`/car/${relatedCar.id}`}
                      className={styles.relatedItem}
                    >
                      <span className={styles.relatedManufacturer}>{relatedCar.manufacturer}</span>
                      <span className={styles.relatedModel}>{relatedCar.model}</span>
                      <span className={styles.relatedYear}>{relatedCar.year}</span>
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
