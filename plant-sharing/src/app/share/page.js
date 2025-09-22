"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [name, setName] = useState("");
  const [ownerMail, setOwnerMail] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select an image");
      setAlertType("error");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("ownerMail", ownerMail);
    formData.append("address", address);

    const res = await fetch("/api/upload", { method: "POST", body: formData });

    if (res.ok) {
      setMessage("Plant shared successfully!");
      setAlertType("success");
      setName("");
      setOwnerMail("");
      setAddress("");
      setFile(null);
      setPreview(null);
      setTimeout(() => router.push("/plants"), 1000);
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

          <Button variant="outlined" component="label">
            Select Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>

          {preview && (
            <Box
              component="img"
              src={preview}
              alt="preview"
              sx={{ width: "100%", borderRadius: 2, mt: 1 }}
            />
          )}

          <Button type="submit" variant="contained" color="success">
            Share Plant
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
