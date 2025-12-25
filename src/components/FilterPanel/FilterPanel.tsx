import { useMemo } from 'react';
import { Car, FilterOptions } from '../../types/car';
import styles from './FilterPanel.module.css';

interface FilterPanelProps {
  cars: Car[];
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export default function FilterPanel({ cars, filters, onFilterChange }: FilterPanelProps) {
  const manufacturers = useMemo(() => {
    const unique = [...new Set(cars.map(car => car.manufacturer))];
    return unique.sort();
  }, [cars]);

  const categories = useMemo(() => {
    const unique = [...new Set(cars.map(car => car.category))];
    return unique.sort();
  }, [cars]);

  const years = useMemo(() => {
    const unique = [...new Set(cars.map(car => car.year))];
    return unique.sort((a, b) => b - a);
  }, [cars]);

  const handleChange = (key: keyof FilterOptions, value: string | number) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleReset = () => {
    onFilterChange({
      manufacturer: '',
      category: '',
      minYear: 0,
      maxYear: 9999,
      searchQuery: filters.searchQuery
    });
  };

  const hasActiveFilters = filters.manufacturer || filters.category || filters.minYear > 0 || filters.maxYear < 9999;

  return (
    <div className={styles.filterPanel}>
      <div className={styles.header}>
        <h3 className={styles.title}>필터</h3>
        {hasActiveFilters && (
          <button className={styles.resetBtn} onClick={handleReset}>
            초기화
          </button>
        )}
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>제조사</label>
        <select
          className={styles.select}
          value={filters.manufacturer}
          onChange={(e) => handleChange('manufacturer', e.target.value)}
        >
          <option value="">전체</option>
          {manufacturers.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>차종</label>
        <select
          className={styles.select}
          value={filters.category}
          onChange={(e) => handleChange('category', e.target.value)}
        >
          <option value="">전체</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>연도</label>
        <select
          className={styles.select}
          value={filters.minYear || ''}
          onChange={(e) => handleChange('minYear', e.target.value ? Number(e.target.value) : 0)}
        >
          <option value="">전체</option>
          {years.map(y => (
            <option key={y} value={y}>{y}년</option>
          ))}
        </select>
      </div>
    </div>
  );
}
