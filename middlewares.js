let countRequest = 0;

const logApplication = (req, res, next) => {
  console.log(countRequest);
  countRequest++;
  next();
};

module.exports = {
  logApplication
};