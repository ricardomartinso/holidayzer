import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const holidays = [
  { date: "1/1/2022", name: "Confraternização mundial" },
  { date: "1/3/2022", name: "Carnaval" },
  { date: "4/17/2022", name: "Páscoa" },
  { date: "4/21/2022", name: "Tiradentes" },
  { date: "5/1/2022", name: "Dia do trabalho" },
  { date: "6/16/2022", name: "Corpus Christi" },
  { date: "9/7/2022", name: "Independência do Brasil" },
  { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
  { date: "11/2/2022", name: "Finados" },
  { date: "11/15/2022", name: "Proclamação da República" },
  { date: "12/25/2022", name: "Natal" },
];

const hoje = new Date();
const dataHoje = hoje.toLocaleDateString(); // 06/14/2022

app.get("/holidays", (req, res) => {
  res.send(holidays);
});
const arrayMes = holidays
  .filter((holiday) => holiday.date)
  .map((date) => date.date.split("/"))
  .map((date) => date[0]);

app.get(`/holidays/:idMes`, (req, res) => {
  const id = req.params.idMes;
  const arrayMes = holidays
    .filter((holiday) => holiday.date)
    .map((date) => date.split("/"))
    .map((date) => date[0]);

  res.send(
    holidays.filter((holiday) => {
      holiday
        .map((date) => date.date.split("/"))
        .map((date) => date[0])
        .includes(id);
    })
  );
});

app.get("/is-today-holiday", (req, res) => {
  holidays.map((holiday) => {
    if (holiday.date === dataHoje) {
      return res.send(`Sim, hoje é ${holiday.name}`);
    }
  });
  res.send("Não, hoje não é feriado");
});

app.listen(5200);
