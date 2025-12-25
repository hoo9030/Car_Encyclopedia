import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useCompare } from '../context/CompareContext';
import carsData from '../data/cars.json';
import { Car } from '../types/car';
import styles from './CarDetailPage.module.css';

const cars: Car[] = carsData as Car[];

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
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
          <Link to="/" className={styles.backBtn}>
            ← 뒤로
          </Link>
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
                  <span className={styles.lineupYear}>{item.year}년형</span>
                  <span className={styles.lineupVariant}>{item.variant || item.category}</span>
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

            {/* 파워트레인 */}
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
                </tbody>
              </table>
            </div>

            {/* 엔진 상세 */}
            {car.specs.engineDetails && (
              <div className={styles.specSection}>
                <h3 className={styles.specSubtitle}>엔진 상세</h3>
                <table className={styles.specTable}>
                  <tbody>
                    {car.specs.engineDetails.displacement && (
                      <tr>
                        <th>배기량</th>
                        <td>{car.specs.engineDetails.displacement.toLocaleString()} cc</td>
                      </tr>
                    )}
                    {car.specs.engineDetails.cylinders && (
                      <tr>
                        <th>실린더</th>
                        <td>{car.specs.engineDetails.cylinders}기통</td>
                      </tr>
                    )}
                    {car.specs.engineDetails.valves && (
                      <tr>
                        <th>밸브</th>
                        <td>{car.specs.engineDetails.valves}밸브</td>
                      </tr>
                    )}
                    {car.specs.engineDetails.compressionRatio && (
                      <tr>
                        <th>압축비</th>
                        <td>{car.specs.engineDetails.compressionRatio}</td>
                      </tr>
                    )}
                    {car.specs.engineDetails.bore && car.specs.engineDetails.stroke && (
                      <tr>
                        <th>보어×스트로크</th>
                        <td>{car.specs.engineDetails.bore} × {car.specs.engineDetails.stroke} mm</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* 성능 */}
            {car.specs.performance && (
              <div className={styles.specSection}>
                <h3 className={styles.specSubtitle}>성능</h3>
                <table className={styles.specTable}>
                  <tbody>
                    {car.specs.performance.acceleration && (
                      <tr>
                        <th>0-100km/h</th>
                        <td>{car.specs.performance.acceleration}초</td>
                      </tr>
                    )}
                    {car.specs.performance.topSpeed && (
                      <tr>
                        <th>최고속도</th>
                        <td>{car.specs.performance.topSpeed} km/h</td>
                      </tr>
                    )}
                    {car.specs.performance.combinedFuelEconomy && (
                      <tr>
                        <th>복합연비</th>
                        <td>{car.specs.performance.combinedFuelEconomy}</td>
                      </tr>
                    )}
                    {car.specs.performance.cityFuelEconomy && (
                      <tr>
                        <th>도심연비</th>
                        <td>{car.specs.performance.cityFuelEconomy}</td>
                      </tr>
                    )}
                    {car.specs.performance.highwayFuelEconomy && (
                      <tr>
                        <th>고속연비</th>
                        <td>{car.specs.performance.highwayFuelEconomy}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* 전기차 스펙 */}
            {car.specs.electric && (
              <div className={styles.specSection}>
                <h3 className={styles.specSubtitle}>전기 시스템</h3>
                <table className={styles.specTable}>
                  <tbody>
                    {car.specs.electric.batteryCapacity && (
                      <tr>
                        <th>배터리 용량</th>
                        <td>{car.specs.electric.batteryCapacity} kWh</td>
                      </tr>
                    )}
                    {car.specs.electric.range && (
                      <tr>
                        <th>주행거리</th>
                        <td>{car.specs.electric.range} km</td>
                      </tr>
                    )}
                    {car.specs.electric.fastChargingTime && (
                      <tr>
                        <th>급속충전</th>
                        <td>{car.specs.electric.fastChargingTime}</td>
                      </tr>
                    )}
                    {car.specs.electric.normalChargingTime && (
                      <tr>
                        <th>완속충전</th>
                        <td>{car.specs.electric.normalChargingTime}</td>
                      </tr>
                    )}
                    {car.specs.electric.motorType && (
                      <tr>
                        <th>모터 종류</th>
                        <td>{car.specs.electric.motorType}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* 차체 */}
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
                  {car.specs.dimensions.groundClearance && (
                    <tr>
                      <th>최저지상고</th>
                      <td>{car.specs.dimensions.groundClearance} mm</td>
                    </tr>
                  )}
                  {car.specs.dimensions.curbWeight && (
                    <tr>
                      <th>공차중량</th>
                      <td>{car.specs.dimensions.curbWeight.toLocaleString()} kg</td>
                    </tr>
                  )}
                  {car.specs.dimensions.trunkCapacity && (
                    <tr>
                      <th>트렁크 용량</th>
                      <td>{car.specs.dimensions.trunkCapacity} L</td>
                    </tr>
                  )}
                  {car.specs.dimensions.fuelTankCapacity && (
                    <tr>
                      <th>연료탱크</th>
                      <td>{car.specs.dimensions.fuelTankCapacity} L</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* 서스펜션 */}
            {car.specs.suspension && (
              <div className={styles.specSection}>
                <h3 className={styles.specSubtitle}>서스펜션</h3>
                <table className={styles.specTable}>
                  <tbody>
                    {car.specs.suspension.front && (
                      <tr>
                        <th>전륜</th>
                        <td>{car.specs.suspension.front}</td>
                      </tr>
                    )}
                    {car.specs.suspension.rear && (
                      <tr>
                        <th>후륜</th>
                        <td>{car.specs.suspension.rear}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* 브레이크 */}
            {car.specs.brakes && (
              <div className={styles.specSection}>
                <h3 className={styles.specSubtitle}>브레이크</h3>
                <table className={styles.specTable}>
                  <tbody>
                    {car.specs.brakes.front && (
                      <tr>
                        <th>전륜</th>
                        <td>{car.specs.brakes.front}{car.specs.brakes.frontDiscSize && ` (${car.specs.brakes.frontDiscSize}mm)`}</td>
                      </tr>
                    )}
                    {car.specs.brakes.rear && (
                      <tr>
                        <th>후륜</th>
                        <td>{car.specs.brakes.rear}{car.specs.brakes.rearDiscSize && ` (${car.specs.brakes.rearDiscSize}mm)`}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* 타이어/휠 */}
            {car.specs.tires && (
              <div className={styles.specSection}>
                <h3 className={styles.specSubtitle}>타이어/휠</h3>
                <table className={styles.specTable}>
                  <tbody>
                    {car.specs.tires.front && (
                      <tr>
                        <th>전륜 타이어</th>
                        <td>{car.specs.tires.front}</td>
                      </tr>
                    )}
                    {car.specs.tires.rear && car.specs.tires.rear !== car.specs.tires.front && (
                      <tr>
                        <th>후륜 타이어</th>
                        <td>{car.specs.tires.rear}</td>
                      </tr>
                    )}
                    {car.specs.tires.wheelSize && (
                      <tr>
                        <th>휠 사이즈</th>
                        <td>{car.specs.tires.wheelSize}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* 안전 */}
            {car.specs.safety && (
              <div className={styles.specSection}>
                <h3 className={styles.specSubtitle}>안전</h3>
                <table className={styles.specTable}>
                  <tbody>
                    {car.specs.safety.airbags && (
                      <tr>
                        <th>에어백</th>
                        <td>{car.specs.safety.airbags}개</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {car.specs.safety.adasFeatures && car.specs.safety.adasFeatures.length > 0 && (
                  <div className={styles.adasList}>
                    <span className={styles.adasLabel}>ADAS</span>
                    <div className={styles.adasTags}>
                      {car.specs.safety.adasFeatures.map((feature, index) => (
                        <span key={index} className={styles.adasTag}>{feature}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 편의 */}
            {car.specs.comfort && (
              <div className={styles.specSection}>
                <h3 className={styles.specSubtitle}>편의</h3>
                <table className={styles.specTable}>
                  <tbody>
                    {car.specs.comfort.seats && (
                      <tr>
                        <th>좌석 수</th>
                        <td>{car.specs.comfort.seats}인승</td>
                      </tr>
                    )}
                    {car.specs.comfort.seatMaterial && (
                      <tr>
                        <th>시트 재질</th>
                        <td>{car.specs.comfort.seatMaterial}</td>
                      </tr>
                    )}
                    {car.specs.comfort.sunroof && (
                      <tr>
                        <th>썬루프</th>
                        <td>{car.specs.comfort.sunroof}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* 3단: 모델 설명 */}
          <section className={styles.column}>
            <h2 className={styles.columnTitle}>모델 소개</h2>

            {/* 개요 */}
            <div className={styles.descSection}>
              <p className={styles.overviewText}>{car.introduction.overview}</p>
            </div>

            {/* 주요 특징 */}
            {car.introduction.highlights && car.introduction.highlights.length > 0 && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>주요 특징</h3>
                <ul className={styles.highlightList}>
                  {car.introduction.highlights.map((item, index) => (
                    <li key={index} className={styles.highlightItem}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 역사 */}
            <div className={styles.descSection}>
              <h3 className={styles.descSubtitle}>개발 역사</h3>
              <p className={styles.descText}>{car.introduction.history}</p>
            </div>

            {/* 디자인 철학 */}
            {car.introduction.designPhilosophy && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>디자인 철학</h3>
                <p className={styles.descText}>{car.introduction.designPhilosophy}</p>
              </div>
            )}

            {/* 타겟 고객층 */}
            {car.introduction.targetAudience && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>타겟 고객</h3>
                <p className={styles.descText}>{car.introduction.targetAudience}</p>
              </div>
            )}

            {/* 경쟁 모델 */}
            {car.introduction.competitorModels && car.introduction.competitorModels.length > 0 && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>경쟁 모델</h3>
                <div className={styles.competitorTags}>
                  {car.introduction.competitorModels.map((model, index) => (
                    <span key={index} className={styles.competitorTag}>{model}</span>
                  ))}
                </div>
              </div>
            )}

            {/* 수상 이력 */}
            {car.introduction.awards && car.introduction.awards.length > 0 && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>수상 이력</h3>
                <ul className={styles.awardsList}>
                  {car.introduction.awards.map((award, index) => (
                    <li key={index} className={styles.awardItem}>{award}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 알고 계셨나요? */}
            {car.introduction.trivia && car.introduction.trivia.length > 0 && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>알고 계셨나요?</h3>
                <ul className={styles.triviaList}>
                  {car.introduction.trivia.map((item, index) => (
                    <li key={index} className={styles.triviaItem}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
