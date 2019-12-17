const validators = {
  string: (v) => typeof v === 'string',
  array: Array.isArray
}

const assignment = [
  {
    name: 'title',
    type: 'string',
    required: true
  },
  {
    name: 'candidates',
    type: 'array',
    required: true
  },
  {
    name: 'assigned-to',
    type: 'string',
    format: 'uuid',
    required: false
  }
]

const user = [
  {
    name: 'name',
    type: 'string',
    required: true
  },
  {
    name: 'role',
    type: 'string',
    required: true
  }
]

function validate (model, values) {
  if (!values) {
    return null
  }

  return model.reduce((acc, field) => {
    if (!acc) {
      return
    }

    const value = values[field.name]
    const typeOk = validators[field.type](value)

    if (field.required && !value) {
      return null
    }

    if (typeOk) {
      return { ...acc, [field.name]: value }
    }

    return acc
  }, {})
}

exports.validateAssignment = function (value) {
  return validate(assignment, value)
}

exports.validateUser = function (value) {
  return validate(user, value)
}
