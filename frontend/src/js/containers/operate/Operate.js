import React, { Component } from 'react'
import PageHeading from '../../common/components/PageHeading'
import connect from 'react-redux/es/connect/connect'
import OrderGrid from '../../common/components/OrderGrid'
import OrderCard from '../../common/components/OrderCard'
import OrderFilter from '../../common/components/OrderFilter'

const securityImage = require('../../../img/orderTypes/security.png')
const redhatImage = require('../../../img/orderTypes/redhat.png')
const mqImage = require('../../../img/orderTypes/mq.png')

export class Operate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orderTypes,
      filteredOrders: orderTypes
    }
  }

  filterString(filter) {
    const filteredOrders = this.state.orderTypes.filter(orderType => {
      return (
        orderType.tags.filter(tag => {
          return tag.match(filter)
        }).length > 0
      )
    })
    this.setState({ filteredOrders })
  }

  render() {
    return (
      <div>
        <PageHeading icon="fa-wrench" heading="Operations" description="Start, stop and remove" />
        <OrderFilter onChange={e => this.filterString(e)} />
        <OrderGrid>
          {this.state.filteredOrders.map((orderType, i) => {
            const { title, description, image, tags, url } = orderType
            return (
              <OrderCard
                key={i}
                label={title}
                description={description}
                image={image}
                tags={tags}
                url={url}
              />
            )
          })}
        </OrderGrid>
      </div>
    )
  }
}

const orderTypes = [
  {
    title: 'Nodes',
    description: 'Viartual machines',
    image: redhatImage,
    tags: ['node', 'server', 'start', 'stop', 'delete'],
    url: '/operate/nodes'
  },
  {
    title: 'Credentials',
    description: 'Service user in AD',
    image: securityImage,
    tags: ['ad', 'service', 'user'],
    url: '/operate/ad'
  },
  {
    title: 'MQ',
    description: 'Topics',
    image: mqImage,
    tags: ['mq', 'topic', 'websphere', 'ibm'],
    url: '/operate/mq-topic'
  },
  {
    title: 'MQ',
    description: 'channel',
    image: mqImage,
    tags: ['mq', 'channel', 'websphere', 'ibm'],
    url: '/operate/mq-channel'
  },
  {
    title: 'MQ',
    description: 'Queue',
    image: mqImage,
    tags: ['mq', 'queue', 'websphere', 'ibm'],
    url: '/operate/mq-queue'
  }
]
Operate.propTypes = {}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Operate)
