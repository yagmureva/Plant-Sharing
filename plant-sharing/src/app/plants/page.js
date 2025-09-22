"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Button,
  Dialog,
  TextField,
  Box,
  Stack,
  CircularProgress,
} from "@mui/material";

export default function PlantsPage() {
  const router = useRouter();
  const [plants, setPlants] = useState(null); // null for SSR-safe hydration
  const [editPlant, setEditPlant] = useState(null);

  // Fetch plants on client only
  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const res = await fetch("/api/plants");
      const data = await res.json();
      setPlants(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    await fetch("/api/plants", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchPlants();
  };

  const handleUpdate = async () => {
    const { id, name, ownerMail, address, imageUrl } = editPlant;
    await fetch("/api/plants", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, ownerMail, address, imageUrl }),
    });
    setEditPlant(null);
    fetchPlants();
  };

  // Render loading state for SSR-safe hydration
  if (plants === null) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
        <Typography mt={2}>Loading plants...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        All Plants 🌿
      </Typography>

      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/")}
        >
          Back to Home
        </Button>
      </Box>

      {plants.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No plants shared yet.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {plants.map((plant) => (
            <Grid item xs={12} sm={6} md={4} key={plant.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={plant.imageUrl}
                  alt={plant.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {plant.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {plant.ownerMail}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Address: {plant.address}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(plant.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="secondary"
                      onClick={() => setEditPlant(plant)}
                    >
                      Edit
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Edit Dialog */}
      {editPlant && (
        <Dialog open onClose={() => setEditPlant(null)}>
          <Box
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minWidth: 300,
            }}
          >
            <TextField
              label="Name"
              value={editPlant.name}
              onChange={(e) =>
                setEditPlant({ ...editPlant, name: e.target.value })
              }
            />
            <TextField
              label="Email"
              value={editPlant.ownerMail}
              onChange={(e) =>
                setEditPlant({ ...editPlant, ownerMail: e.target.value })
              }
            />
            <TextField
              label="Address"
              value={editPlant.address}
              onChange={(e) =>
                setEditPlant({ ...editPlant, address: e.target.value })
              }
            />
            <TextField
              label="Image URL"
              value={editPlant.imageUrl}
              onChange={(e) =>
                setEditPlant({ ...editPlant, imageUrl: e.target.value })
              }
            />
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                color="success"
                onClick={handleUpdate}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setEditPlant(null)}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </Dialog>
      )}
    </Container>
  );
}
