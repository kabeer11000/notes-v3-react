import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {Search, Sync} from "@material-ui/icons";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import {sync_now} from "../../js/main/save-notes";
import Box from '.././Box/Box';
import Typography from "@material-ui/core/Typography";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '1rem',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

function rerender_(){

   // Box.refresh_();
//    Box.setState(Box.state);
//    Box.forceUpdate(()=>{});
}

export default function CustomizedInputBase(props) {
    function HideOnScroll(props) {
        const {children, window} = props;
        // Note that you normally won't need to set the window ref as useScrollTrigger
        // will default to window.
        // This is only being set here because the demo is in an iframe.
        const trigger = useScrollTrigger({target: window ? window() : undefined});

        return (
            <Slide appear={false} direction="down" in={!trigger}>
                {children}
            </Slide>
        );
    }

    HideOnScroll.propTypes = {
        children: PropTypes.element.isRequired,
        /**
         * Injected by the documentation to work in an iframe.
         * You won't need it on your project.
         */
        window: PropTypes.func,
    };
    const classes = useStyles();
    function refresh_(){

//        window.location.reload(false);
//        this.state = this.state ;
    }
    return (
        <HideOnScroll {...props}>
            <AppBar className={props.class_} position={props.appBarPos} color={'transparent'} elevation={0}>
                <Toolbar>
                    <Paper component="form" className={classes.root}>
                        <IconButton onClick={props.drawer_} className={props.menu_btn_} aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <InputBase
                            className={classes.input}
                            placeholder="Search Kabeers Notes"
                            inputProps={{'aria-label': 'Search Kabeers Notes'}}
                        />
                        <Divider className={classes.divider} orientation="vertical"/>
                        <IconButton onClick={()=>{
                            rerender_()
                        }} color="primary" className={classes.iconButton} aria-label="directions">
                            <Sync/>
                        </IconButton>
                    </Paper>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
}
