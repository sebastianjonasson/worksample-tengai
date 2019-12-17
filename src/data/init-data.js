const uuid = require('uuid/v1')

const adminId = 'd24e1810-2113-11ea-823a-55720fa45be6'
const candidateId = '0697ba00-2118-11ea-a8c3-71c0873ec9d5'
const assignmentId = 'b92edf90-2118-11ea-a94c-2fc1f25b9395'

const organizations = [
  {
    id: uuid(),
    title: 'Tengai Robotics'
  },
  {
    id: uuid(),
    title: 'Dunder Mifflin Paper Company'
  }
]

const users = [
  {
    id: adminId,
    name: 'Michael Scott',
    role: 'recruiter',
    organization: organizations[1].id,
    password: 'password'
  },
  {
    id: candidateId,
    name: 'Dwight Schrute',
    role: 'candidate',
    password: 'password',
    organization: organizations[1].id
  },
  {
    id: uuid(),
    name: 'Jim Halpert',
    role: 'candidate',
    password: 'password',
    organization: organizations[1].id
  },
  {
    id: uuid(),
    name: 'Pam Beesly',
    role: 'recruited',
    password: 'password',
    organization: organizations[0].id
  }
]

const assignments = [
  {
    id: assignmentId,
    title: 'Regional manager',
    created: Date.now(),
    'created-by': adminId,
    'assigned-to': adminId,
    organization: organizations[1].id,
    candidates: []
  },
  {
    id: assignmentId,
    title: 'Software Developer',
    created: Date.now(),
    'created-by': uuid(),
    'assigned-to': null,
    organization: organizations[0].id,
    candidates: []
  },
  {
    id: uuid(),
    title: 'Assistant to the regional manager',
    created: Date.now(),
    'created-by': adminId,
    'assigned-to': adminId,
    organization: organizations[1].id,
    candidates: []
  }
]

module.exports = {
  assignments, users, organizations
}
