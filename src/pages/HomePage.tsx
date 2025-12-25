import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import carsData from '../data/cars.json';
import { Car } from '../types/car';
import { manufacturerLogos, manufacturerAbbr } from '../utils/manufacturerLogos';
import styles from './HomePage.module.css';

const cars: Car[] = carsData as Car[];

export default function HomePage() {
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const manufacturers = useMemo(() => {
    const unique = [...new Set(cars.map(car => car.manufacturer))];
    return unique.sort();
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(cars.map(car => car.category))];
    return unique;
  }, []);

  const filteredCars = useMemo(() => {
    let result = cars;

    if (selectedManufacturer) {
      result = result.filter(car => car.manufacturer === selectedManufacturer);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(car =>
        car.model.toLowerCase().includes(query) ||
        car.manufacturer.toLowerCase().includes(query)
      );
    }

    return result;
  }, [selectedManufacturer, searchQuery]);

  const getManufacturerCount = (manufacturer: string) => {
    return cars.filter(car => car.manufacturer === manufacturer).length;
  };

  const [logoErrors, setLogoErrors] = useState<Set<string>>(new Set());

  const handleLogoError = (manufacturer: string) => {
    setLogoErrors(prev => new Set(prev).add(manufacturer));
  };

  const renderLogo = (manufacturer: string, size: 'small' | 'large' = 'small') => {
    const logoUrl = manufacturerLogos[manufacturer];
    const abbr = manufacturerAbbr[manufacturer] || manufacturer[0];

    if (!logoUrl || logoErrors.has(manufacturer)) {
      return (
        <span className={size === 'small' ? styles.logoFallback : styles.logoFallbackLarge}>
          {abbr}
        </span>
      );
    }

    return (
      <img
        src={logoUrl}
        alt={`${manufacturer} 로고`}
        className={size === 'small' ? styles.manufacturerLogo : styles.manufacturerLogoLarge}
        onError={() => handleLogoError(manufacturer)}
      />
    );
  };

  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>자동차 백과사전</h1>
          <p className={styles.heroSubtitle}>
            {cars.length}개 차량의 상세 스펙, 역사, 트리비아를 확인하세요
          </p>
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="모델명으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className={styles.manufacturerNav}>
        <div className={styles.container}>
          <div className={styles.manufacturerList}>
            <button
              type="button"
              className={`${styles.manufacturerLink} ${!selectedManufacturer ? styles.active : ''}`}
              onClick={() => setSelectedManufacturer(null)}
            >
              전체
              <span className={styles.manufacturerCount}>{cars.length}</span>
            </button>
            {manufacturers.map(manufacturer => (
              <button
                type="button"
                key={manufacturer}
                className={`${styles.manufacturerLink} ${selectedManufacturer === manufacturer ? styles.active : ''}`}
                onClick={() => setSelectedManufacturer(manufacturer)}
              >
                {renderLogo(manufacturer, 'small')}
                {manufacturer}
                <span className={styles.manufacturerCount}>{getManufacturerCount(manufacturer)}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.carList}>
        <div className={styles.container}>
          <div className={styles.listHeader}>
            <h2 className={styles.listTitle}>
              {selectedManufacturer ? (
                <span className={styles.manufacturerTitleWrapper}>
                  {renderLogo(selectedManufacturer, 'large')}
                  {selectedManufacturer}
                </span>
              ) : '전체 차량'}
            </h2>
            <span className={styles.listCount}>{filteredCars.length}개 차량</span>
          </div>
          <ul className={styles.carModelList}>
            {filteredCars.map(car => (
              <li key={car.id}>
                <Link to={`/car/${car.id}`} className={styles.carModelLink}>
                  {car.model}
                </Link>
              </li>
            ))}
          </ul>
          {filteredCars.length === 0 && (
            <p className={styles.noResults}>검색 결과가 없습니다.</p>
          )}
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
