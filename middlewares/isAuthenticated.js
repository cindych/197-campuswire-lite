const isAuthenticated = (req, res, next) => {
  if (req.session.name && req.session.name !== '') {
    next()
  } else {
    next(new Error('user is not authenticated'))
  }
}

module.exports = isAuthenticated
