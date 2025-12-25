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

  // 같은 모델의 연식별 라인업
  const modelLineup = useMemo(() => {
    if (!car) return [];
    return cars
      .filter(c => c.manufacturer === car.manufacturer && c.model === car.model)
      .sort((a, b) => b.year - a.year);
  }, [car]);

  if (!car) {
    return (
      <div className={styles.notFound}>
        <h2>차량을 찾을 수 없습니다</h2>
        <p>요청하신 차량 정보가 존재하지 않습니다.</p>
        <Link to="/" className={styles.backLink}>
          홈으로 돌아가기
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

  return (
    <div className={styles.detailPage}>
      <div className={styles.header}>
        <div className={styles.container}>
          <button className={styles.backBtn} type="button" onClick={() => navigate(-1)}>
            ← 뒤로
          </button>
          <div className={styles.headerTitle}>
            <span className={styles.headerManufacturer}>{car.manufacturer}</span>
            <h1 className={styles.headerModel}>{car.model}</h1>
          </div>
          <button
            type="button"
            className={`${styles.compareBtn} ${inCompare ? styles.inCompare : ''}`}
            onClick={handleCompareClick}
            disabled={!inCompare && compareCars.length >= 3}
          >
            {inCompare ? '비교에서 제거' : '비교에 추가'}
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.threeColumn}>
          {/* 1단: 연식별 라인업 */}
          <section className={styles.column}>
            <h2 className={styles.columnTitle}>연식별 라인업</h2>
            <div className={styles.lineupList}>
              {modelLineup.map(item => (
                <Link
                  key={item.id}
                  to={`/car/${item.id}`}
                  className={`${styles.lineupItem} ${item.id === car.id ? styles.lineupActive : ''}`}
                >
                  <span className={styles.lineupYear}>{item.year}</span>
                  <span className={styles.lineupCategory}>{item.category}</span>
                </Link>
              ))}
              {modelLineup.length === 1 && (
                <p className={styles.lineupNote}>현재 {car.year}년형만 등록되어 있습니다.</p>
              )}
            </div>
          </section>

          {/* 2단: 제원 상세 */}
          <section className={styles.column}>
            <h2 className={styles.columnTitle}>제원</h2>
            <div className={styles.specSection}>
              <h3 className={styles.specSubtitle}>파워트레인</h3>
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
            </div>
            <div className={styles.specSection}>
              <h3 className={styles.specSubtitle}>차체</h3>
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
            </div>
          </section>

          {/* 3단: 모델 설명 */}
          <section className={styles.column}>
            <h2 className={styles.columnTitle}>모델 소개</h2>
            <div className={styles.descSection}>
              <h3 className={styles.descSubtitle}>역사</h3>
              <p className={styles.descText}>{car.history}</p>
            </div>
            <div className={styles.descSection}>
              <h3 className={styles.descSubtitle}>알고 계셨나요?</h3>
              <ul className={styles.triviaList}>
                {car.trivia.map((item, index) => (
                  <li key={index} className={styles.triviaItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
