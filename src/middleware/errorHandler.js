const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    status: 500,
    message: `There was a ${err.name}`,
    error: err.message,
  });
};

export default errorHandler; 
