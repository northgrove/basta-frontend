import React from 'react'
import { shallow } from 'enzyme'
import { Order } from './Order'

const props = {
  order: {
    form: ''
  }
}

describe('(Component) Order', () => {
  const wrapper = shallow(<Order {...props} />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
})
