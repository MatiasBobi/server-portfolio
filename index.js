const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(logger("dev"));
app.use(express.json());
app.use(cors());

const sendMailRouter = require("./routes/sendEmail");
const authRouter = require("./routes/auth");

app.get("/", (req, res) => {
  const htmlResponse = `
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    </head>
    <body>
    <h1>Hola, bienvenido a mi backend para mi servidor.</h1>
    </body>
    </html>
    `;
    res.send(htmlResponse)
});
app.use("/mail", sendMailRouter);
app.use("/auth", authRouter);

module.exports = app;
