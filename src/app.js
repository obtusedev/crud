import express from "express";
const app = express();
const PORT = 3000;

import usersRoute from "./routes/users.js";

app.use("/api/v1", usersRoute);
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
});
