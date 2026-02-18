import styles from './ResultsTransformScreen.module.css';

const NOW_METRICS = [
  { name: 'Cravings', value: 85, label: 'High' },
  { name: 'Food Noise', value: 80, label: 'Loud' },
  { name: 'Progress', value: 10, label: 'Stuck' },
  { name: 'Confidence', value: 20, label: 'Low' },
];

const GOAL_METRICS = [
  { name: 'Cravings', value: 20, label: 'Controlled' },
  { name: 'Food Noise', value: 15, label: 'Quiet' },
  { name: 'Progress', value: 85, label: 'Steady' },
  { name: 'Confidence', value: 90, label: 'High' },
];

export default function ResultsTransformScreen() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h2 className={styles.title}>You Are Just 3 Months Away From Feeling Like Yourself Again 🔥</h2>
        <p className={styles.subtitle}>Here&apos;s what you can expect:</p>

        <ul className={styles.checkList}>
          <li className={styles.checkItem}>
            <span className={styles.checkEmoji}>✅</span>
            Stop feeling invisible — people notice you when you walk into a room
          </li>
          <li className={styles.checkItem}>
            <span className={styles.checkEmoji}>✅</span>
            Feel confident in your body again — no more hiding in the back of photos
          </li>
          <li className={styles.checkItem}>
            <span className={styles.checkEmoji}>✅</span>
            Have the energy you used to have — alive, present, engaged with life
          </li>
        </ul>

        <div className={styles.comparison}>
          <div className={`${styles.compBox} ${styles.compBoxNow}`}>
            <div className={`${styles.compLabel} ${styles.compLabelNow}`}>Now</div>
            <div className={styles.compImageBox}>😔</div>
            <div className={styles.metrics}>
              {NOW_METRICS.map((m) => (
                <div key={m.name} className={styles.metricRow}>
                  <span className={styles.metricName}>{m.name}: {m.label}</span>
                  <div className={styles.barTrack}>
                    <div className={`${styles.barFill} ${styles.barRed}`} style={{ width: `${m.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.arrow}>→</div>

          <div className={`${styles.compBox} ${styles.compBoxGoal}`}>
            <div className={`${styles.compLabel} ${styles.compLabelGoal}`}>Your Goal</div>
            <div className={styles.compImageBox}>😊</div>
            <div className={styles.metrics}>
              {GOAL_METRICS.map((m) => (
                <div key={m.name} className={styles.metricRow}>
                  <span className={styles.metricName}>{m.name}: {m.label}</span>
                  <div className={styles.barTrack}>
                    <div className={`${styles.barFill} ${styles.barGreen}`} style={{ width: `${m.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
