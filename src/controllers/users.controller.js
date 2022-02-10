import * as User from "../models/User.js";

export function getUsers(req, res) {
    const limit = parseInt(req.query.limit) || 5; // return 5 users by default
    try {
        const users = User.getUsers(limit);
        res.status(200).json({
            status: 200,
            users: users,
        });
    } catch (e) {
        res.status(500).json({
            error: {
                status: 500,
                message: "Internal Server Error",
            },
        });
    }
}

export function getUserById(req, res) {
    const id = req.params.id;

    try {
        const user = User.getUserById(id);
        if (user === undefined) {
            res.status(404).json({
                error: {
                    status: 404,
                    message: "Not Found",
                },
            });
        } else if (user !== undefined) {
            res.status(200).json({
                status: 200,
                user: user,
            });
        }
    } catch (e) {
        res.status(500).json({
            error: {
                status: 500,
                message: "Internal Server Error",
            },
        });
    }
}

export function createUser(req, res) {
    const validation = User.userSchema.validate(req.body, {
        abortEarly: true,
    });
    let { error } = validation;
    if (error !== undefined) {
        res.status(400).json({
            error: {
                status: 400,
                message: validation.error.details[0].message,
            },
        });
    } else {
        try {
            let userCreated = User.createUser(req.body);
            if (userCreated) {
                res.status(200).json({
                    status: 200,
                    message: "OK",
                });
            } else {
                res.status(400).json({
                    status: 400,
                    message: "Bad Request",
                });
            }
        } catch (e) {
            res.status(400).json({
                error: {
                    status: 400,
                    message: "Bad Request",
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

    try {
        const userDeleted = User.deleteUser(id);
        if (userDeleted) {
            res.status(200).json({
                status: 200,
                message: "OK",
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "Not Found",
            });
        }
    } catch (e) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
}
