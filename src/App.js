import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Typography from '@material-ui/core/Typography';
import {createMuiTheme, makeStyles, MuiThemeProvider, useTheme} from '@material-ui/core/styles';
import Box from "./components/Box/Box";
import FullScreenDialog from "./components/addNewComponent/addNewComponent";
import CustomizedInputBase from "./components/searchbar/searchbar";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import BottomNavigation from "@material-ui/core/BottomNavigation";

import {InsertDriveFile, ListAlt, Settings} from "@material-ui/icons";
import Todos from "./components/Todos/Todos";
import ToDoAddNew from "./components/ToDoAddNew/ToDoAddNew";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import init from "./js/utils/init/init";


const drawerWidth = 240;
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
init(() => {
});
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(0),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1.5),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        margin: theme.spacing(1.5)
    },
    logo_img: {
        height: 'auto',
        width: theme.spacing(3),
    },
    logo_container: {
        alignItems: 'baseline',
        fontSize: theme.spacing(2.25),
        marginLeft: theme.spacing(2.5),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    logo_text: {
        paddingRight: theme.spacing(1)
    }
}));

function App(props) {
    const {window} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [BNav_value, BNav_setValue] = React.useState(0);
    const BNav_handleChange = (event, newValue) => {
        BNav_setValue(newValue);
    };

    function handleChange() {

    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    /*            <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
    */
    const drawer = (
        <Router>
            <div>
                <div className="d-inline-flex" className={classes.logo_container}>
                    <img src="assets/icons/kabeersnetwork.svg" className={classes.logo_img} alt='Kabeers Network Logo'/>
                    <span className={classes.logo_text}>&nbsp; Kabeers Network</span>
                </div>
                <Divider/>
                <List>
                    <ListItem button to={'/settings'}>
                        <ListItemIcon><Settings/></ListItemIcon>
                        <ListItemText primary={'Settings'}/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>

                <Divider/>
                <List>
                    <ListItem button>
                        <Typography muted small>
                            <div class="text-muted small">&copy; Kabeers Network</div>
                        </Typography>
                    </ListItem>
                </List>
            </div>
        </Router>
    );
    const container = window !== undefined ? () => window().document.body : undefined;
    const [value, setValue] = React.useState('recents');

    const handleChange1 = (event, newValue) => {
        setValue(newValue);
    };

    function HideOnScroll(props) {
        const {children, window} = props;
        // Note that you normally won't need to set the window ref as useScrollTrigger
        // will default to window.
        // This is only being set here because the demo is in an iframe.
        const trigger = useScrollTrigger({target: window ? window() : undefined});

        return (
            <Slide appear={false} direction="up" in={!trigger}>
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

    function Render_m(props) {
        if (!props.v) {
            return (<div><Box/><FullScreenDialog/></div>);
        } else {
            return (<div_><Todos/><ToDoAddNew/></div_>);
        }
    }

    console.log(BNav_value);

    return (

        <Router>
            <Switch>
                <MuiThemeProvider theme={theme_}>
                    <div className={classes.root}>
                        <CssBaseline/>
                        <Route path="/">
                            <CustomizedInputBase appBarPos={"fixed"} class_={classes.appBar}
                                                 drawer_={handleDrawerToggle}
                                                 menu_btn_={classes.menuButton}/>
                            <nav className={classes.drawer} aria-label="mailbox folders">
                                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                                <Hidden smUp implementation="css">
                                    <Drawer
                                        container={container}
                                        variant="temporary"
                                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                        open={mobileOpen}
                                        onClose={handleDrawerToggle}
                                        classes={{
                                            paper: classes.drawerPaper,
                                        }}
                                        ModalProps={{
                                            keepMounted: true, // Better open performance on mobile.
                                        }}
                                    >
                                        {drawer}
                                    </Drawer>
                                </Hidden>
                                <Hidden xsDown implementation="css">
                                    <Drawer
                                        classes={{
                                            paper: classes.drawerPaper,
                                        }}
                                        variant="permanent"
                                        open
                                    >
                                        {drawer}
                                    </Drawer>
                                </Hidden>
                            </nav>
                        </Route>
                        <main className={classes.content}>
                            <Route path="/">
                                <div className={classes.toolbar}/>
                                <Render_m v={!!+BNav_value}/>

                                <HideOnScroll {...props}>
                                    <AppBar position="fixed" color="primary"
                                            style={{top: "auto", bottom: 0, width: '100%',}}>
                                        <BottomNavigation value={BNav_value} onChange={BNav_handleChange}>
                                            <BottomNavigationAction label="Notes" icon={<InsertDriveFile/>}/>
                                            <BottomNavigationAction label="Todo" icon={<ListAlt/>}/>
                                        </BottomNavigation>
                                    </AppBar>
                                </HideOnScroll>
                            </Route>
                        </main>
                    </div>
                </MuiThemeProvider>
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
