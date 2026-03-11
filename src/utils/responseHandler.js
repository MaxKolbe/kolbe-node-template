const responseHandler = (res, status, message, data = null) => {
  res.status(status).json({
    message,
    data,
  });
};

export default responseHandler;
