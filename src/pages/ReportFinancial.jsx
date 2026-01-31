import { useState, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import BarChart from "../components/BarChart";
import { format } from "date-fns";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const OBJECT_TYPES = [
  { value: "hotel", label: "Hotel" },
  { value: "restauracja", label: "Restauracja" },
  { value: "sale", label: "Sale konferencyjne" },
  { value: "korty", label: "Korty tenisowe" },
  { value: "kręgielnia", label: "Kręgielnia" },
];

export default function ReportFinancial() {
  const [params, setParams] = useState({
    dateFrom: "2026-01-01",
    dateTo: "2026-01-31",
    objectType: "hotel",
  });

  const [report, setReport] = useState(null);
  const reportRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setParams((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      const days = [];
      const valuesPrzychody = [];
      const valuesKoszty = [];
      const start = new Date(params.dateFrom);
      const end = new Date(params.dateTo);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        days.push(format(new Date(d), "yyyy-MM-dd"));
        valuesPrzychody.push(Math.floor(Math.random() * 2000));
        valuesKoszty.push(Math.floor(Math.random() * 2000));
      }
      setReport({
        ...params,
        totalPrzychody: valuesPrzychody.reduce((a, b) => a + b, 0),
        totalKoszty: valuesKoszty.reduce((a, b) => a + b, 0),
        generatedAt: new Date(),
        chart: {
          labels: days,
          dataPrzychody: valuesPrzychody,
          dataKoszty: valuesKoszty,
        },
      });
      setLoading(false);
    }, 800);
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Raport finansowy
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={2}>
              <DatePicker
                label="Data od"
                value={params.dateFrom ? new Date(params.dateFrom) : null}
                onChange={(date) =>
                  setParams((prev) => ({
                    ...prev,
                    dateFrom: date ? format(date, "yyyy-MM-dd") : "",
                  }))
                }
                maxDate={new Date()}
                format="yyyy-MM-dd"
              />
              <DatePicker
                label="Data do"
                value={params.dateTo ? new Date(params.dateTo) : null}
                onChange={(date) =>
                  setParams((prev) => ({
                    ...prev,
                    dateTo: date ? format(date, "yyyy-MM-dd") : "",
                  }))
                }
                minDate={params.dateFrom ? new Date(params.dateFrom) : null}
                maxDate={new Date()}
                format="yyyy-MM-dd"
              />
            </Stack>
          </LocalizationProvider>
          <FormControl fullWidth>
            <InputLabel id="object-type-label">Typ obiektu</InputLabel>
            <Select
              labelId="object-type-label"
              name="objectType"
              value={params.objectType}
              label="Typ obiektu"
              onChange={handleChange}
            >
              {OBJECT_TYPES.map((o) => (
                <MenuItem key={o.value} value={o.value}>
                  {o.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            sx={{ mt: 2 }}
            variant="outlined"
            disabled={!report}
            onClick={async () => {
              if (!reportRef.current) return;
              const scale = 3;
              const canvas = await html2canvas(reportRef.current, { scale });
              const imgData = canvas.toDataURL("image/png", 1.0);
              const pdf = new jsPDF({
                orientation: "p",
                unit: "pt",
                format: "a4",
              });
              const pageWidth = pdf.internal.pageSize.getWidth();
              const imgWidth = pageWidth - 40;
              const imgHeight = (canvas.height * imgWidth) / canvas.width;
              pdf.addImage(
                imgData,
                "PNG",
                20,
                20,
                imgWidth,
                imgHeight,
                undefined,
                "FAST",
              );
              pdf.save("raport-finansowy.pdf");
            }}
          >
            Pobierz PDF
          </Button>
          <Button
            variant="contained"
            onClick={handleGenerate}
            disabled={
              loading ||
              !params.dateFrom ||
              !params.dateTo ||
              new Date(params.dateTo) < new Date(params.dateFrom)
            }
          >
            Generuj raport
          </Button>
        </Stack>{" "}
      </Paper>
      {report && (
        <Paper sx={{ p: 3 }} ref={reportRef}>
          <Typography variant="h6" gutterBottom>
            Raport (
            {OBJECT_TYPES.find((o) => o.value === report.objectType)?.label})
          </Typography>
          <Typography>
            Zakres: {report.dateFrom} - {report.dateTo}
          </Typography>
          <Typography>
            Łączne przychody: <b>{report.totalPrzychody} zł</b>
          </Typography>
          <Typography>
            Łączne koszty: <b>{report.totalKoszty} zł</b>
          </Typography>
          <Typography>
            Wynik finansowy:{" "}
            <b
              style={{
                color:
                  report.totalPrzychody - report.totalKoszty > 0
                    ? "#388e3c"
                    : report.totalPrzychody - report.totalKoszty < 0
                      ? "#d32f2f"
                      : "#333",
              }}
            >
              {report.totalPrzychody - report.totalKoszty > 0
                ? `+${report.totalPrzychody - report.totalKoszty} zł`
                : report.totalPrzychody - report.totalKoszty < 0
                  ? `-${Math.abs(report.totalPrzychody - report.totalKoszty)} zł`
                  : `0 zł`}
            </b>
          </Typography>
          <Box sx={{ mt: 3 }}>
            <BarChart
              data={{
                labels: report.chart.labels,
                datasets: [
                  {
                    label: "Przychody",
                    data: report.chart.dataPrzychody,
                    backgroundColor: "#1976d2",
                  },
                  {
                    label: "Koszty",
                    data: report.chart.dataKoszty,
                    backgroundColor: "#d32f2f",
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "Wykres dzienny" },
                },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Wygenerowano: {format(report.generatedAt, "yyyy-MM-dd HH:mm:ss")}
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
