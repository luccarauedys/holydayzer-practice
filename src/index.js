import express from "express";
import cors from "cors";

import { holidays } from "./data.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/holidays", (req, resp) => {
  resp.json(holidays);
});

app.get("/is-today-holiday", (req, resp) => {
  const todayDate = new Date().toLocaleDateString();
  let response = "Não, hoje não é feriado";

  holidays.forEach((holiday) => {
    if (holiday.date === todayDate) {
      response = `Sim, hoje é ${holiday.name}`;
    }
  });

  resp.send(response);
});

app.get("/holidays/:month", (req, resp) => {
  const { month } = req.params;

  const monthHolidays = holidays.filter((holiday) => {
    return holiday.month === parseInt(month);
  });

  resp.json(monthHolidays);
});

app.listen(5000);
