"use client";

import { useEffect, useState } from "react";
import styles from "./plants.module.css";

export default function Plants() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    async function fetchPlants() {
      const res = await fetch("/api/plants");
      const data = await res.json();
      setPlants(data);
    }
    fetchPlants();
  }, []);

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Plants 🌱</h1>
      <div className={styles.list}>
        {plants.map((plant) => (
          <div key={plant.id} className={styles.card}>
            <img
              src={plant.imageUrl}
              alt={plant.title}
              className={styles.cardImage}
            />
            <h3 className={styles.cardTitle}>{plant.title}</h3>
            <p className={styles.cardDescription}>{plant.description}</p>
            <small className={styles.cardOwner}>
              Shared by: {plant.owner.name}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
