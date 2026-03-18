const errorHandler = (err, req, res, next) => {
    console.log("There was an Error-->", err.stack);
    return res.status(500).json({
        status: 500,
        message: err.name,
        error: err.message,
    });
};
export default errorHandler;
