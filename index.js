const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectdb } = require("./db");
const stationRoutes = require("./routes/stationRoutes");
const dspRoutes = require("./routes/DSPRoutes");
const spRoutes = require("./routes/SPRoutes");
const digRoutes = require("./routes/DIGRoutes");
const igRoutes = require("./routes/IGRoutes");
const locationRoutes = require("./routes/locationRoutes");
const path = require("path");
const upload = require("./middleware/multerconfig");

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// Configure CORS to allow requests from specific origin
const corsOptions = {
  origin: "https://vcpoliceportal.in", // Your frontend domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: "Content-Type,Authorization", // Adjust headers if necessary
};

app.use(cors(corsOptions));

connectdb();

app.use("/test", (req, res) => {
  res.send("testing22");
});

app.use("/api/stations", stationRoutes);
app.use("/api/dsps", dspRoutes);
app.use("/api/sps", spRoutes);
app.use("/api/digs", digRoutes);
app.use("/api/igs", igRoutes);
app.use("/api/locations", locationRoutes);

app.listen(3000, () => console.log("server running"));
