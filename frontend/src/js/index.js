import React from "react";
import ReactDOM from "react-dom";
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { createBrowserHistory } from 'history'
import { Tabs } from "nav-frontend-tabs"
const bastaLogo = require('../img/basta.png')
class App extends React.Component {
  render() {
    return (
        <wrapper>
            <header>
                <a className="navBrand" href="/"><img className="navLogo" src={bastaLogo} /><div className="navName">basta</div></a>
            </header>
            <navLeft />
            <navigation>
            </navigation>
            <navRight />
            <main>main content</main>
            <footer></footer>
    </wrapper>);
  }
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={createBrowserHistory({})}>
            <App />
        </Router>
    </Provider>,
    document.getElementById("app")
    )