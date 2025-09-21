"use client";

import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Container,
  Paper,
} from "@mui/material";

export default function SharePage() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ownerMail, setOwnerMail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("success"); // success veya error

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, imageUrl, ownerMail, address }),
    });

    if (res.ok) {
      setMessage("Plant shared successfully!");
      setAlertType("success");
      setName("");
      setImageUrl("");
      setOwnerMail("");
      setAddress("");
    } else {
      const data = await res.json();
      setMessage(data.error || "Something went wrong");
      setAlertType("error");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4 }} elevation={3}>
        <Typography variant="h4" gutterBottom align="center">
          Share Your Plant 🌱
        </Typography>

        {message && (
          <Alert severity={alertType} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Plant Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          <TextField
            label="Your Email"
            type="email"
            value={ownerMail}
            onChange={(e) => setOwnerMail(e.target.value)}
            required
          />
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="success">
            Share Plant
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
