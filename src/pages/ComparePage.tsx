import { Link } from 'react-router-dom';
import CompareTable from '../components/CompareTable';
import { useCompare } from '../context/CompareContext';
import styles from './ComparePage.module.css';

export default function ComparePage() {
  const { compareCars, clearCompare } = useCompare();

  return (
    <div className={styles.comparePage}>
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>차량 비교</h1>
          <p className={styles.subtitle}>
            최대 3대의 차량을 비교해보세요
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.container}>
          {compareCars.length > 0 && (
            <div className={styles.actions}>
              <span className={styles.count}>{compareCars.length}대 선택됨</span>
              <button className={styles.clearBtn} onClick={clearCompare}>
                전체 삭제
              </button>
            </div>
          )}

          <CompareTable />

          {compareCars.length < 3 && (
            <div className={styles.addMore}>
              <Link to="/" className={styles.addMoreBtn}>
                + 차량 추가하기
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
