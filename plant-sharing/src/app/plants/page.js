"use client";

import { useEffect, useState } from "react";

export default function PlantsPage() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("/api/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>All Plants 🌿</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {plants.map((plant) => (
          <div
            key={plant.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
            }}
          >
            <img
              src={plant.imageUrl}
              alt={plant.name}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <h2>{plant.name}</h2>
            <p>Email: {plant.ownerMail}</p>
            <p>Address: {plant.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
