import { QuizAnswers } from '@/types/quiz';
import { calculateBMI, getBMIPosition, calculateMetabolicAge } from '@/lib/calculations';
import styles from './ResultsSummaryScreen.module.css';

interface ResultsSummaryScreenProps {
  answers: QuizAnswers;
}

export default function ResultsSummaryScreen({ answers }: ResultsSummaryScreenProps) {
  const bmi = calculateBMI(answers);
  const bmiDisplay = bmi ? bmi.toFixed(1) : '—';
  const bmiPos = bmi ? getBMIPosition(bmi) : 50;
  const metaAge = calculateMetabolicAge(answers);

  const currentWeight = answers.weightUnit === 'imperial'
    ? `${answers.currentWeightLbs ?? '—'} lbs`
    : `${answers.currentWeightKg ?? '—'} kg`;

  const height = answers.heightUnit === 'imperial'
    ? `${answers.heightFt ?? '—'}′ ${answers.heightIn ?? 0}″`
    : `${answers.heightCm ?? '—'} cm`;

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h2 className={styles.title}>Your personal summary</h2>

        <p className={styles.intro}>
          The quiz indicates that you might be experiencing hormonal weight gain and an increased metabolic age,
          both of which can be linked to declining GLP-1 production.
        </p>

        <div className={styles.answerRow}>
          <p className={styles.answerItem}>
            <span className={styles.answerLabel}>Age:</span> {answers.ageLabel ?? '—'}
          </p>
          <p className={styles.answerItem}>
            <span className={styles.answerLabel}>Height:</span> {height}
          </p>
          <p className={styles.answerItem}>
            <span className={styles.answerLabel}>Current weight:</span> {currentWeight}
          </p>
        </div>

        <div className={styles.metricsRow}>
          <div className={styles.metricBox}>
            <div className={styles.metricLabel}>Your BMI</div>
            <div className={styles.metricValue}>{bmiDisplay}</div>
            <div className={styles.bmiScale}>
              <div className={styles.bmiTrack}>
                <div className={styles.bmiIndicator} style={{ left: `${bmiPos}%` }} />
              </div>
              <div className={styles.bmiLabels}>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </div>
          </div>

          <div className={styles.metricBox}>
            <div className={styles.metricLabel}>Your Metabolic Age</div>
            <div className={styles.metricValue}>{metaAge}</div>
            <div className={styles.metricSub}>years</div>
          </div>
        </div>

        <div className={styles.alertBox}>
          <span className={styles.alertIcon}>⚠️</span>
          <p className={styles.alertText}>
            Low GLP-1 levels may be causing your body to hold onto fat
          </p>
        </div>

        <div className={styles.warningBox}>
          🔴 Your fat-burning rate is very low
        </div>
      </div>
    </main>
  );
}
