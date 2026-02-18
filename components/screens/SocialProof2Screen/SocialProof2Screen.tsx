import styles from './SocialProof2Screen.module.css';

const REVIEWS = [
  {
    name: 'Lisa O.',
    emoji: '👩‍🦰',
    text: '"This really helped me with weight. Lost 14 lbs that never came back!"',
  },
  {
    name: 'Michelle G.',
    emoji: '👩‍🦱',
    text: '"Restoring your GLP-1 is probably the best thing you can do for your metabolism."',
  },
  {
    name: 'Diana C.',
    emoji: '👩',
    text: '"I wish I\'d found NuPatch sooner. It helped me achieve my weight goal and then some."',
  },
  {
    name: 'Sarah M.',
    emoji: '👩‍🦳',
    text: '"I use the patch daily and finally feel and look lighter. Lost 16 lbs too!"',
  },
];

const MEDIA = ['BUSINESS INSIDER', 'Healthline', 'SPORTS ILLUSTRATED', "Women's Health"];

export default function SocialProof2Screen() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <p className={styles.header}>
          But don&apos;t just take our word for it. Hear what others are saying about NuPatch:
        </p>

        <div className={styles.reviewGrid}>
          {REVIEWS.map((r) => (
            <div key={r.name} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.avatar}>{r.emoji}</div>
                <div>
                  <div className={styles.reviewerName}>{r.name}</div>
                  <div className={styles.verified}>✓ Verified</div>
                </div>
              </div>
              <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
              <p className={styles.reviewText}>{r.text}</p>
            </div>
          ))}
        </div>

        <div className={styles.mediaSection}>
          <div className={styles.mediaTitle}>GLP-1 research covered in:</div>
          <div className={styles.mediaLogos}>
            {MEDIA.map((m) => (
              <div key={m} className={styles.mediaLogo}>{m}</div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
