import express from "express";
import morgan from "morgan";
import process, { env } from "process";
const app = express();
const PORT = 3000 || process.env.PORT;
const environment = process.env.NODE_ENV;

import usersRoute from "./routes/users.js";

environment == "development" ? app.use(morgan("dev")) : app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", usersRoute);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    if (environment === "development") {
        console.log(`Development server running on localhost:${PORT}`);
    }
});
