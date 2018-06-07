/* <------------IMPORTS------------> */
import express from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";

/* <-----PORT SETTINGS-----> */
const PORT = process.env.PORT || 5000;

/* <----------EXPRESS SETTINGS----------> */
const app = express();
app.use(cors());
app.use(morgan("tiny"));

/* <------------STATIC SETTINGS------------> */
app.use(express.static(__dirname + "/build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

/* <------------SERVER LISTEN------------> */
app.listen(PORT, () => console.log("Server started on port " + PORT));
