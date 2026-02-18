import styles from './InfoCardScreen.module.css';

type InfoType = 'identity-crisis' | 'why-solutions-fail';

interface InfoCardScreenProps {
  type: InfoType;
}

function IdentityCrisisCard() {
  return (
    <div className={styles.identityCard}>
      <h2 className={styles.identityTitle}>
        What You&apos;re Really Losing{' '}
        <span className={styles.identityTitleAccent}>(And It&apos;s Not Just The Number On The Scale)</span>
      </h2>
      <p className={styles.identityBody}>
        You&apos;ve been working hard. Eating right. Exercising. Tracking everything.
      </p>
      <p className={styles.identityBody}>But here&apos;s what&apos;s really been slipping away:</p>
      <ul className={styles.identityList}>
        <li className={styles.identityListItem}>The way you used to walk into a room with your head up.</li>
        <li className={styles.identityListItem}>The confidence you had at 35.</li>
        <li className={styles.identityListItem}>The feeling of being SEEN when you&apos;re standing right there.</li>
        <li className={styles.identityListItem}>The ease of catching your reflection and not immediately looking away.</li>
      </ul>
      <p className={styles.identityBody}>
        You&apos;re not fighting to lose weight. You&apos;re fighting to feel like <strong>YOURSELF</strong> again.
      </p>
      <p className={styles.identityBody}>
        And that&apos;s exactly what declining GLP-1 has stolen from you — not just your metabolism, but your identity.
      </p>
      <p className={styles.identityClose}>The good news? You can get it back.</p>
    </div>
  );
}

function WhySolutionsFailCard() {
  return (
    <div className={styles.failCard}>
      <h2 className={styles.failTitle}>Why Most Solutions Fail</h2>
      <p className={styles.failIntro}>
        Most weight loss programs focus on RESTRICTING calories or REPLACING meals — but they ignore the root cause.
      </p>
      <p className={styles.failIntro}>
        When your GLP-1 levels are low, your body thinks it&apos;s in <strong>FAMINE MODE</strong>.
      </p>
      <p className={styles.failIntro}>
        Every calorie you restrict? Your body sees it as DANGER. Every diet you try? Your body interprets it as ATTACK.
      </p>
      <div className={styles.failBox}>
        <p className={styles.failBoxTitle}>That&apos;s why:</p>
        <ul className={styles.failList}>
          <li className={styles.failListItem}>
            ❌ Calorie restriction makes you GAIN weight (your body slows metabolism to survive)
          </li>
          <li className={styles.failListItem}>
            ❌ Keto works temporarily, then rebounds (doesn&apos;t restore GLP-1)
          </li>
          <li className={styles.failListItem}>
            ❌ Injections work but create dependency (synthetic replacement, not restoration)
          </li>
        </ul>
      </div>
      <div className={styles.failClose}>
        <p className={styles.failCloseTitle}>The NuPatch difference:</p>
        <p>
          NuPatch uses transdermal delivery to help your body RESTORE its own natural GLP-1 production —
          so your body finally feels SAFE again. And when your body feels safe, everything changes.
        </p>
      </div>
    </div>
  );
}

export default function InfoCardScreen({ type }: InfoCardScreenProps) {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        {type === 'identity-crisis' && <IdentityCrisisCard />}
        {type === 'why-solutions-fail' && <WhySolutionsFailCard />}
      </div>
    </main>
  );
}
