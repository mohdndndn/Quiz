import { RightArrowIcon } from '@/components/icons';
import styles from './BottomPanel.module.css';

interface BottomPanelProps {
  onNext: () => void;
  isEnabled: boolean;
  label?: string;
}

export default function BottomPanel({ onNext, isEnabled, label = 'Next' }: BottomPanelProps) {
  const isClaim = label === 'CLAIM YOUR DISCOUNT';
  return (
    <div className={styles.panel}>
      <div className={styles.buttonWrap}>
        <button
          className={`${styles.button} ${isClaim ? styles.ctaClaim : ''}`}
          onClick={onNext}
          disabled={!isEnabled}
          aria-label={label}
        >
          {label}
          <RightArrowIcon />
        </button>
      </div>
    </div>
  );
}
