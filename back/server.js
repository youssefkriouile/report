const express = require('express');
const app = express();
const cors = require('cors');

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

app.use(express.json());  


require("./app/routes/author.route")(app);
require("./app/routes/report.route")(app);

app.get("/", (req, res) => {
    res.json({ message: "Projet de signalisaion" });
  });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});