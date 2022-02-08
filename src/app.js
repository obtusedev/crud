import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { limiter } from "./middleware/rate-limit.js";
import process from "process";

const app = express();
const PORT = 3000 || process.env.PORT;
const environment = process.env.NODE_ENV;

import usersRoute from "./routes/users.js";

environment == "development"
    ? app.use(morgan("dev"))
    : app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use("/api/v1", limiter); // rate limit api routes
app.use("/api/v1", usersRoute);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    if (environment === "development") {
        console.log(`Development server running on localhost:${PORT}`);
    }
});
