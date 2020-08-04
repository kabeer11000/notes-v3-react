import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {Close, Add, Save, Mic, ArrowDropDown, ArrowBack} from '@material-ui/icons';
import Slide from '@material-ui/core/Slide';
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import uniqid from "../../js/utils/uniqid";
import saveTodo from "../../js/main/save-todos";
import DialogActions from "@material-ui/core/DialogActions";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Menu from "@material-ui/core/Menu";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import PropTypes from "prop-types";

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
    todo_title: {
        width: '100%',
    },
    todo_body: {
        width: '100%',
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function ToDoDialog() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('Controlled');
    const [anchorEl, setAnchorEl] = React.useState(null);


    const menu_handleClose = () => {
        setAnchorEl(null);
    };
    let label_ = undefined;
    let note_s = {};
    note_s.body_ = undefined;
    note_s.title = undefined;

    const menu_handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const addTitle = event=>{
        console.log(event.target.value);
        note_s.title = event.target.value;
    };
    const addBody = (event) => {
        note_s.body_ = event.target.value;
        document.getElementById('c_').innerHTML = `${note_s.body_.length} / 1600`
    };
    const handleClickOpen = (m = true) => {
        setOpen(m);
    };
    const addLabel = (v)=>{
        label_  = v;
        setAnchorEl(null);
    };
    const handleSave = () => {
        if (note_s.title && note_s.title.length) {
                let todo = {
                    body: note_s.body_,
                    title: note_s.title,
                    label: 'label_',
                };
                saveTodo(todo, () => {
                    console.log('Fuck u donna');
                    handleClickOpen(false);
                });
        }else{
            console.log('Empty Note Discarded');
            handleClickOpen(false);
        }
    };

    const handleClose = () => {
/*        if (note_s.textarea.length) {
            saveDraft(note_s.textarea).then(()=>{
                setOpen(false);
            });
        }else{

        }*/
        setOpen(false);
    };
    function HideOnScroll(props) {
        const {children, window} = props;
        // Note that you normally won't need to set the window ref as useScrollTrigger
        // will default to window.
        // This is only being set here because the demo is in an iframe.
        const trigger = useScrollTrigger({target: window ? window() : undefined});

        return (
            <Slide appear={false} direction="left" in={!trigger}>
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

    return (
        <div>
            <HideOnScroll>
            <div class="fab-btn_k">
                <Fab variant="extended" color={"#AAA"}
                     onClick={handleClickOpen}>
                    <Add className={classes.extendedIcon}/>
                    New
                </Fab>
            </div>
            </HideOnScroll>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <DialogTitle id="responsive-dialog-title">
                    <IconButton>
                        <ArrowBack/>
                    </IconButton>
                    {"Add New Todo"}
                </DialogTitle>
            <DialogContent>

                <DialogContentText style={{overflow: 'hidden'}}>
                <iframe id='todo_iframe' className={'d-none'}/>
                <form target='todo_iframe'>
                    <div className="container-fluid" style={{overflow: 'hidden'}}>
                        <div className="row" style={{overflow: 'hidden'}}>
                            <div className="col-md-12 px-0" style={{overflow: 'hidden'}}>
                                <label class="my-1">Todo Title</label>
                                <TextField maxLength={20} className={classes.todo_title} required onChange={addTitle} value={note_s.title}
                                           id="outlined-basic_" label="Title" variant="filled"/>
                            </div>
                            <div className="col-md-12 px-0 mt-5">
                                <label class="my-1">Todo Content</label>
                                <TextField className={classes.todo_body} maxLength={500} value={note_s.body_}
                                           id="outlined-basic" label="Todo Content" variant="filled" rowsMax={8} rows={8} multiline
                                           onChange={addBody}/>
                                <div className="bg-light px-2 py-1 position-fixed charar_c" id="c_"
                                     style={{right: '0rem', bottom: '3rem', opacity: '70%'}}>
                                    0 / 1600
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <div style={{position:'fixed', left:'1rem'}}>
                    <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={menu_handleClick}>
                        <ArrowDropDown/>
                    </IconButton>
                </div>
                <Menu
                    id="simple-menu"
                    value= {note_s.label}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={menu_handleClose}
                >
                    <MenuItem onClick={()=>{addLabel(0)}}>Important</MenuItem>
                    <MenuItem onClick={()=>{addLabel(1)}}>Starred</MenuItem>
                    <MenuItem onClick={()=>{addLabel(2)}}>Normal</MenuItem>
                </Menu>
                <Button autoFocus onClick={handleClose} color="primary">
                    Discard
                </Button>
                <Button onClick={handleSave} color="primary" autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
