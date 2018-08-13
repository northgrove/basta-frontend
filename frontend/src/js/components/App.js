import React from 'react'
import { Routes } from '../common/routes'
import Tabs from 'nav-frontend-tabs'

const bastaLogo = require('../../img/basta.png')

export class App extends React.Component {
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
                    <Tabs tabs={[{'label': 'History'}, {'label': 'Create'}, {'label': 'Operate'}]}/>
                </nav>
                <div className='navRight'/>
                <main>
                    <Routes/>
                </main>
                <footer></footer>
            </div>)
    }
}