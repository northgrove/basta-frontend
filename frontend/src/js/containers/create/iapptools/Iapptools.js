import React, {Component} from 'react'
import PageHeading from '../../../common/components/PageHeading'
import OrderForm from '../../../common/components/OrderForm'
import OrderDropDown from '../../../common/components/formComponents/OrderDropDown'
import OrderSlider from '../../../common/components/formComponents/OrderSlider'
import connect from 'react-redux/es/connect/connect'

const iappImage = require('../../../../img/orderTypes/devtools-iapp.png')

class Iapptools extends Component {
    constructor(props) {
        super(props)
        this.state = {
            servers: 2,
            cpu: 1,
            memory: 2,
            disk: 0,
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
                    <OrderSlider label='Servers' value={this.state.servers} min={1} max={8} step={1} onChange={(e,v) => this.handleChange('servers', v)}/>
                    <OrderSlider label='CPU' value={this.state.cpu} min={1} max={4} step={1} onChange={(e,v) => this.handleChange('cpu', v)}/>
                    <OrderSlider label='Memory' value={this.state.memory} min={1} max={32} step={1} onChange={(e,v) => this.handleChange('memory', v)}/>
                    <OrderSlider label='Extra disk' value={this.state.disk} min={0} max={100} step={5} onChange={(e,v) => this.handleChange('disk', v)}/>

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