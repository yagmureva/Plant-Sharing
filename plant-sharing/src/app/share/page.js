"use client";

import { useState } from "react";

export default function SharePage() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ownerMail, setOwnerMail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, imageUrl, ownerMail, address }),
    });

    if (res.ok) {
      setMessage("Plant shared successfully!");
      setName("");
      setImageUrl("");
      setOwnerMail("");
      setAddress("");
    } else {
      const data = await res.json();
      setMessage(data.error || "Something went wrong");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Share Your Plant 🌱</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
        }}
      >
        <input
          type="text"
          placeholder="Plant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={ownerMail}
          onChange={(e) => setOwnerMail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit">Share Plant</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
