/**
 * Middleware that checks if id parameter is of type integer
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.next} next
 * @param {any} id
 */

export function paramIdIsTypeInt(req, res, next, id) {
    const check = parseInt(id);
    if (isNaN(check)) {
        res.status(400).json({
            error: {
                status: 400,
                message: "Id must be a number",
            },
        });
    } else {
        next();
    }
}
