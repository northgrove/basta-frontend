import moment from 'moment'

export const formatPayload = payload => {
  return payload.map(e => {
    return {
      ...e,
      created: formatTimestamp(e.created),
      orderDescription: formatString(e.orderDescription),
      orderOperation: formatString(e.orderOperation),
      orderType: e.orderType,
      updated: formatTimestamp(e.updated),
      tags: buildTags(e)
    }
  })
}

const formatTimestamp = number => {
  if (number) {
    return moment(number).format('llll')
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

const buildTags = e => {
  return [e.createdBy, e.createdByDisplayName, e.orderDescription, e.orderOperation, e.orderType]
}
