exports.get404 = (req, res, next) => {
  const url = req.originalUrl.substring(1);

  const response = {
    result: `${url} Page not found`
  }
  res.status(404).json(response);
};
