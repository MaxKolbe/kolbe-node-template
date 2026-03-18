export const successResponse = (res, code, message, data = null) => {
  return res.status(code).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (res, code, message, errory) => {
  return res.status(code).json({
    success: false,
    message,
    error
  });
};