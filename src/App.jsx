import { useEffect, useRef } from "react";
import { useState } from "react";
import {
  Box as MuiBox,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { AppBar, Toolbar, Container, Button, Box } from "@mui/material";
import Dashboard from "./pages/Dashboard";
import ReportFailure from "./pages/ReportFailure";
import ManageAvailability from "./pages/ManageAvailability";
import Contact from "./pages/Contact";
import RoomReservation from "./pages/RoomReservation";
import MyReservations from "./pages/MyReservations";
import { ROOMS } from "./data/rooms";

const ROLE = {
  CLIENT: "client",
  STAFF: "staff",
  MANAGER: "manager",
};

function App() {
  const mainRef = useRef(null);
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, []);
  const [reservations, setReservations] = useState([]);
  const [role, setRole] = useState(ROLE.CLIENT);
  const [rooms, setRooms] = useState(ROOMS);

  return (
    <Router>
      <MuiBox
        sx={{
          bgcolor: "#f5f5f5",
          p: 1,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="role-label">Rola</InputLabel>
          <Select
            labelId="role-label"
            value={role}
            label="Rola"
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value={ROLE.CLIENT}>Klient</MenuItem>
            <MenuItem value={ROLE.STAFF}>Pracownik</MenuItem>
            <MenuItem value={ROLE.MANAGER}>Kierownik</MenuItem>
          </Select>
        </FormControl>
      </MuiBox>
      <Box
        ref={mainRef}
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AppBar position="static">
          <Toolbar>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                gap: 2,
                justifyContent: "center",
              }}
            >
              <Button color="inherit" component={Link} to="/">
                Hotel
              </Button>
              {role === ROLE.CLIENT && (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/roomreservation"
                  >
                    Pokoje
                  </Button>
                  <Button color="inherit" component={Link} to="/myreservations">
                    Moje rezerwacje
                  </Button>
                  <Button color="inherit" component={Link} to="/contact">
                    Kontakt
                  </Button>
                </>
              )}
              {role === ROLE.STAFF && (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/manage-availability"
                  >
                    Zarządzanie dostępnością
                  </Button>
                  <Button color="inherit" component={Link} to="/reportfailure">
                    Zgłoś awarię
                  </Button>
                </>
              )}
            </Box>
                      </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route
              path="/manage-availability"
              element={
                <ProtectedRoute allowed={role === ROLE.STAFF}>
                  <ManageAvailability services={rooms} setServices={setRooms} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reportfailure"
              element={
                <ProtectedRoute allowed={role === ROLE.STAFF}>
                  <ReportFailure />
                </ProtectedRoute>
              }
            />
            <Route
              path="/roomreservation"
              element={
                <ProtectedRoute allowed={role === ROLE.CLIENT}>
                  <RoomReservation
                    reservations={reservations}
                    setReservations={setReservations}
                    rooms={rooms}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myreservations"
              element={
                <ProtectedRoute allowed={role === ROLE.CLIENT}>
                  <MyReservations
                    reservations={reservations}
                    setReservations={setReservations}
                    rooms={rooms}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute allowed={role === ROLE.CLIENT}>
                  <Contact />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

function ProtectedRoute({ allowed, children }) {
  if (!allowed) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default App;
