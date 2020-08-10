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
import {DialogProvider} from 'muibox'
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

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
                <DialogProvider>
                    <Router>
                        <Switch>
                            <Route path={'/login'} component={SignIn}/>
                            <Route path={'/signup'} component={SignUp}/>
                            <PrivateRoute path="/settings" component={SettingsComponent}/>
                            <PrivateRoute path="/account" component={AccountPage}/>
                            <PrivateRoute path="/" component={MainComponent}/>
                        </Switch>
                    </Router>
                </DialogProvider>
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
