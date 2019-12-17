const express = require('express')
const bodyParser = require('body-parser')
const db = require('./data/db')
const models = require('./models')
const app = express()

function authorize (action, permission, req) {
  return req.user.role === 'recruiter'
}

app.use((req, res, next) => {
  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [userId, password] = Buffer.from(b64auth, 'base64').toString().split(':')

  db.getUserById(userId)
    .then((user) => {
      if (user && user.password === password) {
        req.user = user
        return next()
      }
      res
        .status(401)
        .json({
          status: 401,
          message: 'Unauthorized'
        })
    })
    .catch((err) => {
      console.log(err)
      res
        .status(500)
        .json({
          status: '500',
          message: 'Something went wrong'
        })
    })
})

app.use((req, res, next) => {
  // TODO: Add prometheus - collect process metrics
  next()
})

app.use(bodyParser.json())

app.get('/assignments', (req, res) => {
  if (!authorize('index', 'assignments', req)) {
    return res
      .status(401)
      .json({
        status: 401,
        message: 'Unauthorized'
      })
  }

  db.getAssignments(req.user.organization)
    .then((users) => {
      res.json(users)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({
        status: '500',
        message: 'Something went wrong'
      })
    })
})

// Validate user-ids
app.post('/assignments', (req, res) => {
  if (!authorize('create', 'assignments', req)) {
    return res
      .status(401)
      .json({
        status: 401,
        message: 'Unauthorized'
      })
  }

  let item = models.validateAssignment(req.body)

  if (!item) {
    return res
      .status(400)
      .json({
        status: 400,
        message: 'Bad request'
      })
  }

  item = {
    ...item,
    created: Date.now(),
    'created-by': req.user.id,
    organization: req.user.organization
  }

  db.createAssignment(item)
    .then((assignment) => {
      res.json(assignment)
    })
    .catch((err) => {
      console.error(err)
      res
        .status(500)
        .json({
          status: '500',
          message: 'Something went wrong'
        })
    })
})

// Validate user-ids
app.put('/assignments/:id', (req, res) => {
  if (!authorize('update', 'assignments', req)) {
    return res
      .status(401)
      .json({
        status: 401,
        message: 'Unauthorized'
      })
  }

  const item = models.validateAssignment(req.body)

  if (!item) {
    return res
      .status(400)
      .json({
        status: 400,
        message: 'Bad request'
      })
  }

  db.updateAssignment(req.params.id, req.body)
    .then((assignment) => {
      res.json(assignment)
    })
    .catch((err) => {
      console.error(err)
      res
        .status(500)
        .json({
          status: '500',
          message: 'Something went wrong'
        })
    })
})

app.post('/users', (req, res) => {
  if (!authorize('create', 'users', req)) {
    return res
      .status(401)
      .json({
        status: 401,
        message: 'Unauthorized'
      })
  }

  let item = models.validateUser(req.body)

  if (!item) {
    return res
      .status(400)
      .json({
        status: 400,
        message: 'Bad request'
      })
  }

  item = {
    ...item,
    organization: req.user.organization
  }

  db.createUser(item)
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      console.error(err)
      res
        .status(500)
        .json({
          status: '500',
          message: 'Something went wrong'
        })
    })
})

app.listen(1234)
