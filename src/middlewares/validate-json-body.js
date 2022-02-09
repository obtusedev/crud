// bodyParser crashes if the request payload is incorrect in any way.
// for example having a dangling , will crash the app

export function validateJsonRequestBody(err, req, res, next) {
    if (err.status === 400) {
        res.status(400).json({
            status: 400,
            message: "Bad Request"
        })
    } else {
        next();
    }
}
