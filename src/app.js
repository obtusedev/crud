import express from "express";
import process from "process";
const app = express();
const PORT = 3000 || process.env.PORT;

import usersRoute from "./routes/users.js";

app.use("/api/v1", usersRoute);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    if (process.env.NODE_ENV === "development") {
        console.log(`Development server running on localhost:${PORT}`);
    }
});
