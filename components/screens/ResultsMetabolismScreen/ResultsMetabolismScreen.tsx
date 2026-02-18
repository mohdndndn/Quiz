'use client';

import { useState } from 'react';
import { QuizAnswers } from '@/types/quiz';
import { calculateBMI } from '@/lib/calculations';
import styles from './ResultsMetabolismScreen.module.css';

interface ResultsMetabolismScreenProps {
  answers: QuizAnswers;
}

function getMeterPosition(bmi: number | null): number {
  if (!bmi) return 15;
  if (bmi < 22) return 70;
  if (bmi < 25) return 55;
  if (bmi < 30) return 30;
  return 15;
}

function getMetabolismLabel(bmi: number | null): string {
  if (!bmi) return 'Slow';
  if (bmi < 22) return 'Average';
  if (bmi < 25) return 'Slow';
  return 'Very Slow';
}

export default function ResultsMetabolismScreen({ answers }: ResultsMetabolismScreenProps) {
  const [expanded, setExpanded] = useState(false);
  const bmi = calculateBMI(answers);
  const meterPos = getMeterPosition(bmi);
  const metaLabel = getMetabolismLabel(bmi);

  const currentWeight = answers.weightUnit === 'imperial'
    ? `${answers.currentWeightLbs ?? '—'} lbs`
    : `${answers.currentWeightKg ?? '—'} kg`;
  const height = answers.heightUnit === 'imperial'
    ? `${answers.heightFt ?? '—'}′ ${answers.heightIn ?? 0}″`
    : `${answers.heightCm ?? '—'} cm`;

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h2 className={styles.title}>How does your GLP-1 affect weight loss?</h2>

        <p className={styles.intro}>
          Low GLP-1 levels may contribute to metabolic dysfunction and hormonal resistance,
          making it challenging to shed those extra pounds.
        </p>

        <div className={styles.answerRow}>
          <p className={styles.answerItem}><span className={styles.answerLabel}>Height:</span> {height}</p>
          <p className={styles.answerItem}><span className={styles.answerLabel}>Current weight:</span> {currentWeight}</p>
          {answers.weightGained === 'yes' && (
            <p className={styles.answerItem}>📈 You have gained weight in the last year</p>
          )}
        </div>

        <div className={styles.meterBox}>
          <div className={styles.meterLabel}>Your metabolism</div>
          <div className={styles.meterTitle}>{metaLabel}</div>
          <div className={styles.meterTrack}>
            <div className={styles.meterIndicator} style={{ left: `${meterPos}%` }} />
          </div>
          <div className={styles.meterLabels}>
            <span>Very slow</span>
            <span>Slow</span>
            <span>Average</span>
            <span>Fast</span>
            <span>Very fast</span>
          </div>
        </div>

        <div className={styles.expandable}>
          <button
            className={styles.expandHeader}
            onClick={() => setExpanded((v) => !v)}
          >
            What does this mean for weight loss?
            <span className={`${styles.expandChevron} ${expanded ? styles.expandChevronOpen : ''}`}>▼</span>
          </button>
          {expanded && (
            <div className={styles.expandBody}>
              <p>When GLP-1 levels are low, your body:</p>
              <ul className={styles.expandList}>
                <li className={styles.expandListItem}>Burns 200–400 fewer calories per day</li>
                <li className={styles.expandListItem}>Stores fat instead of burning it</li>
                <li className={styles.expandListItem}>Amplifies hunger signals (making you feel ravenous even after eating)</li>
                <li className={styles.expandListItem}>Enters &ldquo;famine mode&rdquo; and defends against weight loss</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
