import React, {Component} from 'react'
import PageHeading from '../../../common/components/PageHeading'
import OrderForm from '../../../common/components/OrderForm'
import connect from 'react-redux/es/connect/connect'
import OrderNumberBox from '../../../common/components/formComponents/OrderNumberBox'
import OrderTextBox from '../../../common/components/formComponents/OrderTextBox'

const iappImage = require('../../../../img/orderTypes/devtools-iapp.png')

class Iapptools extends Component {
    constructor(props) {
        super(props)
        this.state = {
            servers: 2,
            cpu: 1,
            memory: 2,
            disk: 0,
            description: ''
        }
    }
    handleChange(field, value) {
        this.setState({[field]: value})
    }

    render() {
        return (
            <div>
                <PageHeading icon='fa-plus' heading='Create new Dev tool iApp server' description='Developer tools available from laptops via VPN'/>
                <OrderForm image={iappImage} title='Dev tools server'>
                    <OrderNumberBox label='Servers' value={this.state.servers} min={1} max={12} description="Virtual servers" onChange={(v) => this.handleChange('servers', v)}/>
                    <OrderNumberBox label='CPU' value={this.state.cpu} min={1} max={4} description="Virtual sockets" onChange={(v) => this.handleChange('cpu', v)}/>
                    <OrderNumberBox label='Memory' value={this.state.memory} min={1} max={32} description="GB" onChange={(v) => this.handleChange('memory', v)}/>
                    <OrderNumberBox label='Extra disk' value={this.state.disk} min={0} max={100} description="GB" onChange={(v) => this.handleChange('disk', v)}/>
                    <OrderTextBox label='Description' value={this.state.description} onChange={(v) => this.handleChange('description', v)}/>
                </OrderForm>
            </div>
        )
    }
}
Iapptools.propTypes = {}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Iapptools)