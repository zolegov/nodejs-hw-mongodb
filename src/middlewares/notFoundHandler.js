export const notFoundHandler = (req, res, nest) => {
  res.status(404).json({
    message: 'Route not found',
  });
};
