'use client';

import { QuizAnswers } from '@/types/quiz';
import styles from './WeightInputScreen.module.css';

interface WeightInputScreenProps {
  answers: QuizAnswers;
  onChange: (partial: Partial<QuizAnswers>) => void;
}

export default function WeightInputScreen({ answers, onChange }: WeightInputScreenProps) {
  const unit = answers.weightUnit ?? 'imperial';

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.title}>How much would you like to lose?</h1>

        <div className={styles.toggle}>
          <button
            className={`${styles.toggleBtn} ${unit === 'imperial' ? styles.toggleBtnActive : ''}`}
            onClick={() => onChange({ weightUnit: 'imperial' })}
          >
            lbs
          </button>
          <button
            className={`${styles.toggleBtn} ${unit === 'metric' ? styles.toggleBtnActive : ''}`}
            onClick={() => onChange({ weightUnit: 'metric' })}
          >
            kg
          </button>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputWrap}>
            <label className={styles.inputLabel}>
              Current weight ({unit === 'imperial' ? 'lbs' : 'kg'})
            </label>
            <input
              type="number"
              className={styles.inputField}
              placeholder={unit === 'imperial' ? '180' : '82'}
              min={unit === 'imperial' ? 80 : 36}
              max={unit === 'imperial' ? 500 : 227}
              value={unit === 'imperial' ? (answers.currentWeightLbs ?? '') : (answers.currentWeightKg ?? '')}
              onChange={(e) => {
                const val = Number(e.target.value) || undefined;
                onChange(unit === 'imperial' ? { currentWeightLbs: val } : { currentWeightKg: val });
              }}
            />
          </div>

          <div className={styles.divider}>goal</div>

          <div className={styles.inputWrap}>
            <label className={styles.inputLabel}>
              Goal weight ({unit === 'imperial' ? 'lbs' : 'kg'})
            </label>
            <input
              type="number"
              className={styles.inputField}
              placeholder={unit === 'imperial' ? '150' : '68'}
              min={unit === 'imperial' ? 80 : 36}
              max={unit === 'imperial' ? 500 : 227}
              value={unit === 'imperial' ? (answers.goalWeightLbs ?? '') : (answers.goalWeightKg ?? '')}
              onChange={(e) => {
                const val = Number(e.target.value) || undefined;
                onChange(unit === 'imperial' ? { goalWeightLbs: val } : { goalWeightKg: val });
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
