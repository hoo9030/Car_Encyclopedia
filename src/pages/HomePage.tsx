import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import carsData from '../data/cars.json';
import { Car } from '../types/car';
import { manufacturerLogos, manufacturerAbbr } from '../utils/manufacturerLogos';
import styles from './HomePage.module.css';

const cars: Car[] = carsData as Car[];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const manufacturers = useMemo(() => {
    const unique = [...new Set(cars.map(car => car.manufacturer))];
    return unique.sort();
  }, []);

  const carsByManufacturer = useMemo(() => {
    const grouped: Record<string, Car[]> = {};
    manufacturers.forEach(manufacturer => {
      let manufacturerCars = cars.filter(car => car.manufacturer === manufacturer);

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        manufacturerCars = manufacturerCars.filter(car =>
          car.model.toLowerCase().includes(query)
        );
      }

      if (manufacturerCars.length > 0) {
        grouped[manufacturer] = manufacturerCars;
      }
    });
    return grouped;
  }, [manufacturers, searchQuery]);

  const visibleManufacturers = Object.keys(carsByManufacturer);

  const [logoErrors, setLogoErrors] = useState<Set<string>>(new Set());

  const handleLogoError = (manufacturer: string) => {
    setLogoErrors(prev => new Set(prev).add(manufacturer));
  };

  const renderLogo = (manufacturer: string, size: 'small' | 'large' | 'xlarge' = 'small') => {
    const logoUrl = manufacturerLogos[manufacturer];
    const abbr = manufacturerAbbr[manufacturer] || manufacturer[0];

    if (!logoUrl || logoErrors.has(manufacturer)) {
      const sizeClass = size === 'xlarge' ? styles.logoFallbackXLarge :
                        size === 'large' ? styles.logoFallbackLarge : styles.logoFallback;
      return (
        <span className={sizeClass}>
          {abbr}
        </span>
      );
    }

    const sizeClass = size === 'xlarge' ? styles.manufacturerLogoXLarge :
                      size === 'large' ? styles.manufacturerLogoLarge : styles.manufacturerLogo;

    return (
      <img
        src={logoUrl}
        alt={`${manufacturer} 로고`}
        className={sizeClass}
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

      <section className={styles.dealership}>
        {visibleManufacturers.length === 0 ? (
          <div className={styles.noResults}>검색 결과가 없습니다.</div>
        ) : (
          visibleManufacturers.map(manufacturer => (
            <div key={manufacturer} className={styles.brandSection}>
              <div className={styles.brandHeader}>
                {renderLogo(manufacturer, 'xlarge')}
                <h2 className={styles.brandName}>{manufacturer}</h2>
              </div>
              <div className={styles.carScroller}>
                <div className={styles.carTrack}>
                  {carsByManufacturer[manufacturer].map(car => (
                    <Link key={car.id} to={`/car/${car.id}`} className={styles.carCard}>
                      <div className={styles.carInfo}>
                        <span className={styles.carCategory}>{car.category}</span>
                        <h3 className={styles.carName}>{car.model}</h3>
                        {car.variant && <span className={styles.carVariant}>{car.variant}</span>}
                        <div className={styles.carSpecs}>
                          <span>{car.year}년형</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
