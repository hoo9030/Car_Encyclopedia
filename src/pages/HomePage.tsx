import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CarCard from '../components/CarCard';
import carsData from '../data/cars.json';
import { Car } from '../types/car';
import styles from './HomePage.module.css';

const cars: Car[] = carsData as Car[];

export default function HomePage() {
  const categories = useMemo(() => {
    const unique = [...new Set(cars.map(car => car.category))];
    return unique;
  }, []);

  const featuredCars = useMemo(() => {
    return cars.slice(0, 6);
  }, []);

  const getCategoryCount = (category: string) => {
    return cars.filter(car => car.category === category).length;
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

      <section className={styles.categories}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>차종별 탐색</h2>
          <div className={styles.categoryGrid}>
            {categories.map(category => (
              <Link
                key={category}
                to={`/search?category=${encodeURIComponent(category)}`}
                className={styles.categoryCard}
              >
                <span className={styles.categoryName}>{category}</span>
                <span className={styles.categoryCount}>{getCategoryCount(category)}대</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.featured}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>차량 목록</h2>
            <Link to="/search" className={styles.viewAllLink}>
              전체보기
            </Link>
          </div>
          <div className={styles.carGrid}>
            {featuredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
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
              <span className={styles.statNumber}>{new Set(cars.map(c => c.manufacturer)).size}</span>
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
