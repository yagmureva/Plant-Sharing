"use client";

import { useState } from "react";
import styles from "./share.module.css";

export default function SharePlant() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/plants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          ownerId: 1, // demo user
        }),
      });
      if (res.ok) {
        setMessage("Plant shared successfully!");
        setTitle("");
        setDescription("");
        setImageUrl("");
      } else {
        setMessage("Failed to share plant.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error occurred.");
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Share Your Plant 🌱</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Plant Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.inputField}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textareaField}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className={styles.inputField}
          required
        />
        <button type="submit" className={styles.submitButton}>
          Share Plant
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
