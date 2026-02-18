import styles from './GLP1ChartScreen.module.css';

const dataPoints = [
  { age: '25', pct: 100 },
  { age: '30', pct: 90 },
  { age: '35', pct: 80 },
  { age: '40', pct: 70 },
  { age: '45', pct: 55 },
  { age: '50+', pct: 40 },
];

const W = 320;
const H = 180;
const PAD = { top: 20, right: 20, bottom: 40, left: 44 };
const chartW = W - PAD.left - PAD.right;
const chartH = H - PAD.top - PAD.bottom;

function xPos(i: number) {
  return PAD.left + (i / (dataPoints.length - 1)) * chartW;
}

function yPos(pct: number) {
  return PAD.top + ((100 - pct) / 100) * chartH;
}

export default function GLP1ChartScreen() {
  const linePath = dataPoints
    .map((d, i) => `${i === 0 ? 'M' : 'L'}${xPos(i)},${yPos(d.pct)}`)
    .join(' ');

  const areaPath =
    linePath +
    ` L${xPos(dataPoints.length - 1)},${PAD.top + chartH} L${xPos(0)},${PAD.top + chartH} Z`;

  // Red zone starts at index 3 (age 40)
  const redZoneX = xPos(3);

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          Your GLP-1 Levels{' '}
          <span className={styles.accent}>Drop Every Year</span>
        </h2>

        <div className={styles.chartWrap}>
          <svg width="100%" viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
            {/* Red danger zone background */}
            <rect
              x={redZoneX}
              y={PAD.top}
              width={W - redZoneX - PAD.right}
              height={chartH}
              fill="rgba(220,53,69,0.06)"
            />

            {/* Y grid lines */}
            {[100, 75, 50, 25].map((pct) => (
              <g key={pct}>
                <line
                  x1={PAD.left}
                  y1={yPos(pct)}
                  x2={W - PAD.right}
                  y2={yPos(pct)}
                  stroke="#ECF8F6"
                  strokeWidth="1"
                />
                <text x={PAD.left - 6} y={yPos(pct) + 4} textAnchor="end" fontSize="10" fill="#93BDB8">
                  {pct}%
                </text>
              </g>
            ))}

            {/* Area fill */}
            <path d={areaPath} fill="rgba(78,120,116,0.12)" />

            {/* Line */}
            <path d={linePath} fill="none" stroke="#4E7874" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Data points */}
            {dataPoints.map((d, i) => (
              <circle
                key={i}
                cx={xPos(i)}
                cy={yPos(d.pct)}
                r={i >= 3 ? 5 : 4}
                fill={i >= 3 ? '#dc3545' : '#4E7874'}
              />
            ))}

            {/* X axis labels */}
            {dataPoints.map((d, i) => (
              <text
                key={i}
                x={xPos(i)}
                y={H - 6}
                textAnchor="middle"
                fontSize="10"
                fill={i >= 3 ? '#dc3545' : '#71A6A1'}
                fontWeight={i >= 3 ? '600' : '400'}
              >
                {d.age}
              </text>
            ))}

            {/* Critical decline label */}
            <text x={redZoneX + 4} y={PAD.top + 12} fontSize="9" fill="#dc3545" fontWeight="600">
              ⚠ Critical decline zone
            </text>
          </svg>
        </div>

        <div className={styles.statBox}>
          <div className={styles.statNumber}>-1.5–2%</div>
          <div className={styles.statText}>
            Every year after 25, your body produces less GLP-1 — the hormone that controls appetite,
            regulates metabolism, and signals your body it&apos;s SAFE to burn fat.
          </div>
        </div>
      </div>
    </main>
  );
}
