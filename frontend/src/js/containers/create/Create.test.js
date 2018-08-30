import React from 'react'
import { shallow } from 'enzyme'
import { Create, isAvailable } from './Create'

describe('Order filter function', () => {
  const user = {
    currentUser: {
      userName: 'mockusername',
      firstName: 'mock',
      lastName: 'name',
      displayName: 'Mock User',
      roles: ['ROLE1', 'ROLE2']
    }
  }
  const orderTypes = [
    {
      title: 'IApp Tools',
      description: 'Available via VPN',
      image: 'balls',
      tags: ['match'],
      url: '/create/iapptools'
    },
    {
      title: 'Devillo Tools',
      description: 'Jenkins etc. in Devillo',
      image: 'balls',
      tags: ['miss'],
      url: '/create/developertools'
    }
  ]
  const wrapper = shallow(<Create user={user} />)
  const instance = wrapper.instance()
  wrapper.setState({ orderTypes })

  it('should return a list of all elements without filter', () => {
    expect(instance.state.orderTypes.length).toBe(2)
  })

  it('changes state to contain only filtered elements', () => {
    instance.filterString('match')
    expect(instance.state.filteredOrders.length).toBe(1)
  })
})

describe('isAvailable function', () => {
  const roles = ['ROLE1']
  const noAccess = ['NOMATCH']
  const access = ['ROLE1', 'ROLE2']
  const multipleRoles = ['ROLE1', 'ANOTHER']

  it('should return true if no access is required', () => {
    expect(isAvailable(undefined, roles)).toBeTruthy()
  })
  it('should return false if no match between roles and access', () => {
    expect(isAvailable(noAccess, roles)).toBeFalsy()
  })
  it('should return true if either access match role', () => {
    expect(isAvailable(access, roles)).toBeTruthy()
  })
  it('should return true if either role match access', () => {
    expect(isAvailable(access, multipleRoles))
  })
})
