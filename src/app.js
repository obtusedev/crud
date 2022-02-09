import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import nunjucks from "nunjucks";
import { limiter } from "./middlewares/rate-limit.js";
import process from "process";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000 || process.env.PORT;
const environment = process.env.NODE_ENV;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import usersRoute from "./routes/users.route.js";

environment == "development"
    ? app.use(morgan("dev"))
    : app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use("/api/v1", limiter); // rate limit api routes
app.use("/api/v1", usersRoute);

app.set("view engine", "html");
nunjucks.configure(
    [path.join(__dirname, "/views"), path.join(__dirname, "/views/partials")],
    {
        autoescape: true,
        express: app,
    }
);

app.get("/", (req, res) => {
    res.render("index.html");
});

app.listen(PORT, () => {
    if (environment === "development") {
        console.log(`Development server running on localhost:${PORT}`);
    }
});
