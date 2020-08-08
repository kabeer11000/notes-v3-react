import {createMuiTheme} from "@material-ui/core/styles";
import React from "react";

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
export default theme_;
