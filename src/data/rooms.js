import single1 from "../assets/rooms/single1.jpg";
import single2 from "../assets/rooms/single2.jpg";
import double1 from "../assets/rooms/double1.jpg";
import double2 from "../assets/rooms/double2.jpg";
import suite from "../assets/rooms/suite.jpg";
import conference1 from "../assets/rooms/conference1.jpg";
import conference2 from "../assets/rooms/conference2.jpg";
import bowling from "../assets/rooms/bowling.jpg";
import tennis from "../assets/rooms/tennis.jpg";
import table from "../assets/rooms/table.jpg";

export const ROOM_TYPES = [
  { value: "single", label: "Jednoosobowy", maxGuests: 1 },
  { value: "double", label: "Dwuosobowy", maxGuests: 2 },
  { value: "suite", label: "Apartament", maxGuests: 6 },
];

export const ROOMS = [
  {
    id: 101,
    type: "single",
    name: "101",
    price: 200,
    img: single1,
    available: true,
  },
  {
    id: 102,
    type: "double",
    name: "102",
    price: 300,
    img: double1,
    available: true,
  },
  {
    id: 201,
    type: "suite",
    name: "201",
    price: 500,
    img: suite,
    available: true,
  },
  {
    id: 202,
    type: "double",
    name: "202",
    price: 320,
    img: double2,
    available: true,
  },
  {
    id: 301,
    type: "single",
    name: "301",
    price: 210,
    img: single2,
    available: true,
  },
  {
    id: 401,
    type: "sala",
    name: "Konferencyjna A",
    price: 800,
    img: conference1,
    available: true,
  },
  {
    id: 402,
    type: "sala",
    name: "Konferencyjna B",
    price: 700,
    img: conference2,
    available: true,
  },
  {
    id: 501,
    type: "tor",
    name: "Tor 1",
    price: 120,
    img: bowling,
    available: true,
  },
  {
    id: 502,
    type: "tor",
    name: "Tor 2",
    price: 120,
    img: bowling,
    available: true,
  },
  {
    id: 601,
    type: "kort",
    name: "Kort 1",
    price: 90,
    img: tennis,
    available: true,
  },
  {
    id: 602,
    type: "kort",
    name: "Kort 2",
    price: 90,
    img: tennis,
    available: true,
  },
  {
    id: 701,
    type: "stolik",
    name: "Stolik 1",
    price: 0,
    img: table,
    available: true,
  },
  {
    id: 702,
    type: "stolik",
    name: "Stolik 2",
    price: 0,
    img: table,
    available: true,
  },
];
