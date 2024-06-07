const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err.id === "ErrorNotFound") {
    res.status(404).json({ message: "Error Not Found" });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = errorHandler;
