import moment from 'moment'

export const formatPayload = payload => {
  return payload.map(e => {
    return {
      ...e,
      created: formatTimestamp(e.created),
      orderDescription: formatString(e.orderDescription),
      orderOperation: formatString(e.orderOperation),
      orderType: e.orderType,
      status: formatString(e.status),
      updated: formatTimestamp(e.updated)
    }
  })
}

const formatTimestamp = number => {
  if (number) {
    return moment(number).format('Do Mo YYYY h:mm:ss')
  }
}

const formatString = string => {
  if (string) {
    string = string
      .toLowerCase()
      .split('_')
      .join(' ')
    return string.replace(/\b\w/g, letter => {
      return letter.toUpperCase()
    })
  }
}
