import React, {Component} from 'react'

import PropTypes from 'prop-types'

export class OrderNumberBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            valid: true,
            value: this.props.value
        }
    }
    handleInput(value) {
        const {min, max, onChange} = this.props
        if (value < min || value > max) {
            this.setState({valid: false})
        } else {
            this.setState({valid:true})
        }
        this.setState({value})
        onChange(Number(value))
    }
    render() {

        const {label, min, max, description} = this.props
        return (
            <div className='formComponentGrid'>
                <div className='formComponentLabel'>{label}</div>
                <div className='formComponentField'>
                    <input className='formComponentNumberField' maxLength='1' type='number' min={min} max={max}
                           value={this.state.value}
                           onChange={(e) => this.handleInput(e.target.value)}/>
                    <div className='formComponentDescription'>{description}</div>
                    {!this.state.valid ? <div className='formComponentError'>Please enter a number between {min} and {max}</div> : null}

                </div>
            </div>
        )
    }
}
OrderNumberBox.propTypes = {
    label: PropTypes.string,
    description: PropTypes.string,
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func
}

export default OrderNumberBox