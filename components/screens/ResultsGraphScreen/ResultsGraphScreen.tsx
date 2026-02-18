'use client';

import { useState } from 'react';
import { QuizAnswers } from '@/types/quiz';
import { getDisplayWeight } from '@/lib/calculations';
import styles from './ResultsGraphScreen.module.css';

interface ResultsGraphScreenProps {
  answers: QuizAnswers;
}

function WeightLossGraph({
  currentWeight,
  goalWeight,
  unit,
}: {
  currentWeight: number;
  goalWeight: number;
  unit: string;
}) {
  const W = 320;
  const H = 180;
  const PAD = { top: 20, right: 20, bottom: 40, left: 50 };
  const cW = W - PAD.left - PAD.right;
  const cH = H - PAD.top - PAD.bottom;

  const diff = currentWeight - goalWeight;
  const yMin = goalWeight - diff * 0.2;
  const yMax = currentWeight + diff * 0.1;
  const yRange = yMax - yMin;

  const xPoints = [0, 45, 90];
  const greenPoints = [currentWeight, currentWeight - diff * 0.55, goalWeight];
  const grayPoints = [currentWeight, currentWeight - diff * 0.12, currentWeight - diff * 0.22];

  function toX(day: number) {
    return PAD.left + (day / 90) * cW;
  }
  function toY(w: number) {
    return PAD.top + ((yMax - w) / yRange) * cH;
  }

  const greenPath = xPoints.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(d)},${toY(greenPoints[i])}`).join(' ');
  const grayPath = xPoints.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(d)},${toY(grayPoints[i])}`).join(' ');

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
      {/* Y axis labels */}
      {[currentWeight, Math.round((currentWeight + goalWeight) / 2), goalWeight].map((w, i) => (
        <text key={i} x={PAD.left - 6} y={toY(w) + 4} textAnchor="end" fontSize="10" fill="#93BDB8">
          {w}
        </text>
      ))}

      {/* Grid lines */}
      {[currentWeight, Math.round((currentWeight + goalWeight) / 2), goalWeight].map((w, i) => (
        <line key={i} x1={PAD.left} y1={toY(w)} x2={W - PAD.right} y2={toY(w)} stroke="#ECF8F6" strokeWidth="1" />
      ))}

      {/* Gray line (dieting alone) */}
      <path d={grayPath} fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5,3" />

      {/* Green line (NuPatch) */}
      <path d={greenPath} fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Goal line */}
      <line x1={PAD.left} y1={toY(goalWeight)} x2={W - PAD.right} y2={toY(goalWeight)} stroke="#22c55e" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />

      {/* Data points green */}
      {xPoints.map((d, i) => (
        <circle key={i} cx={toX(d)} cy={toY(greenPoints[i])} r="4" fill="#22c55e" />
      ))}

      {/* X axis labels */}
      {xPoints.map((d, i) => (
        <text key={i} x={toX(d)} y={H - 6} textAnchor="middle" fontSize="11" fill="#71A6A1">
          {d === 0 ? 'Today' : `Day ${d}`}
        </text>
      ))}

      {/* Unit label */}
      <text x={PAD.left - 6} y={PAD.top - 6} textAnchor="end" fontSize="9" fill="#93BDB8">{unit}</text>
    </svg>
  );
}

export default function ResultsGraphScreen({ answers }: ResultsGraphScreenProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { current, goal, unit } = getDisplayWeight(answers);

  const currentNum = parseFloat(current) || 180;
  const goalNum = parseFloat(goal) || 150;

  const toggle = (key: string) => setOpenSection((prev) => (prev === key ? null : key));

  const sections = [
    {
      key: 'cant-lose',
      title: 'Why you can\'t lose weight',
      body: 'Low GLP-1 creates a metabolic cycle that makes weight loss nearly impossible. It fuels sugar cravings, slows down your metabolism, triggers inflammation, and signals your body to STORE fat rather than burn it.',
    },
    {
      key: 'diets-fail',
      title: 'Why diets keep failing',
      body: 'Most diets only restrict calories but ignore the real reason you keep gaining weight. When GLP-1 levels are low, your body enters "famine mode." Calorie restriction just makes it worse — your body thinks it\'s under attack and defends by slowing metabolism and storing fat.',
    },
    {
      key: 'how-help',
      title: 'How can we help you',
      body: 'Instead of fighting your body, NuPatch works WITH it. Our transdermal patch helps restore natural GLP-1 production so you naturally crave less, burn more calories, and feel energized — making weight loss feel effortless rather than exhausting.',
    },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div className={styles.alertBox}>
          ⚠️ You may have low GLP-1 production affecting your metabolism
        </div>

        <p className={styles.intro}>
          You can easily restore your GLP-1 levels and start losing weight easier than you think.
          Find out how NuPatch can help in your personalized plan below.
        </p>

        <div className={styles.chartWrap}>
          <p className={styles.chartTitle}>Your weight loss projection</p>
          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <div className={`${styles.legendDot} ${styles.legendGreen}`} />
              <span>With NuPatch</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendDot} ${styles.legendGray}`} />
              <span>With dieting alone</span>
            </div>
          </div>
          <WeightLossGraph currentWeight={currentNum} goalWeight={goalNum} unit={unit} />
        </div>

        {sections.map((s) => (
          <div key={s.key} className={styles.expandable}>
            <button className={styles.expandHeader} onClick={() => toggle(s.key)}>
              {s.title}
              <span className={`${styles.expandChevron} ${openSection === s.key ? styles.expandChevronOpen : ''}`}>▼</span>
            </button>
            {openSection === s.key && (
              <div className={styles.expandBody}>{s.body}</div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
