export const successResponse = (res, data = {}, message = "Success", statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...data, // allows you to pass { modules } or { progress } etc
  });
};

export const errorResponse = (res, err, fallbackMessage = "Server error") => {
  let statusCode = 500;
  let message = fallbackMessage;
  let error = null;

  if (typeof err === "object" && err !== null) {
    statusCode = err.status || 500;
    message = err.message || fallbackMessage;
    error = err.error || null;
  } else if (typeof err === "string") {
    message = err;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};
