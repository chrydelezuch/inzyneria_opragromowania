import { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import { ROOMS } from "../data/rooms";

export default function ManageAvailability({ services, setServices }) {
  const [localServices, setLocalServices] = useState(services);
  const [changed, setChanged] = useState(false);

  const handleToggle = (id) => {
    setLocalServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, available: !s.available } : s)),
    );
    setChanged(true);
  };

  const handleSave = () => {
    setServices(localServices);
    setChanged(false);
  };

  const handleCancel = () => {
    setLocalServices(services);
    setChanged(false);
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Zarządzanie dostępnością zasobów
      </Typography>
      <Stack spacing={2}>
        {localServices.map((room) => (
          <Paper
            key={room.id}
            sx={{
              p: 2,
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <img
                src={room.img}
                alt={room.name}
                style={{
                  width: 180,
                  height: 120,
                  objectFit: "cover",
                  borderRadius: 6,
                }}
              />
              <Box>
                <Typography variant="subtitle1">
                  {["single", "double", "suite"].includes(room.type)
                    ? `Pokój ${room.name}`
                    : room.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Typ: {room.type}, Cena: {room.price} zł
                </Typography>
              </Box>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={room.available}
                  onChange={() => handleToggle(room.id)}
                  color="primary"
                />
              }
              label={
                <Box sx={{ minWidth: 90, textAlign: "right" }}>
                  {room.available ? "Dostępny" : "Niedostępny"}
                </Box>
              }
            />
          </Paper>
        ))}
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 3, justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={!changed}
        >
          Zapisz zmiany
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleCancel}
          disabled={!changed}
        >
          Anuluj zmiany
        </Button>
      </Stack>
    </Box>
  );
}
