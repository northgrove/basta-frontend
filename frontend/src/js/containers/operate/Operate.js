import React, {Component} from 'react'
import PageHeading from '../../common/components/PageHeading'
import connect from 'react-redux/es/connect/connect'
import OrderGrid from '../../common/components/OrderGrid'
import OrderCard from '../../common/components/OrderCard'
import OrderFilter from '../../common/components/OrderFilter'

const wasImage = require('../../../img/orderTypes/websphere.png')
const jbossImage = require('../../../img/orderTypes/jboss.png')
const wildflyImage = require('../../../img/orderTypes/wildfly.png')
const libertyImage = require('../../../img/orderTypes/liberty.png')
const securityImage = require('../../../img/orderTypes/security.png')
const openamImage = require('../../../img/orderTypes/openam.png')
const redhatImage = require('../../../img/orderTypes/redhat.png')
const containerlinuxImage = require('../../../img/orderTypes/containerlinux.png')
const dbImage = require('../../../img/orderTypes/oracle.png')
const windowsImage = require('../../../img/orderTypes/windows.png')
const bigipImage = require('../../../img/orderTypes/big-ip.png')
const mqImage = require('../../../img/orderTypes/mq.png')
const developertoolsImage = require('../../../img/orderTypes/devtools.png')
const iappImage = require('../../../img/orderTypes/devtools-iapp.png')


class Operate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderTypes
        }
    }

    filterString(filter) {
        const filteredOrders = orderTypes.filter((orderType) => {
            return orderType.tags.filter((tag) => {
                return tag.match(filter.toLowerCase())
            }).length > 0
        })
        this.setState({orderTypes: filteredOrders})
    }

    render() {
        return (
            <div>
                <PageHeading icon='fa-wrench' heading='Operations' description='Start, stop and remove'/>
                <OrderFilter onChange={(e) => this.filterString(e)}/>
                <OrderGrid>
                    {this.state.orderTypes.map((orderType, i) => {
                        const {title, description, image, tags, url} = orderType
                        return <OrderCard key={i} label={title} description={description} image={image} tags={tags}
                                          url={url}/>
                    })
                    }

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

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Operate)