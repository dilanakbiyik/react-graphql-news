import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './containers/Home';
import Detail from './containers/Detail';
import './App.css';


class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/detail/:item" component={Detail} />
                </div>
            </Router>
        );
    }
}

export default App;
