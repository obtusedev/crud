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
    res.json({
        status: 200,
        route: "/api/v1/user/:id",
        msg: `obtaining information on user with id: ${id}`,
    });
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
