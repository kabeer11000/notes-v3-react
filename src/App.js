import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MainComponent from "./components/MainComponent/Main";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import SettingsComponent from "./components/Settings/Settings";
import './serviceWorker';
import {SnackbarProvider} from "notistack";
import AccountPage from "./components/AccountPage/AccountPage";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";

const theme_ = createMuiTheme({
    palette: {
        primary: {
            contrastText: '#FFF',
            main: '#FFC400',
            light: '#FFFFFF',
            dark: '#FFFFFF',
        },
        secondary: {
            main: '#FFFFFF',
        }
    }
});

function App(props) {
    return (

        <SnackbarProvider maxSnack={1}>

            <MuiThemeProvider theme={theme_}>
                <Router>
                    <Switch>
                        <Route path={'/login'} component={SignIn}/>
                        <Route path={'/signup'} component={SignUp}/>
                        <Route path={'/settings'} component={SettingsComponent}/>
                        <Route path={'/account'} component={AccountPage}/>
                        <Route path={'/'} component={MainComponent}/>
                    </Switch>
                </Router>
            </MuiThemeProvider>
        </SnackbarProvider>
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
