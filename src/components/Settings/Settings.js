import React from 'react';
import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {AccountCircle, ArrowBack, BubbleChart, Delete, Feedback, OpenInNew} from '@material-ui/icons';
import Slide from '@material-ui/core/Slide';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";
import saveSmartComposeSettings from "../../js/utils/local/saveSmartComposeSettings";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FactoryResetDialogDemo from "./FactoryResetDialog";
import Divider from "@material-ui/core/Divider";
import {useSnackbar} from 'notistack';
import store from "store";
import Redirect from "react-router-dom/es/Redirect";


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
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    input1: {
        height: '100rem'
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function reseize_k(e) {
    e.target.addEventListener('keydown', autosize);

}

function autosize() {
    var el = this;
    setTimeout(function () {
        el.style.cssText = 'height:auto; padding:0';
        // for box-sizing other than "content-box" use:
        // el.style.cssText = '-moz-box-sizing:content-box';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
    }, 0);
}

export default function SettingsComponent(props) {
    const classes = useStyles();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('Controlled');
//    const button = JSON.parse(JSON.parse(localStorage.getItem('smartcompose')));
    const [buttons, setButtons] = React.useState({
        smartCompose: JSON.parse(JSON.parse(localStorage.getItem('smartcompose')))
    });
    let note_s = {};

    const handleChange = (event) => {
        note_s.textarea = event.target.value;
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    if (props.open) {
        handleClickOpen()
    }
    const handleClose = () => {
        setOpen(false);
    };
    const changeTextBox = (v) => {
        console.log(v)
    };

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
            <AppBar className={classes.appBar} color={"primary"}>
                <Toolbar color={'primary'}>
                    <IconButton component={'Link'} to={'/'} edge="start" color="inherit" onClick={handleClose}
                                aria-label="close">
                        <ArrowBack/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Settings
                    </Typography>
                </Toolbar>
            </AppBar>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12 px-0">
                        <List subheader={<ListSubheader>General</ListSubheader>} className={classes.root}>
                            <ListItem>
                                <ListItemIcon>
                                    <AccountCircle/>
                                </ListItemIcon>
                                <ListItemText id="switch-list-label-bluetooth" primary="Account"/>
                                <ListItemSecondaryAction>
                                    <IconButton component={'Link'} to={'/account'}>
                                        <OpenInNew/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <BubbleChart/>
                                </ListItemIcon>
                                <ListItemText id="switch-list-label-wifi" primary="Smart Compose ©"/>
                                <ListItemSecondaryAction>
                                    <FormControlLabel
                                        control={<Checkbox id={'cbx'} checked={buttons.smartCompose} name="checkedC"
                                                           onChange={(e) => {
                                                               saveSmartComposeSettings('cbx').then(() => {
                                                                   setButtons({smartCompose: !buttons.smartCompose});
                                                               });
                                                               enqueueSnackbar('Settings Saved');
                                                           }} edge="end"/>} label={''}/>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Delete/>
                                </ListItemIcon>
                                <ListItemText id="switch-list-label-bluetooth" primary="Factory Reset"/>
                                <ListItemSecondaryAction>
                                    <FactoryResetDialogDemo/>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider/>
                        </List>
                        <List subheader={<ListSubheader>FeedBack & Kabeers Network</ListSubheader>}
                              className={classes.root}>
                            <ListItem component={'a'} href={'mailto:kabeersnetwork@gmail.com'} target={'_blank'}>
                                <ListItemIcon>
                                    <Feedback/>
                                </ListItemIcon>
                                <ListItemText style={{color: '#757575'}} id="switch-list-label-bluetooth"
                                              primary="Send FeedBack"/>
                                <ListItemSecondaryAction>
                                    <IconButton>
                                        <OpenInNew/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </div>
                </div>
            </div>
        </div>
    );
}

/*                            <textarea
                                onFocus={(e)=>{reseize_k(e)}}
                                maxLength="1600"
                                id="note-textarea"
                                className="form-control textarea main-textarea char-counter"
                                placeholder="Create a new note by typing or using voice recognition."
                                data-autosuggest_index="1"/>
*/
