import React from "react";
import ReactDOM from "react-dom";
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { createBrowserHistory } from 'history'
const bastaLogo = require('../img/basta.png')
class App extends React.Component {
  render() {
    return (
        <wrapper>
            <header>
                <div className={"navBrand"}><span><img className="navLogo" src={bastaLogo} />basta</span></div>
            </header>
            <navigation>navigation</navigation>
            <left></left>
            <main>main content</main>
            <right></right>
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