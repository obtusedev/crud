import * as User from "../models/User.js";
import express from "express";
const router = express.Router();

router.get("/users", (req, res) => {
    const limit = parseInt(req.query.limit) || 5; // return 5 users by default
    const users = User.getUsers(limit);
    users instanceof Error
        ? res
              .status(500)
              .json({ data: "Something went wrong. Try again later" })
        : res.status(200).json(users);
});

router.get("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.status(400).json({
            message: "Invalid id type. id has to be a integer",
        });
        return; // stops the code below form executing
    }

    try {
    const user = User.getUserById(id);
        if (user === undefined) {
            // user doesn't exist
            res.status(404).json({
                data: {
                    message: `No user with id: ${id} found`,
                },
            });
        } else if (user !== undefined) {
            res.status(200).json({
                data: {
                    message: "OK",
                    user,
                },
            });
        } else {
            res.status(418); // teapot
        }
    } catch (e) {
            // database error
            res.status(500).json({
            data: {
                message: "Something went wrong. Try again later",
                content: e.message,
            },
            });
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
