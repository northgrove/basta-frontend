import React, {Component} from 'react'
import PageHeading from '../../../common/components/PageHeading'
import OrderForm from '../../../common/components/OrderForm'
import connect from 'react-redux/es/connect/connect'

const iappImage = require('../../../../img/orderTypes/devtools-iapp.png')

class Iapptools extends Component {
    constructor(props) {
        super(props)

        this.orderFields = {
            servers: {
                label: 'Servers',
                description: 'Virtual Servers',
                fieldType: 'number',
                valid: true,
                min: 1,
                max: 8,
                default: 1
            },
            cpu: {
                label: 'Cpu',
                description: 'Virtual sockets',
                fieldType: 'number',
                valid: true,
                min: 1,
                max: 4,
                default: 1
            },
            memory: {
                label: 'Memory',
                description: 'GB',
                fieldType: 'number',
                valid: true,
                min: 2,
                max: 32,
                default: 2
            },
            disk: {
                label: 'Extra disk',
                description: 'GB',
                fieldType: 'number',
                valid: true,
                min: 0,
                max: 100,
                default: 0
            },
            description: {
                label: 'Description',
                description: 'What is this server used for?',
                fieldType: 'text',
                min: 0,
                max: 100,
                default: ''
            },
            ibm: {
                label: 'IBM software',
                description: 'Will install ILMT monitoring agent',
                fieldType: 'checkBox',
                default: false
            }
        }
        for (const key in this.orderFields) {
            this.state = {...this.state, [key]: this.orderFields[key].default}
        }

    }

    handleChange(field, value) {
        const orderField = this.orderFields[field]
        if (value < orderField.min || value > orderField.max) {
            orderField.valid = false
        } else {
            orderField.valid = true
        }
        this.orderFields[field].value = value
        this.setState({[field]: value})
    }


    render() {
        return (
            <div>
                <PageHeading icon='fa-plus' heading='Create new Dev tool iApp server'
                             description='Developer tools available from laptops via VPN'/>
                <OrderForm image={iappImage} title='Dev tools server' orderFields={this.orderFields} values={this.state}
                           onChange={this.handleChange.bind(this)}/>
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