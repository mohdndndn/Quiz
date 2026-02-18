import styles from './SocialProof1Screen.module.css';

export default function SocialProof1Screen() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <p className={styles.header}>
          But don&apos;t just take our word for it. Hear what others are saying about NuPatch:
        </p>

        <div className={styles.beforeAfter}>
          <div className={`${styles.imageBox} ${styles.imageBoxBefore}`}>
            <span>😔</span>
            <span className={styles.imageLabel}>Before</span>
          </div>
          <div className={`${styles.imageBox} ${styles.imageBoxAfter}`}>
            <span>😊</span>
            <span className={styles.imageLabel}>After</span>
          </div>
        </div>

        <div className={styles.ratingRow}>
          <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
          <div className={styles.ratingText}>
            <span className={styles.ratingBold}>4.5 out of 5</span> · 10,876 active users
          </div>
        </div>

        <div className={styles.reviewCard}>
          <div className={styles.reviewHeader}>
            <div className={styles.avatar}>👩</div>
            <div className={styles.reviewerInfo}>
              <span className={styles.reviewerName}>Jennifer M., 52</span>
              <span className={styles.verified}>✓ Verified Customer</span>
            </div>
          </div>
          <p className={styles.reviewBody}>
            &ldquo;Before NuPatch, I&apos;d lost myself. I avoided mirrors. Declined dinner invitations.
            Stood in the back of photos. My daughter&apos;s friends used to say I was &lsquo;the cool mom.&rsquo;
            Now they barely looked at me.
            <br /><br />
            Everything changed when I started using NuPatch. Within 4 weeks,{' '}
            <span className={styles.reviewHighlight}>the constant hunger finally stopped.</span>{' '}
            By week 8, I had energy again. But here&apos;s what shocked me most:
            <br /><br />
            <span className={styles.reviewHighlight}>People started SEEING me again.</span>
            <br /><br />
            A stranger at the coffee shop smiled and held the door. My husband started grabbing my hand in public again.
            My daughter&apos;s friend Emma asked, &lsquo;Mrs. M, what are you DOING? You look amazing.&rsquo;
            <br /><br />
            I lost 18 pounds in 10 weeks. But what I really got back was{' '}
            <span className={styles.reviewHighlight}>ME.</span>{' '}
            The woman I used to be. The confidence I thought was gone forever.
            <br /><br />
            If you don&apos;t recognize yourself anymore, you owe it to yourself to try NuPatch.
            This isn&apos;t about weight. It&apos;s about getting your LIFE back.&rdquo;
          </p>
        </div>
      </div>
    </main>
  );
}
