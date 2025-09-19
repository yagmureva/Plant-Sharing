import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <h1>🌱 Welcome to Plant Sharing</h1>
          <p>
            Share your plants, discover new ones, and grow your green community.
          </p>
          <div className={styles.ctas}>
            <a href="/share" className={styles.primary}>
              Share Your Plant
            </a>
            <a href="/plants" className={styles.secondary}>
              Explore Plants
            </a>
          </div>
        </div>

        {/* Feature Section */}
        <div className={styles.features}>
          <div className={styles.feature}>
            <Image src="/upload.svg" alt="Upload" width={64} height={64} />
            <h3>Upload Plants</h3>
            <p>Easily upload photos and details about your plants.</p>
          </div>
          <div className={styles.feature}>
            <Image src="/discover.svg" alt="Discover" width={64} height={64} />
            <h3>Discover Plants</h3>
            <p>
              Explore a growing collection of plants shared by our community.
            </p>
          </div>
          <div className={styles.feature}>
            <Image
              src="/community.svg"
              alt="Community"
              width={64}
              height={64}
            />
            <h3>Join the Community</h3>
            <p>Connect with other plant lovers and exchange tips.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2025 Plant Sharing. All rights reserved.</p>
      </footer>
    </div>
  );
}
