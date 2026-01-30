import single1 from "../assets/rooms/single1.jpg";
import single2 from "../assets/rooms/single2.jpg";
import double1 from "../assets/rooms/double1.jpg";
import double2 from "../assets/rooms/double2.jpg";
import suite from "../assets/rooms/suite.jpg";

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
];
