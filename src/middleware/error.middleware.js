const errorMiddleware = (err, req, res, next) => {
    let {status = 500, message, data} = err;

    console.log(`[Error] ${err}`);

    message = status === 500 || !message ? 'Internal server error' : message;

    err = {
        type: 'error',
        status,
        message,
        ...(data) && data
    };

    res.status(status).send(err);
}

module.exports = errorMiddleware;
