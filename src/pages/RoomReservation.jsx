import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Stack,
  Alert,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const ROOM_TYPES = [
  { value: "single", label: "Jednoosobowy" },
  { value: "double", label: "Dwuosobowy" },
  { value: "suite", label: "Apartament" },
];

const ROOMS = [
  { id: 101, type: "single", name: "101", price: 200 },
  { id: 102, type: "double", name: "102", price: 300 },
  { id: 201, type: "suite", name: "201", price: 500 },
  { id: 202, type: "double", name: "202", price: 320 },
  { id: 301, type: "single", name: "301", price: 210 },
];

const STEP = {
  CRITERIA: "CRITERIA",
  ROOMS: "ROOMS",
  SUMMARY: "SUMMARY",
  SUCCESS: "SUCCESS",
};

export default function RoomReservation() {
  const [criteria, setCriteria] = useState({
    type: "",
    dateFrom: "",
    dateTo: "",
    guests: 1,
  });
  const [step, setStep] = useState(STEP.CRITERIA);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [reservationData, setReservationData] = useState({
    name: "",
    email: "",
  });
  const [success, setSuccess] = useState(false);

  const availableRooms = ROOMS.filter(
    (room) => !criteria.type || room.type === criteria.type,
  );

  const handleCriteriaChange = (e) => {
    setCriteria({ ...criteria, [e.target.name]: e.target.value });
  };

  const handleReservationDataChange = (e) => {
    setReservationData({ ...reservationData, [e.target.name]: e.target.value });
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setStep(STEP.SUMMARY);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setStep(STEP.SUCCESS);
    console.log({
      ...criteria,
      ...reservationData,
      room: selectedRoom,
    });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Rezerwacja pokoju hotelowego
      </Typography>
      {step === STEP.CRITERIA && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Wybierz kryteria rezerwacji
            </Typography>
            <Stack
              spacing={2}
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                setStep(STEP.ROOMS);
              }}
            >
              <FormControl fullWidth required>
                <InputLabel id="room-type-label">Typ pokoju</InputLabel>
                <Select
                  labelId="room-type-label"
                  label="Typ pokoju"
                  name="type"
                  value={criteria.type}
                  onChange={handleCriteriaChange}
                >
                  {ROOM_TYPES.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Data od"
                name="dateFrom"
                type="date"
                value={criteria.dateFrom}
                onChange={handleCriteriaChange}
                slotProps={{ inputLabel: { shrink: true } }}
                required
              />
              <TextField
                label="Data do"
                name="dateTo"
                type="date"
                value={criteria.dateTo}
                onChange={handleCriteriaChange}
                slotProps={{ inputLabel: { shrink: true } }}
                required
              />
              <TextField
                label="Liczba gości"
                name="guests"
                type="number"
                value={criteria.guests}
                onChange={handleCriteriaChange}
                slotProps={{ input: { min: 1, max: 6 } }}
                required
              />
              <Button type="submit" variant="contained">
                Pokaż dostępne pokoje
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}
      {step === STEP.ROOMS && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Wybierz pokój
            </Typography>
            {availableRooms.length === 0 ? (
              <Alert severity="warning">
                Brak dostępnych pokoi dla wybranych kryteriów.
              </Alert>
            ) : (
              <Stack spacing={2}>
                {availableRooms.map((room) => (
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
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle1">
                          Pokój {room.name}
                        </Typography>
                        <Typography variant="body2">
                          Typ:{" "}
                          {ROOM_TYPES.find((t) => t.value === room.type)?.label}
                        </Typography>
                        <Typography variant="body2">
                          Cena: {room.price} zł / noc
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        onClick={() => handleRoomSelect(room)}
                      >
                        Wybierz
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            )}
            <Button sx={{ mt: 2 }} onClick={() => setStep(STEP.CRITERIA)}>
              Wróć do kryteriów
            </Button>
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
              Termin: <b>{criteria.dateFrom}</b> - <b>{criteria.dateTo}</b>
              <br />
              Liczba gości: <b>{criteria.guests}</b>
            </Typography>
            <Stack spacing={2} component="form" onSubmit={handleSubmit}>
              <TextField
                label="Imię i nazwisko"
                name="name"
                value={reservationData.name}
                onChange={handleReservationDataChange}
                required
                fullWidth
              />
              <TextField
                label="E-mail"
                name="email"
                value={reservationData.email}
                onChange={handleReservationDataChange}
                required
                fullWidth
                type="email"
              />
              <Button type="submit" variant="contained">
                Potwierdź rezerwację
              </Button>
            </Stack>
            <Button sx={{ mt: 2 }} onClick={() => setStep(STEP.ROOMS)}>
              Wróć do wyboru pokoju
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
