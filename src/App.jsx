import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Container, Button, Box } from "@mui/material";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: "flex", gap: 2 }}>
              <Button color="inherit" component={Link} to="/">
                System Hotelowy
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
