import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Box from "../Box/Box";
import FullScreenDialog from "../addNewComponent/addNewComponent";
import CustomizedInputBase from "../searchbar/searchbar";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import {InsertDriveFile, ListAlt, Settings} from "@material-ui/icons";
import Todos from "../Todos/Todos";
import ToDoAddNew from "../ToDoAddNew/ToDoAddNew";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import init from "../../js/utils/init/init";
import Drawer from "@material-ui/core/Drawer";
import {Link} from "react-router-dom";
import store from "store";
import Redirect from "react-router-dom/es/Redirect";

const drawerWidth = 240;
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

function MainComponent(props) {
    const {window} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [BNav_value, BNav_setValue] = React.useState(0);
    const [Refresh_, Refresh_setValue] = React.useState('');
    const BNav_handleChange = (event, newValue) => {
        BNav_setValue(newValue);
    };

    function handleChange() {

    }

    const PullToRefresh_ = () => {
        setMobileOpen(false);
    };

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
        <div>
            <div className="d-inline-flex" className={classes.logo_container}>
                <img src="assets/icons/kabeersnetwork.svg" className={classes.logo_img} alt='Kabeers Network Logo'/>
                <span className={classes.logo_text}>&nbsp; Kabeers Network</span>
            </div>
            <Divider/>
            <List>
                <ListItem button component={Link} to={'/settings'} color={"primary"}>
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
    );
    const container = window !== undefined ? () => window().document.body : undefined;
    const [value, setValue] = React.useState('recents');

    const handleChange1 = (event, newValue) => {
        setValue(newValue);
    };

    function HideOnScroll(props) {
        const {children, window} = props;
        const trigger = useScrollTrigger({target: window ? window() : undefined});
        return (
            <Slide appear={false} direction="up" in={!trigger}>
                {children}
            </Slide>
        );
    }

    HideOnScroll.propTypes = {
        children: PropTypes.element.isRequired,
        window: PropTypes.func,
    };

    function Render_m(props) {
        if (!props.v) {
            return (<div><Box/><FullScreenDialog/>
                <div className={'d-none'}>{props.refresh}</div>
            </div>);
        } else {
            return (<div_><Todos/><ToDoAddNew/>
                <div className={'d-none'}>{props.refresh}</div>
            </div_>);
        }
    }

    function IsLoggedIn() {
        if (!store.get('loggedIn')) {
            return <Redirect to={'/login'}/>;
        } else {
            return <div/>;
        }
    }

    return (

        <div>
            <IsLoggedIn/>
            <div className={classes.root}>
                <CssBaseline/>
                <CustomizedInputBase context_={BNav_value} appBarPos={"fixed"} class_={classes.appBar}
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
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Render_m v={!!+BNav_value} refresh={Refresh_}/>
                    <HideOnScroll {...props}>
                        <AppBar color="primary"
                                style={{position: 'fixed', top: "auto", bottom: 0, width: '100%',}} component={'div'}>
                            <BottomNavigation value={BNav_value} onChange={BNav_handleChange}>
                                <BottomNavigationAction label="Notes" icon={<InsertDriveFile/>}/>
                                <BottomNavigationAction label="Todo" icon={<ListAlt/>}/>
                            </BottomNavigation>
                        </AppBar>
                    </HideOnScroll>
                </main>
            </div>
        </div>
    );
}

MainComponent.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};
/*                    <ReactPullToRefresh
                        onRefresh={() => {
                            Refresh_setValue('2');
                            console.log('Refreshed')
                        }}
                        className="your-own-class-if-you-want"
                    >
                    <Render_m v={!!+BNav_value} refresh={Refresh_}/>
                    </ReactPullToRefresh>
*/
export default MainComponent;
