'use client';

import { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

const STEPS = [
  'Analyzing your answers...',
  'Determining your GLP-1 profile...',
  'Calculating your metabolic age...',
  'Building your transformation timeline...',
  'Preparing your personalized summary...',
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 4000;
    const stepDuration = totalDuration / STEPS.length;

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < STEPS.length - 1) return prev + 1;
        return prev;
      });
      setProgress((prev) => {
        const next = prev + 100 / STEPS.length;
        return Math.min(next, 100);
      });
    }, stepDuration);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(onComplete, 500);
    }, totalDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <main className={styles.main}>
      <div className={styles.logoWrap}>
        <div className={styles.logoText}>NUPATCH</div>
      </div>

      <div className={styles.card}>
        <p className={styles.statusText}>{STEPS[stepIndex]}</p>

        <div className={styles.trackWrap}>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${progress}%` }} />
          </div>
          <div className={styles.percentage}>{Math.round(progress)}%</div>
        </div>

        <div className={styles.steps}>
          {STEPS.map((step, i) => (
            <div key={i} className={`${styles.step} ${i <= stepIndex ? styles.stepDone : ''}`}>
              <div className={`${styles.stepDot} ${i <= stepIndex ? styles.stepDotDone : ''}`} />
              {step}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
