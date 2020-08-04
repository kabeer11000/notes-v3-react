import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {Bluetooth, Close, Save, Wifi} from '@material-ui/icons';
import Slide from '@material-ui/core/Slide';
import uniqid from "../../js/utils/uniqid";
import saveNote from "../../js/main/save-notes";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";

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
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('Controlled');
    let note_s = {};

    const handleChange = (event) => {
        note_s.textarea = event.target.value;
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    if (props.open){
        handleClickOpen()
    }
    const handleSave = () => {
        let noteContentJSON = {
            content: note_s.textarea,
            uniqid: uniqid()
        };
        saveNote(new Date().toLocaleString(), noteContentJSON).then(() => {
            console.log('Fuck u donna');
        })

    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <Close/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Add New
                        </Typography>
                        <IconButton autoFocus color="inherit" onClick={handleSave}>
                            <Save/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12 px-0">
                            <List subheader={<ListSubheader>Settings</ListSubheader>} className={classes.root}>
                                <ListItem>
                                    <ListItemIcon>
                                        <Wifi/>
                                    </ListItemIcon>
                                    <ListItemText id="switch-list-label-wifi" primary="Wi-Fi"/>
                                    <ListItemSecondaryAction>
                                        <Switch
                                            edge="end"
                                            checked={true}
                                            inputProps={{'aria-labelledby': 'switch-list-label-wifi'}}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Bluetooth/>
                                    </ListItemIcon>
                                    <ListItemText id="switch-list-label-bluetooth" primary="Bluetooth"/>
                                    <ListItemSecondaryAction>
                                        <Switch
                                            edge="end"
                                            checked={false}
                                            inputProps={{'aria-labelledby': 'switch-list-label-bluetooth'}}
                                        />
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
