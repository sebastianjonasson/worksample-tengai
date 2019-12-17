const uuid = require('uuid/v1')
const initData = require('./init-data')

const { users, organizations, assignments } = initData

exports.getAssignments = function (orgId) {
  return new Promise((resolve) => {
    resolve(assignments.filter(a => a.organization === orgId))
  })
}

exports.createAssignment = function (item) {
  const withId = { ...item, id: uuid() }
  assignments.push(withId)

  return new Promise((resolve) => {
    resolve(withId)
  })
}

exports.updateAssignment = function (id, item) {
  return new Promise((resolve, reject) => {
    const idx = assignments.findIndex(a => a.id === id)
    if (idx === -1) {
      return reject(new Error('NOT_FOUND'))
    }

    // TODO: Validate that canidates exists

    assignments[idx] = item
    resolve(item)
  })
}

exports.getUserById = function (userId) {
  return new Promise((resolve) => {
    resolve(
      users.find(user => user.id === userId)
    )
  })
}

exports.createUser = function (item) {
  const withId = { ...item, id: uuid() }
  users.push(withId)

  return new Promise((resolve) => {
    resolve(withId)
  })
}
