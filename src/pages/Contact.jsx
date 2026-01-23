import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  Alert,
} from "@mui/material";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    if (!message.trim()) {
      setError("Proszę wpisać treść wiadomości");
      return;
    }

    const contactMessage = {
      id: Date.now(),
      email: email || "brak",
      message: message,
      date: new Date(),
      recipient: "Recepcja",
    };

    console.log("Wiadomość do recepcji:", contactMessage);

    setSubmittedEmail(email);
    setEmail("");
    setMessage("");
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Kontakt z obsługą
      </Typography>

      {submitted && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {submittedEmail
            ? `Wiadomość została wysłana. Odpowiemy na adres ${submittedEmail}.`
            : "Wiadomość została wysłana do recepcji."}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Email (opcjonalnie)"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />

              <TextField
                label="Treść wiadomości"
                multiline
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Opisz swoją sprawę..."
                fullWidth
                required
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Wyślij wiadomość
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
