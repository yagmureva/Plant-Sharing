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
  CardActions,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";

export default function PlantsPage() {
  const router = useRouter();
  const [plants, setPlants] = useState(null);
  const [editPlant, setEditPlant] = useState(null);

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

  if (plants === null) {
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
        <Typography mt={2}>Loading plants...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      {/* Header with title and back button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          🌿 Shared Plants
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<HomeIcon />}
          onClick={() => router.push("/")}
        >
          Back to Home
        </Button>
      </Box>

      {plants.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No plants shared yet. Be the first to add one!
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {plants.map((plant) => (
            <Grid item xs={12} sm={6} md={4} key={plant.id}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: 4,
                  transition: "0.3s",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": { transform: "scale(1.03)", boxShadow: 8 },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={plant.imageUrl}
                  alt={plant.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "success.main" }}
                  >
                    {plant.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Email:</strong> {plant.ownerMail}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Address:</strong> {plant.address}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(plant.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => setEditPlant(plant)}
                  >
                    <EditIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Edit Dialog */}
      {editPlant && (
        <Dialog
          open
          onClose={() => setEditPlant(null)}
          PaperProps={{
            sx: { borderRadius: 3, p: 2, minWidth: 400 },
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Edit Plant 🌱
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Name"
              value={editPlant.name}
              onChange={(e) =>
                setEditPlant({ ...editPlant, name: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Email"
              value={editPlant.ownerMail}
              onChange={(e) =>
                setEditPlant({ ...editPlant, ownerMail: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Address"
              value={editPlant.address}
              onChange={(e) =>
                setEditPlant({ ...editPlant, address: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Image URL"
              value={editPlant.imageUrl}
              onChange={(e) =>
                setEditPlant({ ...editPlant, imageUrl: e.target.value })
              }
              fullWidth
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
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
