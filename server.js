const app = require("./app")
const port = process.env.PORT || 80
const {connectDB} = require("./db/db")

app.listen(port, () => {
  connectDB()
    console.log(
      `La aplicacion de ejemplo se esta ejecutando en localhost:${port}`
    );
  });