import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Stack,
  Alert,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ROOM_TYPES } from "../data/rooms";

const STEP = {
  ROOM: "ROOM",
  DATES: "DATES",
  SUMMARY: "SUMMARY",
  SUCCESS: "SUCCESS",
};

export default function RoomReservation({
  reservations,
  setReservations,
  rooms,
}) {
  const [step, setStep] = useState(STEP.ROOM);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [guests, setGuests] = useState(1);
  const [reservationData, setReservationData] = useState({
    name: "",
    email: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const getDisabledDates = () => {
    if (!selectedRoom) return [];
    return reservations
      .filter((r) => r.room === selectedRoom.name)
      .map((r) => ({ from: new Date(r.dateFrom), to: new Date(r.dateTo) }));
  };

  const isDateDisabled = (date) => {
    const disabled = getDisabledDates();
    return disabled.some(({ from, to }) => date >= from && date <= to);
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setGuests(ROOM_TYPES.find((t) => t.value === room.type)?.maxGuests || 1);
    setStep(STEP.DATES);
    setError("");
  };

  const handleDatesNext = () => {
    if (!dateFrom || !dateTo) {
      setError("Wybierz zakres dat.");
      return;
    }
    if (dateFrom > dateTo) {
      setError("Data końcowa musi być po początkowej.");
      return;
    }
    setStep(STEP.SUMMARY);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReservation = {
      id:
        reservations.length > 0
          ? Math.max(...reservations.map((r) => r.id)) + 1
          : 1,
      room: selectedRoom.name,
      type: ROOM_TYPES.find((t) => t.value === selectedRoom.type)?.label,
      dateFrom: dateFrom.toISOString().slice(0, 10),
      dateTo: dateTo.toISOString().slice(0, 10),
      guests,
      status: "Aktywna",
      price: selectedRoom.price,
      paid: false,
      name: reservationData.name,
      email: reservationData.email,
    };
    setReservations([...reservations, newReservation]);
    setSuccess(true);
    setStep(STEP.SUCCESS);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Rezerwacja pokoju hotelowego
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {step === STEP.ROOM && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Wybierz pokój
            </Typography>
            <Stack spacing={2}>
              {rooms.filter(
                (r) =>
                  r.available && ["single", "double", "suite"].includes(r.type),
              ).length === 0 ? (
                <Alert severity="info">
                  Brak dostępnych pokoi – wszystkie pokoje są obecnie wyłączone
                  z dostępności przez obsługę.
                </Alert>
              ) : (
                rooms
                  .filter(
                    (r) =>
                      r.available &&
                      ["single", "double", "suite"].includes(r.type),
                  )
                  .map((room) => (
                    <Card
                      key={room.id}
                      variant={
                        selectedRoom?.id === room.id ? "outlined" : undefined
                      }
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <img
                            src={room.img}
                            alt={room.name}
                            style={{
                              width: 180,
                              height: 120,
                              objectFit: "cover",
                              borderRadius: 8,
                            }}
                          />
                          <Box>
                            <Typography variant="subtitle1">
                              Pokój {room.name}
                            </Typography>
                            <Typography variant="body2">
                              Typ:{" "}
                              {
                                ROOM_TYPES.find((t) => t.value === room.type)
                                  ?.label
                              }
                            </Typography>
                            <Typography variant="body2">
                              Cena: {room.price} zł / noc
                            </Typography>
                          </Box>
                        </Box>
                        <Button
                          variant="contained"
                          onClick={() => handleRoomSelect(room)}
                        >
                          Wybierz
                        </Button>
                      </CardContent>
                    </Card>
                  ))
              )}
            </Stack>
          </CardContent>
        </Card>
      )}
      {step === STEP.DATES && selectedRoom && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Wybierz daty i liczbę gości
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={2}>
                <DatePicker
                  label="Data od"
                  value={dateFrom}
                  onChange={setDateFrom}
                  shouldDisableDate={isDateDisabled}
                  minDate={new Date()}
                  format="yyyy-MM-dd"
                />
                <DatePicker
                  label="Data do"
                  value={dateTo}
                  onChange={setDateTo}
                  shouldDisableDate={isDateDisabled}
                  minDate={dateFrom || new Date()}
                  format="yyyy-MM-dd"
                />
                <TextField
                  label="Liczba gości"
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  slotProps={{
                    htmlInput: {
                      min: 1,
                      max:
                        ROOM_TYPES.find((t) => t.value === selectedRoom.type)
                          ?.maxGuests || 1,
                    },
                  }}
                  required
                />
                <Button variant="contained" onClick={handleDatesNext}>
                  Dalej
                </Button>
                <Button onClick={() => setStep(STEP.ROOM)}>
                  Wróć do wyboru pokoju
                </Button>
              </Stack>
            </LocalizationProvider>
          </CardContent>
        </Card>
      )}
      {step === STEP.SUMMARY && selectedRoom && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Podsumowanie rezerwacji
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Pokój: <b>{selectedRoom.name}</b> (
              {ROOM_TYPES.find((t) => t.value === selectedRoom.type)?.label})
              <br />
              Cena: <b>{selectedRoom.price} zł / noc</b>
              <br />
              Termin: <b>{dateFrom?.toLocaleDateString()}</b> -{" "}
              <b>{dateTo?.toLocaleDateString()}</b>
              <br />
              Liczba gości: <b>{guests}</b>
            </Typography>
            <Stack spacing={2} component="form" onSubmit={handleSubmit}>
              <TextField
                label="Imię i nazwisko"
                name="name"
                value={reservationData.name}
                onChange={(e) =>
                  setReservationData({
                    ...reservationData,
                    name: e.target.value,
                  })
                }
                required
                fullWidth
              />
              <TextField
                label="E-mail"
                name="email"
                value={reservationData.email}
                onChange={(e) =>
                  setReservationData({
                    ...reservationData,
                    email: e.target.value,
                  })
                }
                required
                fullWidth
                type="email"
              />
              <Button type="submit" variant="contained">
                Potwierdź rezerwację
              </Button>
            </Stack>
            <Button sx={{ mt: 2 }} onClick={() => setStep(STEP.DATES)}>
              Wróć do wyboru dat
            </Button>
          </CardContent>
        </Card>
      )}
      {step === STEP.SUCCESS && success && (
        <Alert severity="success">
          Rezerwacja została zapisana! Potwierdzenie wysłano na e-mail.
        </Alert>
      )}
    </Box>
  );
}
