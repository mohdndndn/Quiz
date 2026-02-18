import { NuPatchLogo, BackArrowIcon } from '@/components/icons';
import styles from './Header.module.css';

interface HeaderProps {
  onBack: () => void;
  isFirstScreen: boolean;
  currentNumber: number;
  totalNumber: number;
}

export default function Header({ onBack, isFirstScreen, currentNumber, totalNumber }: HeaderProps) {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={onBack}
          disabled={isFirstScreen}
          aria-label="Go back"
        >
          <BackArrowIcon />
          <span className={styles.backLabel}>Back</span>
        </button>

        <div className={styles.logoWrapper}>
          <NuPatchLogo />
        </div>

        <div className={styles.counter}>
          {currentNumber} <span className={styles.counterSpan}>of {totalNumber}</span>
        </div>
      </div>
    </div>
  );
}
