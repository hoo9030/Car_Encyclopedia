import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import carsData from '../data/cars.json';
import { Car } from '../types/car';
import styles from './HomePage.module.css';

const cars: Car[] = carsData as Car[];

export default function HomePage() {
  const manufacturers = useMemo(() => {
    const unique = [...new Set(cars.map(car => car.manufacturer))];
    return unique.sort();
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(cars.map(car => car.category))];
    return unique;
  }, []);

  const carsByManufacturer = useMemo(() => {
    const grouped: Record<string, Car[]> = {};
    manufacturers.forEach(manufacturer => {
      grouped[manufacturer] = cars.filter(car => car.manufacturer === manufacturer);
    });
    return grouped;
  }, [manufacturers]);

  const getManufacturerCount = (manufacturer: string) => {
    return cars.filter(car => car.manufacturer === manufacturer).length;
  };

  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>자동차 백과사전</h1>
          <p className={styles.heroSubtitle}>
            {cars.length}개 차량의 상세 스펙, 역사, 트리비아를 확인하세요
          </p>
          <SearchBar placeholder="브랜드, 모델명으로 검색..." />
        </div>
      </section>

      <section className={styles.manufacturerNav}>
        <div className={styles.container}>
          <div className={styles.manufacturerList}>
            {manufacturers.map(manufacturer => (
              <a
                key={manufacturer}
                href={`#${manufacturer}`}
                className={styles.manufacturerLink}
              >
                {manufacturer}
                <span className={styles.manufacturerCount}>{getManufacturerCount(manufacturer)}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.carList}>
        <div className={styles.container}>
          {manufacturers.map(manufacturer => (
            <div key={manufacturer} id={manufacturer} className={styles.manufacturerSection}>
              <div className={styles.manufacturerHeader}>
                <h2 className={styles.manufacturerTitle}>{manufacturer}</h2>
                <Link
                  to={`/search?manufacturer=${encodeURIComponent(manufacturer)}`}
                  className={styles.viewAllLink}
                >
                  전체보기
                </Link>
              </div>
              <div className={styles.carTable}>
                <div className={styles.tableHeader}>
                  <span className={styles.colModel}>모델</span>
                  <span className={styles.colCategory}>차종</span>
                  <span className={styles.colYear}>연식</span>
                  <span className={styles.colEngine}>엔진</span>
                  <span className={styles.colPrice}>가격</span>
                </div>
                {carsByManufacturer[manufacturer].map(car => (
                  <Link key={car.id} to={`/car/${car.id}`} className={styles.tableRow}>
                    <span className={styles.colModel}>{car.model}</span>
                    <span className={styles.colCategory}>{car.category}</span>
                    <span className={styles.colYear}>{car.year}</span>
                    <span className={styles.colEngine}>{car.specs.horsepower}hp</span>
                    <span className={styles.colPrice}>{car.price}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.container}>
          <div className={styles.statGrid}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>총 차량</span>
              <span className={styles.statNumber}>{cars.length}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>브랜드</span>
              <span className={styles.statNumber}>{manufacturers.length}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>차종</span>
              <span className={styles.statNumber}>{categories.length}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
