import styles from './results.module.css';

export default function ResultsPage() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logoText}>NUPATCH</div>
      </header>

      <main className={styles.main}>
        {/* 1. Comfort & Validation */}
        <section className={styles.comfortSection}>
          <p className={styles.comfortText}>
            You&apos;re not alone. <strong>73% of women over 40</strong> experience declining GLP-1 production,
            leading to metabolic resistance and hormonal weight gain.
          </p>
        </section>

        {/* 2. Bad News / Root Cause */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Based on your quiz results, the real problem is{' '}
            <span className={styles.accent}>low GLP-1 production</span>
          </h2>

          <div className={styles.badNewsBox}>
            <p className={styles.boxIntro}>Here&apos;s what that means:</p>
            <ul className={styles.badList}>
              <li>Your body thinks it&apos;s in famine mode (even when you&apos;re eating enough)</li>
              <li>Your metabolism has slowed by 200–400 calories/day</li>
              <li>Your body is storing fat instead of burning it</li>
              <li>Your hunger signals are amplified (making you feel ravenous)</li>
            </ul>
          </div>

          <p className={styles.bodyText}>
            That&apos;s why calorie restriction made you gain weight. That&apos;s why keto only worked temporarily.
            That&apos;s why your body stopped responding at 40.
          </p>
          <p className={styles.bodyText}>
            You weren&apos;t failing. Your GLP-1 declined — and your body did what it&apos;s biologically programmed to do:{' '}
            <strong>DEFEND YOU</strong>.
          </p>
          <p className={styles.bodyText}>
            But here&apos;s what really got stolen: Your confidence. The way you used to walk into a room without
            apologizing for existing. The feeling of being SEEN instead of invisible. The energy to show up fully
            in your own life.
          </p>
          <p className={styles.emphasis}>
            That&apos;s what low GLP-1 took from you — not just pounds, but YOU.
          </p>
        </section>

        {/* 3. Good News / Solution */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            The solution is <span className={styles.accent}>NuPatch&apos;s transdermal GLP-1 restoration technology</span>
          </h2>

          <div className={styles.goodNewsBox}>
            <p className={styles.boxIntro}>Here&apos;s how it solves your specific problem:</p>
            <ul className={styles.goodList}>
              <li>✅ Delivers active compounds through your skin (bypassing digestive breakdown)</li>
              <li>✅ Supports natural GLP-1 production (not synthetic replacement like injections)</li>
              <li>✅ Signals your body it&apos;s SAFE to burn fat again</li>
              <li>✅ Normalizes appetite and cravings within 2–3 weeks</li>
            </ul>
          </div>

          <p className={styles.emphasis}>
            But more importantly: You&apos;ll start feeling like YOURSELF again. People will notice you when you
            walk into a room. You&apos;ll stop hiding in the back of photos. You&apos;ll catch your reflection and
            not immediately look away.
          </p>
          <p className={styles.bodyText}>
            <strong>This isn&apos;t about the scale. It&apos;s about getting your identity back.</strong>
          </p>
        </section>

        {/* 4. Pitch & Close */}
        <section className={styles.pitchSection}>
          <div className={styles.offerBox}>
            <div className={styles.guarantee}>🛡️ 180-Day Money-Back Guarantee</div>
            <h3 className={styles.offerTitle}>Your 3-Month NuPatch Plan</h3>
            <p className={styles.offerSub}>
              Based on your quiz results, we recommend the 3-month supply — exactly what your body needs
              to restore GLP-1 and feel like yourself again.
            </p>

            <div className={styles.urgency}>
              ⏰ Your personalized discount expires in <strong>24 hours</strong>
            </div>

            <a href="#" className={styles.ctaButton}>
              CLAIM YOUR DISCOUNT &amp; FEEL LIKE YOURSELF AGAIN →
            </a>

            <p className={styles.socialProof}>
              Join <strong>10,876 women</strong> who&apos;ve restored their GLP-1 and gotten their identity back
            </p>

            <p className={styles.guaranteeNote}>
              If you don&apos;t feel more confident, energized, and visible within 90 days,
              we&apos;ll refund every penny. No questions asked.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
