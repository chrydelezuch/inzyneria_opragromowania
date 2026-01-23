import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Dashboard from "./pages/Dashboard";
import ReportFailure from "./pages/ReportFailure";

const MOCK_FEATURES = [
  { id: 1, title: "Zgłoszenie awarii", path: "/reportfailure" },
];

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box sx={{ width: 300, p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <h3>Dostępne funkcjonalności</h3>
      </Box>
      <List>
        {MOCK_FEATURES.map((feature) => (
          <ListItem key={feature.id} disablePadding>
            <ListItemButton
              component={Link}
              to={feature.path}
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemText primary={feature.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Router>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ flexGrow: 1 }}>
              <Button color="inherit" component={Link} to="/">
                System Hotelowy
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawerContent}
        </Drawer>

        <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reportfailure" element={<ReportFailure />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
