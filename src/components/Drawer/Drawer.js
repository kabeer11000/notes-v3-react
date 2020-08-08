import {createMuiTheme, makeStyles, useTheme} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {Settings} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Hidden from "@material-ui/core/Hidden";


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
}));


function Drawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    export const drawer =
        <div>
            <div className="d-inline-flex" className={classes.logo_container}>
                <img src="assets/icons/kabeersnetwork.svg" className={classes.logo_img} alt='Kabeers Network Logo'/>
                <span className={classes.logo_text}>&nbsp; Kabeers Network</span>
            </div>
            <Divider/>
            <List>
                <ListItem button>
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
        </div>;
    return (<nav className={classes.drawer} aria-label="mailbox folders">
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
    </nav>);


}
