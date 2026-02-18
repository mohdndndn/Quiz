'use client';

import * as Icons from '@/components/icons';
import { QuizOption } from '@/types/quiz';
import { CheckmarkIcon } from '@/components/icons';
import styles from './SelectScreen.module.css';

interface SelectScreenProps {
  title: string;
  subtitle?: string;
  options: QuizOption[];
  selectedIds: string[];
  isMulti: boolean;
  onToggle: (id: string) => void;
}

export default function SelectScreen({
  title,
  subtitle,
  options,
  selectedIds,
  isMulti,
  onToggle,
}: SelectScreenProps) {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        <div className={styles.options}>
          {options.map((option) => {
            const isSelected = selectedIds.includes(option.id);
            const IconComponent = (Icons as Record<string, React.FC>)[option.iconName] ?? Icons.CheckCircleIcon;

            return (
              <button
                key={option.id}
                className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
                onClick={() => onToggle(option.id)}
                aria-pressed={isSelected}
                role={isMulti ? 'checkbox' : 'radio'}
                aria-label={option.label}
              >
                <div className={styles.cardLeft}>
                  <div className={styles.iconCircle}>
                    <IconComponent />
                  </div>
                  <div className={styles.labelBlock}>
                    <span className={styles.label}>{option.label}</span>
                    {option.subtitle && (
                      <span className={styles.emotionalSubtitle}>{option.subtitle}</span>
                    )}
                  </div>
                </div>

                <div className={styles.checkboxWrap}>
                  <div className={`${styles.checkmark} ${isSelected ? styles.checkmarkVisible : ''}`}>
                    <CheckmarkIcon />
                  </div>
                  <input
                    type="checkbox"
                    readOnly
                    checked={isSelected}
                    className={`${styles.checkbox} ${isSelected ? styles.checkboxChecked : ''}`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
