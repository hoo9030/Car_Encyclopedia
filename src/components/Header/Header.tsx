import { Link, useLocation } from 'react-router-dom';
import { useCompare } from '../../context/CompareContext';
import styles from './Header.module.css';

export default function Header() {
  const location = useLocation();
  const { compareCars } = useCompare();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🚗</span>
          <span className={styles.logoText}>자동차 백과사전</span>
        </Link>

        <nav className={styles.nav}>
          <Link
            to="/"
            className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
          >
            홈
          </Link>
          <Link
            to="/search"
            className={`${styles.navLink} ${location.pathname === '/search' ? styles.active : ''}`}
          >
            검색
          </Link>
          <Link
            to="/compare"
            className={`${styles.navLink} ${location.pathname === '/compare' ? styles.active : ''}`}
          >
            비교
            {compareCars.length > 0 && (
              <span className={styles.badge}>{compareCars.length}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
