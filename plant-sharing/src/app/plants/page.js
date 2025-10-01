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
    <Container sx={{ maxWidth: 900, mt: 6, mb: 6, px: 2 }}>
      {/* Header */}
      <Typography
        variant="h3"
        align="center"
        sx={{ mb: 4, color: "#2e7d32", fontWeight: "bold" }}
      >
        🌿 Shared Plants
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
        }}
      >
        {plants.length === 0 ? (
          <Typography
            align="center"
            color="text.secondary"
            sx={{ width: "100%" }}
          >
            No plants shared yet. Be the first to add one!
          </Typography>
        ) : (
          plants.map((plant) => (
            <Card
              key={plant.id}
              sx={{
                width: 250,
                backgroundColor: "#f4f4f4",
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={plant.imageUrl}
                alt={plant.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography
                  sx={{ fontWeight: "bold", color: "#2e7d32", mb: 0.5 }}
                >
                  {plant.name}
                </Typography>
                <Typography sx={{ fontSize: "0.95rem", color: "#555", mb: 1 }}>
                  {plant.address}
                </Typography>
                <Typography sx={{ fontSize: "0.9rem", color: "#777" }}>
                  Owner: {plant.ownerMail}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end", p: 1 }}>
                <IconButton
                  onClick={() => handleDelete(plant.id)}
                  sx={{ color: "#f79292ff" }} // kırmızı yerine kendi renk
                >
                  <DeleteIcon />
                </IconButton>

                <IconButton
                  onClick={() => setEditPlant(plant)}
                  sx={{ color: "#2e7d32" }} // yeşil örnek
                >
                  <EditIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))
        )}
      </Box>

      {/* Edit Dialog */}
      {editPlant && (
        <Dialog
          open
          onClose={() => setEditPlant(null)}
          PaperProps={{ sx: { borderRadius: 3, p: 2, minWidth: 400 } }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Edit Plant 🌱
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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

      {/* Back Button */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<HomeIcon />}
          onClick={() => router.push("/")}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}
