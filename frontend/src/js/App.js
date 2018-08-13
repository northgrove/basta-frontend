import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Tabs from 'nav-frontend-tabs'
const bastaLogo = require('../img/basta.png')

export class App extends React.Component {
    render() {
        return (
            <wrapper>
                <header>
                    <a className='navBrand' href='/'><img className='navLogo' src={bastaLogo} /><div className='navName'>basta</div></a>
                </header>
                <div className='navLeft' />
                <navigation>
                    <Tabs tabs={[{'label': 'History'}, {'label': 'Create'}, {'label': 'Operate'}]}/>
                </navigation>
                <div className='navRight' />
                <main>{this.props.children}</main>
                <footer></footer>
            </wrapper>)
    }
}
App.propTypes = {
    children: PropTypes.children
}
const mapStateToProps = (state) => {
    return {
        state
    }
}
export default connect(mapStateToProps)(App)