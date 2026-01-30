import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Alert,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function MyReservations({
  reservations,
  setReservations,
  rooms,
}) {
  const [selected, setSelected] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [alert, setAlert] = useState("");

  const getRoomObj = (roomName) =>
    rooms?.find((r) => r.name === String(roomName));

  const handleShowDetails = (res) => {
    setSelected(res);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelected(null);
  };

  const handleCancel = () => {
    setReservations((prev) =>
      prev.map((r) =>
        r.id === selected.id ? { ...r, status: "Anulowana" } : r,
      ),
    );
    setAlert("Rezerwacja została anulowana.");
    handleCloseDetails();
  };

  const handlePay = () => {
    setReservations((prev) =>
      prev.map((r) => (r.id === selected.id ? { ...r, paid: true } : r)),
    );
    setAlert("Płatność została zrealizowana.");
    handleCloseDetails();
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Moje rezerwacje
      </Typography>
      {alert && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setAlert("")}>
          {alert}
        </Alert>
      )}
      <Stack spacing={3}>
        {reservations.length === 0 ? (
          <Alert severity="info">Brak rezerwacji.</Alert>
        ) : (
          reservations.map((res) => (
            <Card key={res.id}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {getRoomObj(res.room)?.img && (
                    <img
                      src={getRoomObj(res.room).img}
                      alt={res.room}
                      style={{
                        width: 120,
                        height: 90,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  )}
                  <Box>
                    <Typography variant="subtitle1">
                      Pokój {res.room}
                    </Typography>
                    <Typography variant="body2">
                      {getRoomObj(res.room)?.type
                        ? getRoomObj(res.room).type
                        : res.type}
                    </Typography>
                    <Typography variant="body2">
                      {res.dateFrom} - {res.dateTo}
                    </Typography>
                    <Typography variant="body2">Gości: {res.guests}</Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <Chip
                        label={res.status}
                        color={res.status === "Aktywna" ? "primary" : "default"}
                        size="small"
                      />
                      {res.paid && (
                        <Chip label="Opłacona" color="success" size="small" />
                      )}
                    </Stack>
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  onClick={() => handleShowDetails(res)}
                >
                  Szczegóły
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>
      <Dialog open={showDetails} onClose={handleCloseDetails}>
        <DialogTitle>Szczegóły rezerwacji</DialogTitle>
        <DialogContent>
          {selected && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              {getRoomObj(selected.room)?.img && (
                <img
                  src={getRoomObj(selected.room).img}
                  alt={selected.room}
                  style={{
                    width: 180,
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              )}
              <Box>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Pokój: <b>{selected.room}</b> (
                  {getRoomObj(selected.room)?.type
                    ? getRoomObj(selected.room).type
                    : selected.type}
                  )
                </Typography>
                <Typography variant="body2">
                  Termin: {selected.dateFrom} - {selected.dateTo}
                </Typography>
                <Typography variant="body2">
                  Gości: {selected.guests}
                </Typography>
                <Typography variant="body2">
                  Cena: {selected.price} zł / noc
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Chip
                    label={selected.status}
                    color={
                      selected.status === "Aktywna" ? "primary" : "default"
                    }
                    size="small"
                  />
                  {selected.paid && (
                    <Chip label="Opłacona" color="success" size="small" />
                  )}
                </Stack>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {selected && selected.status === "Aktywna" && !selected.paid && (
            <Button onClick={handlePay} color="success">
              Opłać
            </Button>
          )}
          {selected && selected.status === "Aktywna" && !selected.paid && (
            <Button onClick={handleCancel} color="error">
              Anuluj
            </Button>
          )}
          <Button onClick={handleCloseDetails}>Zamknij</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
