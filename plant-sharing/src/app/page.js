"use client";

import styles from "./page.module.css";
import UploadIcon from "@mui/icons-material/Upload";
import SearchIcon from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.mainContent}>
        <div className={styles.hero}>
          <h1>🌱 Welcome to Plant Sharing</h1>
          <p>
            Share your plants, discover new ones, and grow your green community.
          </p>
          <div className={styles.ctas}>
            <Link href="/share" className={styles.primary}>
              Share Your Plant
            </Link>
            <Link href="/plants" className={styles.secondary}>
              Explore Plants
            </Link>
          </div>
        </div>

        <div className={styles.features}>
          <Link href="/share" className={styles.feature}>
            <UploadIcon sx={{ fontSize: 64, color: "#2e7d32" }} />
            <h3>Upload Plants</h3>
            <p>Easily upload photos and details about your plants.</p>
          </Link>

          <Link href="/plants" className={styles.feature}>
            <SearchIcon sx={{ fontSize: 64, color: "#2e7d32" }} />
            <h3>Discover Plants</h3>
            <p>
              Explore a growing collection of plants shared by our community.
            </p>
          </Link>

          <Link href="/plants" className={styles.feature}>
            <PeopleIcon sx={{ fontSize: 64, color: "#2e7d32" }} />
            <h3>Join the Community</h3>
            <p>Connect with other plant lovers and exchange tips.</p>
          </Link>
        </div>
      </div>

      <footer className={styles.footer}>
        <p>© 2025 Plant Sharing. All rights reserved.</p>
      </footer>
    </div>
  );
}
