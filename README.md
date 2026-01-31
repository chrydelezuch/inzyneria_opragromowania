# System Zarządzania Kompleksem Hotelowo-Rekreacyjnym

Mock aplikacji do zarządzania kompleksem hotelowo-rekreacyjnym.  Pozwala na testowanie kluczowych scenariuszy biznesowych w formie uproszczonej symulacji.

## Wymagania

- Node.js >= 18
- npm

## Instalacja

```bash
npm install
```

## Uruchamianie

### Tryb development

```bash
npm run dev
```

Aplikacja będzie dostępna na `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Struktura projektu

```
src/
├── App.jsx              # Główny komponent, routing, role, stan globalny
├── main.jsx             # Punkt wejścia aplikacji
├── index.css            # Style
├── data/rooms.js        # Mockowane zasoby (pokoje, sale, itp.)
├── components/BarChart.js # Komponent wykresu
└── pages/
    ├── Dashboard.jsx         # Strona główna
    ├── RoomReservation.jsx   # Rezerwacja pokoju
    ├── MyReservations.jsx    # Podgląd/anulowanie rezerwacji
    ├── ManageAvailability.jsx# Zarządzanie dostępnością
    ├── ReportFinancial.jsx   # Raport finansowy
    ├── ReportFailure.jsx     # Zgłoszenie awarii
    └── Contact.jsx           # Kontakt z obsługą
```

## Technologie

- **React 19** – UI
- **Vite 7** – build tool
- **Material-UI 7** – komponenty UI
- **React Router 7** – routing