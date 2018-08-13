import React from 'react'
import {Routes} from '../common/routes'
import Tabs from 'nav-frontend-tabs'

const bastaLogo = require('../../img/basta.png')

export const App = () => {


    return (
        <div className='wrapper'>
            <header>
                <a className='navBrand' href='/'><img className='navLogo' src={bastaLogo}/>
                    <div className='navName'>basta</div>
                </a>
            </header>
            <div className='navLeft'/>
            <nav>
                <Tabs
                    className='navTabs'
                    tabs={[{'label': 'History'}, {'label': 'Create'}, {'label': 'Operate'}]}
                    onChange={(e) => navigate(e.target.textContent)}
                />
                <div className='navButton'>smallssss</div>
            </nav>
            <div className='navRight'/>
            <main>
                <Routes/>
            </main>
            <footer></footer>
        </div>)
}
const navigate = (location) => {
    if (location === 'History') location = '/'
    history.push(location.toLowerCase())
}