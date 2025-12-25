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

            {/* 개요 - 차량 특정 */}
            <div className={styles.descSection}>
              <p className={styles.overviewText}>{car.modelInfo.overview}</p>
            </div>

            {/* 주요 특징 - 차량 특정 */}
            {car.modelInfo.highlights && car.modelInfo.highlights.length > 0 && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>주요 특징</h3>
                <ul className={styles.highlightList}>
                  {car.modelInfo.highlights.map((item, index) => (
                    <li key={index} className={styles.highlightItem}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 트림 라인업 - 차량 특정 */}
            {car.modelInfo.trims && car.modelInfo.trims.length > 0 && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>트림 라인업</h3>
                <div className={styles.trimList}>
                  {car.modelInfo.trims.map((trim, index) => (
                    <div key={index} className={styles.trimItem}>
                      <div className={styles.trimHeader}>
                        <span className={styles.trimName}>{trim.name}</span>
                        <span className={styles.trimPrice}>{trim.price}</span>
                      </div>
                      <ul className={styles.trimFeatures}>
                        {trim.keyFeatures.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 색상 옵션 - 차량 특정 */}
            {car.modelInfo.colors && car.modelInfo.colors.length > 0 && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>색상 옵션</h3>
                <div className={styles.colorSection}>
                  <div className={styles.colorGroup}>
                    <span className={styles.colorGroupLabel}>외장</span>
                    <div className={styles.colorList}>
                      {car.modelInfo.colors
                        .filter(c => c.type === 'exterior')
                        .map((color, index) => (
                          <span key={index} className={`${styles.colorTag} ${color.isPopular ? styles.popularColor : ''}`}>
                            {color.name}
                            {color.isPopular && <span className={styles.popularBadge}>인기</span>}
                          </span>
                        ))}
                    </div>
                  </div>
                  <div className={styles.colorGroup}>
                    <span className={styles.colorGroupLabel}>내장</span>
                    <div className={styles.colorList}>
                      {car.modelInfo.colors
                        .filter(c => c.type === 'interior')
                        .map((color, index) => (
                          <span key={index} className={`${styles.colorTag} ${color.isPopular ? styles.popularColor : ''}`}>
                            {color.name}
                            {color.isPopular && <span className={styles.popularBadge}>인기</span>}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 기술 및 편의사양 - 차량 특정 */}
            {car.modelInfo.technology && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>기술 및 편의사양</h3>

                {car.modelInfo.technology.infotainment && (
                  <div className={styles.techGroup}>
                    <h4 className={styles.techGroupTitle}>인포테인먼트</h4>
                    {car.modelInfo.technology.infotainment.screenSize && (
                      <p className={styles.techItem}>화면: {car.modelInfo.technology.infotainment.screenSize}</p>
                    )}
                    {car.modelInfo.technology.infotainment.system && (
                      <p className={styles.techItem}>시스템: {car.modelInfo.technology.infotainment.system}</p>
                    )}
                    {car.modelInfo.technology.infotainment.features && (
                      <div className={styles.techTags}>
                        {car.modelInfo.technology.infotainment.features.map((f, i) => (
                          <span key={i} className={styles.techTag}>{f}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {car.modelInfo.technology.soundSystem && (
                  <div className={styles.techGroup}>
                    <h4 className={styles.techGroupTitle}>사운드 시스템</h4>
                    <p className={styles.techItem}>
                      {car.modelInfo.technology.soundSystem.brand} {car.modelInfo.technology.soundSystem.speakers}스피커 ({car.modelInfo.technology.soundSystem.power})
                    </p>
                  </div>
                )}

                {car.modelInfo.technology.drivingModes && (
                  <div className={styles.techGroup}>
                    <h4 className={styles.techGroupTitle}>주행 모드</h4>
                    <div className={styles.techTags}>
                      {car.modelInfo.technology.drivingModes.map((mode, i) => (
                        <span key={i} className={styles.techTag}>{mode}</span>
                      ))}
                    </div>
                  </div>
                )}

                {car.modelInfo.technology.connectivity && (
                  <div className={styles.techGroup}>
                    <h4 className={styles.techGroupTitle}>커넥티비티</h4>
                    <ul className={styles.techList}>
                      {car.modelInfo.technology.connectivity.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {car.modelInfo.technology.convenience && (
                  <div className={styles.techGroup}>
                    <h4 className={styles.techGroupTitle}>편의 기능</h4>
                    <div className={styles.techTags}>
                      {car.modelInfo.technology.convenience.map((item, i) => (
                        <span key={i} className={styles.techTag}>{item}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 유지비 정보 - 차량 특정 */}
            {car.modelInfo.ownership && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>유지비 정보</h3>
                <table className={styles.ownershipTable}>
                  <tbody>
                    {car.modelInfo.ownership.annualTax && (
                      <tr>
                        <th>자동차세</th>
                        <td>{car.modelInfo.ownership.annualTax}</td>
                      </tr>
                    )}
                    {car.modelInfo.ownership.insuranceEstimate && (
                      <tr>
                        <th>보험료 (예상)</th>
                        <td>{car.modelInfo.ownership.insuranceEstimate}</td>
                      </tr>
                    )}
                    {car.modelInfo.ownership.fuelCostEstimate && (
                      <tr>
                        <th>연료비 (예상)</th>
                        <td>{car.modelInfo.ownership.fuelCostEstimate}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {car.modelInfo.ownership.maintenanceCycle && (
                  <div className={styles.maintenanceInfo}>
                    <h4 className={styles.techGroupTitle}>소모품 교체 주기</h4>
                    <table className={styles.ownershipTable}>
                      <tbody>
                        {car.modelInfo.ownership.maintenanceCycle.engineOil && (
                          <tr><th>엔진오일</th><td>{car.modelInfo.ownership.maintenanceCycle.engineOil}</td></tr>
                        )}
                        {car.modelInfo.ownership.maintenanceCycle.brakeFluid && (
                          <tr><th>브레이크 오일</th><td>{car.modelInfo.ownership.maintenanceCycle.brakeFluid}</td></tr>
                        )}
                        {car.modelInfo.ownership.maintenanceCycle.tires && (
                          <tr><th>타이어</th><td>{car.modelInfo.ownership.maintenanceCycle.tires}</td></tr>
                        )}
                        {car.modelInfo.ownership.maintenanceCycle.battery && (
                          <tr><th>배터리</th><td>{car.modelInfo.ownership.maintenanceCycle.battery}</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* 리콜 이력 - 차량 특정 */}
            {car.modelInfo.recalls && car.modelInfo.recalls.length > 0 && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>리콜 이력 ({car.year}년형 {car.variant})</h3>
                <div className={styles.recallList}>
                  {car.modelInfo.recalls.map((recall, index) => (
                    <div key={index} className={`${styles.recallItem} ${styles[`severity${recall.severity.charAt(0).toUpperCase() + recall.severity.slice(1)}`]}`}>
                      <div className={styles.recallHeader}>
                        <span className={styles.recallDate}>{recall.date}</span>
                        <span className={`${styles.severityBadge} ${styles[recall.severity]}`}>
                          {recall.severity === 'low' && '경미'}
                          {recall.severity === 'medium' && '보통'}
                          {recall.severity === 'high' && '주의'}
                          {recall.severity === 'critical' && '심각'}
                        </span>
                      </div>
                      <p className={styles.recallReason}>{recall.reason}</p>
                      {recall.affectedUnits && (
                        <p className={styles.recallAffected}>대상: {recall.affectedUnits}</p>
                      )}
                      <p className={styles.recallRemedy}>조치: {recall.remedy}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 사용자 리뷰 요약 - 차량 특정 */}
            {car.modelInfo.userReviews && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>사용자 평가 ({car.year}년형 {car.variant})</h3>
                <div className={styles.reviewSummary}>
                  {car.modelInfo.userReviews.overallRating && (
                    <div className={styles.overallRating}>
                      <span className={styles.ratingScore}>{car.modelInfo.userReviews.overallRating.toFixed(1)}</span>
                      <span className={styles.ratingMax}>/ 5.0</span>
                      {car.modelInfo.userReviews.totalReviews && (
                        <span className={styles.reviewCount}>({car.modelInfo.userReviews.totalReviews.toLocaleString()}개 리뷰)</span>
                      )}
                    </div>
                  )}
                  {car.modelInfo.userReviews.recommendationRate && (
                    <div className={styles.recommendRate}>
                      추천율: <strong>{car.modelInfo.userReviews.recommendationRate}%</strong>
                    </div>
                  )}
                  {car.modelInfo.userReviews.ratings && (
                    <div className={styles.detailedRatings}>
                      {car.modelInfo.userReviews.ratings.performance && (
                        <div className={styles.ratingBar}>
                          <span className={styles.ratingLabel}>성능</span>
                          <div className={styles.barContainer}>
                            <div className={styles.barFill} style={{ width: `${(car.modelInfo.userReviews.ratings.performance / 5) * 100}%` }} />
                          </div>
                          <span className={styles.ratingValue}>{car.modelInfo.userReviews.ratings.performance.toFixed(1)}</span>
                        </div>
                      )}
                      {car.modelInfo.userReviews.ratings.comfort && (
                        <div className={styles.ratingBar}>
                          <span className={styles.ratingLabel}>편의성</span>
                          <div className={styles.barContainer}>
                            <div className={styles.barFill} style={{ width: `${(car.modelInfo.userReviews.ratings.comfort / 5) * 100}%` }} />
                          </div>
                          <span className={styles.ratingValue}>{car.modelInfo.userReviews.ratings.comfort.toFixed(1)}</span>
                        </div>
                      )}
                      {car.modelInfo.userReviews.ratings.fuelEfficiency && (
                        <div className={styles.ratingBar}>
                          <span className={styles.ratingLabel}>연비</span>
                          <div className={styles.barContainer}>
                            <div className={styles.barFill} style={{ width: `${(car.modelInfo.userReviews.ratings.fuelEfficiency / 5) * 100}%` }} />
                          </div>
                          <span className={styles.ratingValue}>{car.modelInfo.userReviews.ratings.fuelEfficiency.toFixed(1)}</span>
                        </div>
                      )}
                      {car.modelInfo.userReviews.ratings.value && (
                        <div className={styles.ratingBar}>
                          <span className={styles.ratingLabel}>가성비</span>
                          <div className={styles.barContainer}>
                            <div className={styles.barFill} style={{ width: `${(car.modelInfo.userReviews.ratings.value / 5) * 100}%` }} />
                          </div>
                          <span className={styles.ratingValue}>{car.modelInfo.userReviews.ratings.value.toFixed(1)}</span>
                        </div>
                      )}
                      {car.modelInfo.userReviews.ratings.reliability && (
                        <div className={styles.ratingBar}>
                          <span className={styles.ratingLabel}>신뢰성</span>
                          <div className={styles.barContainer}>
                            <div className={styles.barFill} style={{ width: `${(car.modelInfo.userReviews.ratings.reliability / 5) * 100}%` }} />
                          </div>
                          <span className={styles.ratingValue}>{car.modelInfo.userReviews.ratings.reliability.toFixed(1)}</span>
                        </div>
                      )}
                      {car.modelInfo.userReviews.ratings.design && (
                        <div className={styles.ratingBar}>
                          <span className={styles.ratingLabel}>디자인</span>
                          <div className={styles.barContainer}>
                            <div className={styles.barFill} style={{ width: `${(car.modelInfo.userReviews.ratings.design / 5) * 100}%` }} />
                          </div>
                          <span className={styles.ratingValue}>{car.modelInfo.userReviews.ratings.design.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className={styles.prosConsContainer}>
                    {car.modelInfo.userReviews.pros && car.modelInfo.userReviews.pros.length > 0 && (
                      <div className={styles.prosSection}>
                        <h4 className={styles.prosTitle}>장점</h4>
                        <ul className={styles.prosList}>
                          {car.modelInfo.userReviews.pros.map((pro, i) => (
                            <li key={i}>{pro}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {car.modelInfo.userReviews.cons && car.modelInfo.userReviews.cons.length > 0 && (
                      <div className={styles.consSection}>
                        <h4 className={styles.consTitle}>단점</h4>
                        <ul className={styles.consList}>
                          {car.modelInfo.userReviews.cons.map((con, i) => (
                            <li key={i}>{con}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 옵션 패키지 - 차량 특정 */}
            {car.modelInfo.optionPackages && car.modelInfo.optionPackages.length > 0 && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>옵션 패키지</h3>
                <div className={styles.packageList}>
                  {car.modelInfo.optionPackages.map((pkg, index) => (
                    <div key={index} className={`${styles.packageItem} ${pkg.recommended ? styles.recommendedPackage : ''}`}>
                      <div className={styles.packageHeader}>
                        <span className={styles.packageName}>{pkg.name}</span>
                        <span className={styles.packagePrice}>{pkg.price}</span>
                        {pkg.recommended && <span className={styles.recommendedBadge}>추천</span>}
                      </div>
                      <ul className={styles.packageIncludes}>
                        {pkg.includes.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 개별 옵션 - 차량 특정 */}
            {car.modelInfo.individualOptions && car.modelInfo.individualOptions.length > 0 && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>개별 옵션</h3>
                <div className={styles.optionGrid}>
                  {car.modelInfo.individualOptions.map((opt, index) => (
                    <div key={index} className={styles.optionItem}>
                      <span className={styles.optionCategory}>{opt.category}</span>
                      <span className={styles.optionName}>{opt.name}</span>
                      <span className={styles.optionPrice}>{opt.price}</span>
                      {opt.description && <p className={styles.optionDesc}>{opt.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 보증 정보 - 차량 특정 */}
            {car.modelInfo.warranty && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>보증 정보</h3>
                <table className={styles.warrantyTable}>
                  <tbody>
                    {car.modelInfo.warranty.basic && (
                      <tr><th>기본 보증</th><td>{car.modelInfo.warranty.basic}</td></tr>
                    )}
                    {car.modelInfo.warranty.powertrain && (
                      <tr><th>파워트레인</th><td>{car.modelInfo.warranty.powertrain}</td></tr>
                    )}
                    {car.modelInfo.warranty.battery && (
                      <tr><th>배터리</th><td>{car.modelInfo.warranty.battery}</td></tr>
                    )}
                    {car.modelInfo.warranty.corrosion && (
                      <tr><th>부식 보증</th><td>{car.modelInfo.warranty.corrosion}</td></tr>
                    )}
                    {car.modelInfo.warranty.roadside && (
                      <tr><th>긴급출동</th><td>{car.modelInfo.warranty.roadside}</td></tr>
                    )}
                    {car.modelInfo.warranty.maintenance && (
                      <tr><th>무상점검</th><td>{car.modelInfo.warranty.maintenance}</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* 정비 정보 - 차량 특정 */}
            {car.modelInfo.service && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>정비 정보</h3>
                <table className={styles.serviceTable}>
                  <tbody>
                    {car.modelInfo.service.oilChangePrice && (
                      <tr><th>엔진오일 교환</th><td>{car.modelInfo.service.oilChangePrice}</td></tr>
                    )}
                    {car.modelInfo.service.majorServicePrice && (
                      <tr><th>주요 정비</th><td>{car.modelInfo.service.majorServicePrice}</td></tr>
                    )}
                    {car.modelInfo.service.partAvailability && (
                      <tr><th>부품 수급성</th><td>{car.modelInfo.service.partAvailability}</td></tr>
                    )}
                    {car.modelInfo.service.serviceCenterCount && (
                      <tr><th>전국 서비스센터</th><td>{car.modelInfo.service.serviceCenterCount.toLocaleString()}개소</td></tr>
                    )}
                  </tbody>
                </table>
                {car.modelInfo.service.commonRepairCosts && car.modelInfo.service.commonRepairCosts.length > 0 && (
                  <div className={styles.repairCosts}>
                    <h4 className={styles.techGroupTitle}>주요 정비 비용</h4>
                    <table className={styles.serviceTable}>
                      <tbody>
                        {car.modelInfo.service.commonRepairCosts.map((cost, i) => (
                          <tr key={i}><th>{cost.item}</th><td>{cost.price}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* 중고차 시세 - 차량 특정 */}
            {car.modelInfo.usedCarValue && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>중고차 시세</h3>
                <table className={styles.usedCarTable}>
                  <tbody>
                    {car.modelInfo.usedCarValue.currentUsedPrice && (
                      <tr><th>현재 시세 (1년차)</th><td>{car.modelInfo.usedCarValue.currentUsedPrice}</td></tr>
                    )}
                    {car.modelInfo.usedCarValue.threeYearValue && (
                      <tr><th>3년 후 예상</th><td>{car.modelInfo.usedCarValue.threeYearValue}</td></tr>
                    )}
                    {car.modelInfo.usedCarValue.fiveYearValue && (
                      <tr><th>5년 후 예상</th><td>{car.modelInfo.usedCarValue.fiveYearValue}</td></tr>
                    )}
                    {car.modelInfo.usedCarValue.depreciationRate && (
                      <tr><th>감가율 (3년)</th><td>{car.modelInfo.usedCarValue.depreciationRate}</td></tr>
                    )}
                    {car.modelInfo.usedCarValue.resaleRating && (
                      <tr><th>리세일 등급</th><td>{car.modelInfo.usedCarValue.resaleRating}</td></tr>
                    )}
                  </tbody>
                </table>
                {car.modelInfo.usedCarValue.popularUsedTrims && car.modelInfo.usedCarValue.popularUsedTrims.length > 0 && (
                  <div className={styles.popularTrims}>
                    <span className={styles.popularTrimsLabel}>인기 중고 트림:</span>
                    <div className={styles.trimTags}>
                      {car.modelInfo.usedCarValue.popularUsedTrims.map((trim, i) => (
                        <span key={i} className={styles.trimTag}>{trim}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 환경 정보 - 차량 특정 */}
            {car.modelInfo.environment && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>환경 정보</h3>
                <table className={styles.envTable}>
                  <tbody>
                    {car.modelInfo.environment.emissionStandard && (
                      <tr><th>배출가스 기준</th><td>{car.modelInfo.environment.emissionStandard}</td></tr>
                    )}
                    {car.modelInfo.environment.co2Emission && (
                      <tr><th>CO2 배출량</th><td>{car.modelInfo.environment.co2Emission}</td></tr>
                    )}
                    {car.modelInfo.environment.emissionGrade && (
                      <tr><th>환경부 등급</th><td>{car.modelInfo.environment.emissionGrade}</td></tr>
                    )}
                    {car.modelInfo.environment.greenCarType && (
                      <tr><th>친환경차 유형</th><td>{car.modelInfo.environment.greenCarType}</td></tr>
                    )}
                    {car.modelInfo.environment.fuelType && (
                      <tr><th>연료 종류</th><td>{car.modelInfo.environment.fuelType}</td></tr>
                    )}
                    {car.modelInfo.environment.noiseLevelDb && (
                      <tr><th>소음 수준</th><td>{car.modelInfo.environment.noiseLevelDb} dB</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* 보험 정보 - 차량 특정 */}
            {car.modelInfo.insurance && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>보험 정보</h3>
                <table className={styles.insuranceTable}>
                  <tbody>
                    {car.modelInfo.insurance.insuranceGrade && (
                      <tr><th>보험 등급</th><td>{car.modelInfo.insurance.insuranceGrade}</td></tr>
                    )}
                    {car.modelInfo.insurance.annualPremiumEstimate && (
                      <tr><th>연간 보험료 (예상)</th><td>{car.modelInfo.insurance.annualPremiumEstimate}</td></tr>
                    )}
                    {car.modelInfo.insurance.repairCostIndex && (
                      <tr><th>수리비 지수</th><td>{car.modelInfo.insurance.repairCostIndex}</td></tr>
                    )}
                    {car.modelInfo.insurance.theftRisk && (
                      <tr><th>도난 위험도</th><td>{car.modelInfo.insurance.theftRisk}</td></tr>
                    )}
                    {car.modelInfo.insurance.accidentRate && (
                      <tr><th>사고율</th><td>{car.modelInfo.insurance.accidentRate}</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* 시승/테스트 정보 - 차량 특정 */}
            {car.modelInfo.testDrive && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>시승 및 테스트 ({car.year}년형 {car.variant})</h3>
                {car.modelInfo.testDrive.professionalReviews && car.modelInfo.testDrive.professionalReviews.length > 0 && (
                  <div className={styles.professionalReviews}>
                    <h4 className={styles.techGroupTitle}>전문가 리뷰</h4>
                    <div className={styles.reviewList}>
                      {car.modelInfo.testDrive.professionalReviews.map((review, index) => (
                        <div key={index} className={styles.reviewItem}>
                          <div className={styles.reviewHeader}>
                            <span className={styles.reviewSource}>{review.source}</span>
                            {review.rating && (
                              <span className={styles.reviewRating}>{review.rating.toFixed(1)}/5.0</span>
                            )}
                            {review.date && <span className={styles.reviewDate}>{review.date}</span>}
                          </div>
                          <p className={styles.reviewSummary}>{review.summary}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {car.modelInfo.testDrive.testResults && car.modelInfo.testDrive.testResults.length > 0 && (
                  <div className={styles.testResults}>
                    <h4 className={styles.techGroupTitle}>테스트 결과</h4>
                    <table className={styles.testTable}>
                      <tbody>
                        {car.modelInfo.testDrive.testResults.map((test, index) => (
                          <tr key={index}>
                            <th>{test.testName}</th>
                            <td>
                              {test.result}
                              {test.conditions && <span className={styles.testConditions}> ({test.conditions})</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* 구매 정보 - 차량 특정 */}
            {car.modelInfo.purchase && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>구매 정보</h3>
                {car.modelInfo.purchase.deliveryTime && (
                  <p className={styles.deliveryTime}>
                    <strong>예상 출고 기간:</strong> {car.modelInfo.purchase.deliveryTime}
                  </p>
                )}
                {car.modelInfo.purchase.availableAt && car.modelInfo.purchase.availableAt.length > 0 && (
                  <div className={styles.purchaseChannels}>
                    <strong>구매 채널:</strong>
                    <ul className={styles.channelList}>
                      {car.modelInfo.purchase.availableAt.map((channel, i) => (
                        <li key={i}>{channel}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {car.modelInfo.purchase.incentives && car.modelInfo.purchase.incentives.length > 0 && (
                  <div className={styles.incentives}>
                    <h4 className={styles.techGroupTitle}>프로모션/혜택</h4>
                    <ul className={styles.incentiveList}>
                      {car.modelInfo.purchase.incentives.map((incentive, i) => (
                        <li key={i}>{incentive}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {car.modelInfo.purchase.financingOptions && car.modelInfo.purchase.financingOptions.length > 0 && (
                  <div className={styles.financingOptions}>
                    <h4 className={styles.techGroupTitle}>금융 상품</h4>
                    <div className={styles.financeList}>
                      {car.modelInfo.purchase.financingOptions.map((option, index) => (
                        <div key={index} className={styles.financeItem}>
                          <span className={styles.financeType}>{option.type}</span>
                          {option.rate && <span className={styles.financeRate}>{option.rate}</span>}
                          {option.terms && <span className={styles.financeTerms}>{option.terms}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {car.modelInfo.purchase.tradeInBonus && (
                  <p className={styles.tradeInBonus}>
                    <strong>보상판매:</strong> {car.modelInfo.purchase.tradeInBonus}
                  </p>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
