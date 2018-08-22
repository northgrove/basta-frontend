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
            tags: ['developer', 'tools', 'iapp', 'jenkins', 'vpn'],
            url: '/create/iapptools'
        },
        {
            title: 'Devillo Tools',
            description: 'Jenkins etc. in Devillo',
            image: 'balls',
            tags: ['developer', 'tools', 'devillo', 'jenkins'],
            url: '/create/developertools'
        }
    ]
    const wrapper = shallow(<Create/>)

    const instance = wrapper.instance()
    it('should return a list of all elements without filter', () => {
        expect(instance.state.orderTypes.length).toBeGreaterThan(2)
    })

})


