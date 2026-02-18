'use client';

import { QuizAnswers } from '@/types/quiz';
import styles from './HeightInputScreen.module.css';

interface HeightInputScreenProps {
  answers: QuizAnswers;
  onChange: (partial: Partial<QuizAnswers>) => void;
}

export default function HeightInputScreen({ answers, onChange }: HeightInputScreenProps) {
  const unit = answers.heightUnit ?? 'imperial';

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.title}>What&apos;s your height?</h1>

        <div className={styles.toggle}>
          <button
            className={`${styles.toggleBtn} ${unit === 'imperial' ? styles.toggleBtnActive : ''}`}
            onClick={() => onChange({ heightUnit: 'imperial' })}
          >
            Imperial
          </button>
          <button
            className={`${styles.toggleBtn} ${unit === 'metric' ? styles.toggleBtnActive : ''}`}
            onClick={() => onChange({ heightUnit: 'metric' })}
          >
            Metric
          </button>
        </div>

        <div className={styles.inputGroup}>
          {unit === 'imperial' ? (
            <div className={styles.inputRow}>
              <div className={styles.inputWrap}>
                <label className={styles.inputLabel}>Feet</label>
                <input
                  type="number"
                  className={styles.inputField}
                  placeholder="5"
                  min={3}
                  max={8}
                  value={answers.heightFt ?? ''}
                  onChange={(e) => onChange({ heightFt: Number(e.target.value) || undefined })}
                />
              </div>
              <div className={styles.inputWrap}>
                <label className={styles.inputLabel}>Inches</label>
                <input
                  type="number"
                  className={styles.inputField}
                  placeholder="6"
                  min={0}
                  max={11}
                  value={answers.heightIn ?? ''}
                  onChange={(e) => onChange({ heightIn: Number(e.target.value) || undefined })}
                />
              </div>
            </div>
          ) : (
            <div className={styles.inputWrap}>
              <label className={styles.inputLabel}>Centimeters</label>
              <input
                type="number"
                className={styles.inputField}
                placeholder="168"
                min={100}
                max={250}
                value={answers.heightCm ?? ''}
                onChange={(e) => onChange({ heightCm: Number(e.target.value) || undefined })}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
