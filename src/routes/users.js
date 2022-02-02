import * as User from "../models/User.js";
import express from "express";
const router = express.Router();

router.get("/users", (req, res) => {
    res.json({
        status: 200,
        route: "/api/v1/users",
        msg: "hit users route",
    });
});

router.get("/user/:id", (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        res.status(400).json({
            data: "invalid id type. id has to be a integer"
        });
        return; // stops the code below form executing
    }
    const user = User.getUserById(id);
    switch (user) {
        case user instanceof Error:
            // database error
            res.status(500).json({
                data: "Something went wrong. Try again later",
            });
            break;
        case user === undefined:
            // user doesn't exists
            res.status(404).json({
                data: `The user with id: ${id} does not exists in the database`,
            });
            break;
        case user:
            res.status(200).json(user);
            break;
        default:
            res.status(418); //teapot
    }
});

router.post("/user", (req, res) => {
    res.json({
        status: 200,
        route: "/api/v1/user",
        msg: "created user successfully",
    });
});

router.put("/user/:id", (req, res) => {
    res.json(`Updated user with id: ${id}`);
});

router.delete("/user/:id", (req, res) => {
    const id = req.params.id;
    res.json({
        status: 200,
        route: "/api/v1/user/:id",
        msg: `deleting user with id: ${id}`,
    });
});

export default router;
