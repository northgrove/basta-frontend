import React from 'react'
import OrderCard from '../../common/components/OrderCard'
import OrderGrid from '../../common/components/OrderGrid'
import PageHeading from '../../common/components/PageHeading'

const wasImage = require('../../../img/orderTypes/websphere.png')

export const Create = () => {
    return (
        <div>
            <PageHeading icon='fa-plus' heading='Create new order' description=''/>
            <OrderGrid>
                <OrderCard label='was' description='node' image={wasImage} tags={['server', 'node']}/>
                <OrderCard/>
                <OrderCard/>
                <OrderCard/>
                <OrderCard/>
                <OrderCard/>
            </OrderGrid>
        </div>
    )
}