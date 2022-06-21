const express = require("express");
const { json } = require("express");
//const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");

const app = express();

app.use(json());

app.use("/", routes);

const flights = [
  {
    id: 1,
    title: "flight to Nigeria",
    time: "1pm",
    price: 26000,
    date: "26-06-2022",
  },
  {
    id: 2,
    title: "flight to America",
    time: "2pm",
    price: 50000,
    date: "06-07-2022",
  },
  {
    id: 3,
    title: "flight to canada",
    time: "5pm",
    price: 43000,
    date: "29-10-2022",
  },
];

app.get("/flights", (req, res) => {
  res.send(flights);
});

app.post("/flights", (req, res) => {
  const flight = {
    id: flights.length + 1,
    title: req.body.title,
    time: req.body.time,
    price: req.body.price,
    date: req.body.date,
  };
  flights.push(flight);
  res.send(flight);
});

app.put("/flights/:id", (req, res) => {
  const flight = flights.find((c) => c.id === parseInt(req.params.id));
  if (!flight)
    return res.status(404).send("The flight with the given ID was not found.");

  flight.title = req.body.title;
  flight.time = req.body.time;
  flight.price = req.body.price;
  flight.date = req.body.date;
  res.send(flight);
});

app.delete("/flights/:id", (req, res) => {
  const flight = flights.find((c) => c.id === parseInt(req.params.id));
  if (!flight)
    return res.status(404).send("The flight with the given ID was not found.");

  const index = flights.indexOf(flight);
  flights.splice(index, 1);

  res.send("deleted successfully");
});

app.get("/flights/:id", (req, res) => {
  const flight = flights.find((c) => c.id === parseInt(req.params.id));
  if (!flight)
    return res.status(404).send("The flight with the given ID was not found.");
  res.send(flight);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
