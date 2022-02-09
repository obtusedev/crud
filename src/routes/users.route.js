import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/users.controller.js";
import express from "express";
import { paramIdIsTypeInt } from "../middlewares/validate-params.js";
const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.param("id", paramIdIsTypeInt);

export default router;
