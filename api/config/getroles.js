const yaml = require('js-yaml')
const fs = require('fs')
const file = './api/config/roles.yml'
let arrRoles = []
let arrGroups = []

function readinput() {
  const input = yaml.safeLoad(fs.readFileSync(file, 'utf8'))
  return input
}

// match groups in token to roles
exports.matchRoles = ({ groups }) => {
  console.log('groups', groups)
  const roller = readinput()
  arrGroups = groups
  arrGroups.forEach(group => {
    for (var i = 0, len = roller.roles.length; i < len; i++) {
      if (group === roller.roles[i].azureid) {
        arrRoles.push(roller.roles[i].name)
      }
    }
  })
  console.log(arrRoles)
  return arrRoles
}
