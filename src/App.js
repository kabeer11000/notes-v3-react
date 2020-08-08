import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MainComponent from "./components/MainComponent/Main";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import SettingsComponent from "./components/Settings/Settings";
import './serviceWorker';

function App(props) {
    return (
        <Router>
            <Switch>
                <Route path={'/login'} component={SignIn}/>
                <Route path={'/signup'} component={SignUp}/>
                <Route path={'/settings'} component={SettingsComponent}/>
                <Route path={'/'} component={MainComponent}/>
            </Switch>
        </Router>
    );
}

App.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default App;
