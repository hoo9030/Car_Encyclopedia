import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import CarCard from '../components/CarCard';
import carsData from '../data/cars.json';
import { Car, FilterOptions } from '../types/car';
import styles from './SearchPage.module.css';

const cars: Car[] = carsData as Car[];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<FilterOptions>({
    manufacturer: searchParams.get('manufacturer') || '',
    category: searchParams.get('category') || '',
    minYear: Number(searchParams.get('minYear')) || 0,
    maxYear: Number(searchParams.get('maxYear')) || 9999,
    searchQuery: searchParams.get('q') || '',
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.searchQuery) params.set('q', filters.searchQuery);
    if (filters.manufacturer) params.set('manufacturer', filters.manufacturer);
    if (filters.category) params.set('category', filters.category);
    if (filters.minYear > 0) params.set('minYear', String(filters.minYear));
    if (filters.maxYear < 9999) params.set('maxYear', String(filters.maxYear));
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = filters.searchQuery
        ? car.manufacturer.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          car.model.toLowerCase().includes(filters.searchQuery.toLowerCase())
        : true;

      const matchesManufacturer = filters.manufacturer
        ? car.manufacturer === filters.manufacturer
        : true;

      const matchesCategory = filters.category
        ? car.category === filters.category
        : true;

      const matchesYear = car.year >= filters.minYear && car.year <= filters.maxYear;

      return matchesSearch && matchesManufacturer && matchesCategory && matchesYear;
    });
  }, [filters]);

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  return (
    <div className={styles.searchPage}>
      <div className={styles.searchHeader}>
        <div className={styles.container}>
          <h1 className={styles.title}>자동차 검색</h1>
          <SearchBar
            initialValue={filters.searchQuery}
            onSearch={handleSearch}
            placeholder="브랜드, 모델명으로 검색..."
          />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <aside className={styles.sidebar}>
              <FilterPanel
                cars={cars}
                filters={filters}
                onFilterChange={setFilters}
              />
            </aside>

            <main className={styles.main}>
              <div className={styles.resultHeader}>
                <span className={styles.resultCount}>
                  {filteredCars.length}대의 차량
                </span>
              </div>

              {filteredCars.length > 0 ? (
                <div className={styles.carGrid}>
                  {filteredCars.map(car => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              ) : (
                <div className={styles.noResults}>
                  <h3>검색 결과가 없습니다</h3>
                  <p>다른 검색어나 필터를 시도해보세요.</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
