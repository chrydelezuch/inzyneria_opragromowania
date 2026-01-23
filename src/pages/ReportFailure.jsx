import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Stack,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

const FailureStatus = {
  NEW: "Nowe",
  IN_PROGRESS: "W trakcie",
  CLOSED: "Zamknięte",
  REJECTED: "Odrzucone",
};

const ServiceStatus = {
  AVAILABLE: "Dostępna",
  UNAVAILABLE: "Niedostępna",
};

const Priority = {
  LOW: "Niski",
  NORMAL: "Normalny",
  HIGH: "Wysoki",
};

const SERVICES = [
  { id: 1, name: "Pokój hotelowy", status: ServiceStatus.AVAILABLE },
  { id: 2, name: "Restauracja", status: ServiceStatus.AVAILABLE },
  { id: 3, name: "Sala konferencyjna", status: ServiceStatus.AVAILABLE },
  { id: 4, name: "Kort tenisowy", status: ServiceStatus.AVAILABLE },
  { id: 5, name: "Kręgielnia", status: ServiceStatus.AVAILABLE },
  { id: 6, name: "Recepcja", status: ServiceStatus.AVAILABLE },
];

const STAFF_MEMBER = {
  id: 1,
  firstName: "Jan",
  lastName: "Kowalski",
  role: "Pracownik obsługi",
};

const MANAGER = {
  id: 1,
  firstName: "Piotr",
  email: "kierownik@hotel.com",
};

export default function ReportFailure() {
  const [selectedService, setSelectedService] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedService || !description.trim() || !priority) {
      alert("Proszę wypełnić wszystkie pola");
      return;
    }

    const failureReport = {
      id: Date.now(),
      reportDate: new Date(),
      description: description,
      status: FailureStatus.NEW,
      priority: priority,
      staffMember: STAFF_MEMBER,
      service: SERVICES.find((s) => s.id === parseInt(selectedService)),
    };

    const notification = {
      id: Date.now() + 1,
      date: new Date(),
      content: `Nowa awaria zgłoszona: ${failureReport.service.name}. Priorytet: ${priority}`,
      recipient: MANAGER,
    };

    console.log("Failure Report:", failureReport);
    console.log("Notification sent to manager:", notification);

    setSelectedService("");
    setDescription("");
    setPriority("");
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto" }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Zgłoszenie awarii usługi
      </Typography>

      {submitted && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Awaria została pomyślnie zgłoszona! Kierownik{" "}
          <strong>{MANAGER.firstName}</strong> został powiadomiony na adres{" "}
          <strong>{MANAGER.email}</strong>.
        </Alert>
      )}

      <Card>
        <CardContent>
          <Box
            sx={{ mb: 3, p: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
              Pracownik obsługi
            </Typography>
            <Typography variant="body2">
              {STAFF_MEMBER.firstName} {STAFF_MEMBER.lastName}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {STAFF_MEMBER.role}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <FormControl fullWidth>
                <InputLabel>Wybierz usługę</InputLabel>
                <Select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  label="Wybierz usługę"
                >
                  {SERVICES.map((service) => (
                    <MenuItem key={service.id} value={service.id}>
                      {service.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Priorytet zgłoszenia</InputLabel>
                <Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  label="Priorytet zgłoszenia"
                >
                  <MenuItem value={Priority.LOW}>{Priority.LOW}</MenuItem>
                  <MenuItem value={Priority.NORMAL}>{Priority.NORMAL}</MenuItem>
                  <MenuItem value={Priority.HIGH}>{Priority.HIGH}</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Opis problemu"
                multiline
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Opisz problem, który napotkałeś..."
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Zgłoś awarię
              </Button>
            </Stack>
          </form>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ p: 2, backgroundColor: "#f9f9f9", borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
              Powiadomienie zostanie wysłane do
            </Typography>
            <Typography variant="body2">
              <strong>{MANAGER.firstName}</strong>
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {MANAGER.email}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
