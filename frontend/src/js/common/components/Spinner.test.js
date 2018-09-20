import React from 'react'
import { shallow } from 'enzyme'
import { Spinner } from './Spinner'

describe('(Component) Spinner', () => {
  const wrapper = shallow(<Spinner />)
  it('Renders without exploding', () => {
    expect(wrapper.length).toBe(1)
  })
})
