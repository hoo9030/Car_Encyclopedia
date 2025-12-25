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

            {/* 세대별 역사 */}
            {car.introduction.generations && car.introduction.generations.length > 0 && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>세대별 역사</h3>
                <div className={styles.generationList}>
                  {car.introduction.generations.map((gen, index) => (
                    <div key={index} className={styles.generationItem}>
                      <div className={styles.genHeader}>
                        <span className={styles.genNumber}>{gen.generation}세대</span>
                        <span className={styles.genCode}>{gen.codeName}</span>
                        <span className={styles.genYears}>{gen.productionYears}</span>
                      </div>
                      <p className={styles.genDesc}>{gen.description}</p>
                      {gen.keyChanges && gen.keyChanges.length > 0 && (
                        <ul className={styles.genChanges}>
                          {gen.keyChanges.map((change, idx) => (
                            <li key={idx}>{change}</li>
                          ))}
                        </ul>
                      )}
                      {gen.salesVolume && (
                        <span className={styles.genSales}>판매량: {gen.salesVolume}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 트림 라인업 */}
            {car.introduction.trims && car.introduction.trims.length > 0 && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>트림 라인업</h3>
                <div className={styles.trimList}>
                  {car.introduction.trims.map((trim, index) => (
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

            {/* 색상 옵션 */}
            {car.introduction.colors && car.introduction.colors.length > 0 && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>색상 옵션</h3>
                <div className={styles.colorSection}>
                  <div className={styles.colorGroup}>
                    <span className={styles.colorGroupLabel}>외장</span>
                    <div className={styles.colorList}>
                      {car.introduction.colors
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
                      {car.introduction.colors
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

            {/* 기술 및 편의사양 */}
            {car.introduction.technology && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>기술 및 편의사양</h3>

                {car.introduction.technology.infotainment && (
                  <div className={styles.techGroup}>
                    <h4 className={styles.techGroupTitle}>인포테인먼트</h4>
                    {car.introduction.technology.infotainment.screenSize && (
                      <p className={styles.techItem}>화면: {car.introduction.technology.infotainment.screenSize}</p>
                    )}
                    {car.introduction.technology.infotainment.system && (
                      <p className={styles.techItem}>시스템: {car.introduction.technology.infotainment.system}</p>
                    )}
                    {car.introduction.technology.infotainment.features && (
                      <div className={styles.techTags}>
                        {car.introduction.technology.infotainment.features.map((f, i) => (
                          <span key={i} className={styles.techTag}>{f}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {car.introduction.technology.soundSystem && (
                  <div className={styles.techGroup}>
                    <h4 className={styles.techGroupTitle}>사운드 시스템</h4>
                    <p className={styles.techItem}>
                      {car.introduction.technology.soundSystem.brand} {car.introduction.technology.soundSystem.speakers}스피커 ({car.introduction.technology.soundSystem.power})
                    </p>
                  </div>
                )}

                {car.introduction.technology.drivingModes && (
                  <div className={styles.techGroup}>
                    <h4 className={styles.techGroupTitle}>주행 모드</h4>
                    <div className={styles.techTags}>
                      {car.introduction.technology.drivingModes.map((mode, i) => (
                        <span key={i} className={styles.techTag}>{mode}</span>
                      ))}
                    </div>
                  </div>
                )}

                {car.introduction.technology.connectivity && (
                  <div className={styles.techGroup}>
                    <h4 className={styles.techGroupTitle}>커넥티비티</h4>
                    <ul className={styles.techList}>
                      {car.introduction.technology.connectivity.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {car.introduction.technology.convenience && (
                  <div className={styles.techGroup}>
                    <h4 className={styles.techGroupTitle}>편의 기능</h4>
                    <div className={styles.techTags}>
                      {car.introduction.technology.convenience.map((item, i) => (
                        <span key={i} className={styles.techTag}>{item}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 유지비 정보 */}
            {car.introduction.ownership && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>유지비 정보</h3>
                <table className={styles.ownershipTable}>
                  <tbody>
                    {car.introduction.ownership.annualTax && (
                      <tr>
                        <th>자동차세</th>
                        <td>{car.introduction.ownership.annualTax}</td>
                      </tr>
                    )}
                    {car.introduction.ownership.insuranceEstimate && (
                      <tr>
                        <th>보험료 (예상)</th>
                        <td>{car.introduction.ownership.insuranceEstimate}</td>
                      </tr>
                    )}
                    {car.introduction.ownership.fuelCostEstimate && (
                      <tr>
                        <th>연료비 (예상)</th>
                        <td>{car.introduction.ownership.fuelCostEstimate}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {car.introduction.ownership.maintenanceCycle && (
                  <div className={styles.maintenanceInfo}>
                    <h4 className={styles.techGroupTitle}>소모품 교체 주기</h4>
                    <table className={styles.ownershipTable}>
                      <tbody>
                        {car.introduction.ownership.maintenanceCycle.engineOil && (
                          <tr><th>엔진오일</th><td>{car.introduction.ownership.maintenanceCycle.engineOil}</td></tr>
                        )}
                        {car.introduction.ownership.maintenanceCycle.brakeFluid && (
                          <tr><th>브레이크 오일</th><td>{car.introduction.ownership.maintenanceCycle.brakeFluid}</td></tr>
                        )}
                        {car.introduction.ownership.maintenanceCycle.tires && (
                          <tr><th>타이어</th><td>{car.introduction.ownership.maintenanceCycle.tires}</td></tr>
                        )}
                        {car.introduction.ownership.maintenanceCycle.battery && (
                          <tr><th>배터리</th><td>{car.introduction.ownership.maintenanceCycle.battery}</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* 글로벌 정보 */}
            {car.introduction.global && (
              <div className={styles.descSection}>
                <h3 className={styles.descSubtitle}>글로벌 정보</h3>
                {car.introduction.global.exportName && (
                  <p className={styles.globalInfo}>
                    <strong>수출명:</strong> {car.introduction.global.exportName}
                  </p>
                )}
                {car.introduction.global.productionPlant && (
                  <p className={styles.globalInfo}>
                    <strong>생산 공장:</strong> {car.introduction.global.productionPlant}
                  </p>
                )}
                {car.introduction.global.salesCountries && (
                  <div className={styles.globalCountries}>
                    <strong>판매 국가:</strong>
                    <div className={styles.countryTags}>
                      {car.introduction.global.salesCountries.map((country, i) => (
                        <span key={i} className={styles.countryTag}>{country}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
