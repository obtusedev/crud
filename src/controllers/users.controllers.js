import * as User from "../models/User.js";

export function getUsers(req, res) {
    const limit = parseInt(req.query.limit) || 5; // return 5 users by default
    try {
        const users = User.getUsers(limit);
        res.status(200).json({
            data: {
                message: "OK",
                content: users,
            },
        });
    } catch (e) {
        res.status(500).json({ data: "Something went wrong. Try again later" });
    }
}

export function getUserById(req, res) {
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
}

export function createUser(req, res) {
    const validation = User.userSchema.validate(req.body, {
        abortEarly: false, // show all errors
    });
    let { error } = validation;
    if (error !== undefined) {
        let { details } = error;
        res.status(400).json({
            data: {
                message: "Validation Error",
                details,
            },
        });
    } else {
        let userCreated = User.createUser(req.body);
        if (userCreated) {
            res.status(200).json({
                data: {
                    message: "User Created",
                },
            });
        } else {
            res.status(400).json({
                data: {
                    message: "Something went wrong. User not created",
                },
            });
        }
    }
}

export function updateUser(req, res) {
    // TODO: implement
}

export function deleteUser(req, res) {
    const id = req.params.id;
    if (isNaN(id)) {
        res.status(400).json({
            message: "Invalid id type. id has to be a integer",
        });
        return; // stops the code below form executing
    }

    try {
        const userDeleted = User.deleteUser(id);
        if (userDeleted) {
            res.status(200).json({
                data: {
                    response: "OK",
                    msg: "User Deleted",
                },
            });
        } else {
            res.status(404).json({
                data: {
                    response: "Error",
                    msg: "No user with that id found",
                },
            });
        }
    } catch (e) {
        res.status(500).json({
            data: {
                message: "Something went wrong. Try again later",
                content: e.message,
            },
        });
    }
}
