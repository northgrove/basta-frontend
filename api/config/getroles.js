let arrRoles = []

// match groups in token to roles
exports.matchRoles = ({groups}) => {
    groups.forEach(group => {
        Object.keys(roles).forEach((role) => {
            if (roles[role].includes(group) && !arrRoles.includes(role)) {
                arrRoles.push(role)
            }
        })
    })
    return arrRoles
}

const roles = {
    ROLE_SUPERUSER: ['c91b58c6-c7e7-4160-9b58-5187abb0bb6b'],
    ROLE_PROD_OPERATIONS: ['9fad3009-d179-4a8f-b73d-5f1e28dc6013'],
    ROLE_OPERATIONS: ['0'],
    ROLE_USER: ['0'],
    TEST1: ['xxx', 'yyy'],
    TEST2: ['yyy']
}