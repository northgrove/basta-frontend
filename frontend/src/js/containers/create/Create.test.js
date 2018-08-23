import React from 'react'
import {Provider} from 'react-redux'
import {shallow, mount, render} from 'enzyme'
import {Create} from './Create'


describe('Create filter function', () => {
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
    const wrapper = shallow(<Create/>)
    const instance = wrapper.instance()
    wrapper.setState({orderTypes})

    it('should return a list of all elements without filter', () => {
        expect(instance.state.orderTypes.length).toBe(2)
    })

    it('changes state to contain only filtered elements', () => {
        instance.filterString('match')
        expect(instance.state.filteredOrders.length).toBe(1)
    })
})


