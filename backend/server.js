const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const port = process.env.PORT || 1234
const app = express()
const cookieSession = require('cookie-session')

app.use(cookieSession({
  name: 'session',
  keys: ['pomeranian'],
  // Cookie Options
  // maxAge: 24 * 60 * 60 * 1000 // 24 hours
  maxAge: 24 * 60 * 60 * 1000,
}))

app.use(express.static('dist'))

const accountRouter = require('./routes/account')
const apiRouter = require('./routes/api')

app.use(express.json())
app.use('/account', accountRouter)
app.use('/api', apiRouter)

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://cindych:676123@cluster0.rdvfo.mongodb.net/cwdatabase?retryWrites=true&w=majority'
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// set favicon
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

// set the initial entry point
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500)
  res.send(`An error occurred! (${err})`)
})

// Start listening for requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
