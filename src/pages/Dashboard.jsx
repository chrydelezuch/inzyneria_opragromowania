import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Grid,
  Chip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HotelIcon from "@mui/icons-material/Hotel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const SERVICES = [
  { icon: HotelIcon, title: "Pokoje", desc: "W różnych kategoriach" },
  { icon: RestaurantIcon, title: "Restauracja", desc: "Bogate menu" },
  { icon: EventNoteIcon, title: "Sale konferencyjne", desc: "Do wynajęcia" },
  { icon: SportsBaseballIcon, title: "Korty tenisowe", desc: "Profesjonalne" },
  { icon: SportsBaseballIcon, title: "Kręgielnia", desc: "Nowoczesna" },
];

const HOURS = [
  { name: "Recepcja", hours: "24/7" },
  { name: "Restauracja", hours: "7:00 - 23:00" },
  { name: "Obiekty sportowe", hours: "8:00 - 22:00" },
];

export default function Dashboard() {
  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ mb: 2, fontWeight: "bold", color: "#1976d2" }}
        >
          Witamy w naszym hotelu
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          sx={{ maxWidth: 600, mx: "auto" }}
        >
          Nowoczesny kompleks hotelowo-rekreacyjny oferujący szeroki zakres
          usług dla naszych gości
        </Typography>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          Nasze usługi
        </Typography>
        <Grid container spacing={2}>
          {SERVICES.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    transition: "transform 0.3s, boxShadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent sx={{ pt: 3 }}>
                    <Box
                      sx={{
                        fontSize: 48,
                        color: "#1976d2",
                        mb: 1,
                      }}
                    >
                      <IconComponent sx={{ fontSize: 48 }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {service.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          Godziny otwarcia
        </Typography>
        <Card sx={{ bgcolor: "#f5f5f5" }}>
          <CardContent>
            <Stack spacing={2}>
              {HOURS.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pb: idx < HOURS.length - 1 ? 2 : 0,
                    borderBottom:
                      idx < HOURS.length - 1 ? "1px solid #ddd" : "none",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AccessTimeIcon sx={{ color: "#1976d2" }} />
                    <Typography variant="body1" sx={{ fontWeight: "500" }}>
                      {item.name}
                    </Typography>
                  </Box>
                  <Chip label={item.hours} color="primary" variant="outlined" />
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          textAlign: "center",
          p: 3,
          bgcolor: "#f0f8ff",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <FavoriteBorderIcon sx={{ color: "#d32f2f" }} />
        <Typography variant="body1" color="textSecondary">
          Dziękujemy, że wybierają nas nasi goście
        </Typography>
        <FavoriteBorderIcon sx={{ color: "#d32f2f" }} />
      </Box>
    </Box>
  );
}
