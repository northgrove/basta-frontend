import React from 'react'
import { Routes } from '../common/routes'
import Tabs from 'nav-frontend-tabs'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { history } from '../index'

const bastaLogo = require('../../img/basta.png')

export class App extends React.Component {
    navigate(location) {
        if (location === 'History') location = '/'
        history.push(location.toLowerCase())
    }
    render() {
        return (
            <div className='wrapper'>
                <header>
                    <a className='navBrand' href='/'><img className='navLogo' src={bastaLogo}/>
                        <div className='navName'>basta</div>
                    </a>
                </header>
                <div className='navLeft'/>
                <nav>
                    <Tabs tabs={[{'label': 'History'}, {'label': 'Create'}, {'label': 'Operate'}]} onChange={(e) => this.navigate(e.target.textContent)}/>
                </nav>
                <div className='navRight'/>
                <main>
                    <Routes/>
                </main>
                <footer></footer>
            </div>)
    }
}

App.propTypes = {
    history: PropTypes.object
}
const mapStateToProps = (state) => {
    return {
        history: state.history
    }
}

export default connect(mapStateToProps)(App)