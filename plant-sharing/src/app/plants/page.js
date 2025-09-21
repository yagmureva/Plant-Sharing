"use client";

import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
} from "@mui/material";

export default function PlantsPage() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("/api/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        All Plants 🌿
      </Typography>
      <Grid container spacing={3}>
        {plants.map((plant) => (
          <Grid item xs={12} sm={6} md={4} key={plant.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={plant.imageUrl}
                alt={plant.name}
              />
              <CardContent>
                <Typography variant="h6">{plant.name}</Typography>
                <Typography variant="body2">
                  Email: {plant.ownerMail}
                </Typography>
                <Typography variant="body2">
                  Address: {plant.address}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
