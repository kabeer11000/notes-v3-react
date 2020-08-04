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
import {Close, Add, Save, Mic} from '@material-ui/icons';
import Slide from '@material-ui/core/Slide';
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import uniqid from "../../js/utils/uniqid";
import saveNote from "../../js/main/save-notes";
import {refresh_} from "../Box/Box";
import {getDraft, saveDraft} from "../../js/utils/local/draft";
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
export default function FullScreenDialog() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('Controlled');
    let note_s = {};
    note_s.textarea = undefined;

    const handleChange = (event) => {/*
        if ((event.target.value.split(/\n/g)[0].match(/\n/g)||[]).length){
            event.target.value = `-${event.target.value.split(/\n/g)[0]}`;
        }*/
        note_s.textarea = event.target.value;
        document.getElementById('c_').innerHTML = `${note_s.textarea.length} / 1600`
    };
    const handleClickOpen = (m = true) => {
        if (localStorage.getItem('draft')){
            note_s.textarea = localStorage.getItem('draft');
//            handleChange({target:{value:localStorage.getItem('draft')}});
        }
        setOpen(m);
    };
    const handleSave = () => {
        let noteContentJSON = {
            content: note_s.textarea,
            uniqid: uniqid(),
        };
        if (note_s.textarea.length) {
            saveNote(new Date().toLocaleString(), noteContentJSON, () => {
                console.log('Fuck u donna');
                handleClickOpen(false);
            });
        }else{
            console.log('Empty Note Discarded');
            handleClickOpen(false);
        }
    };
    const handleClose = () => {
        if (note_s.textarea.length) {
            saveDraft(note_s.textarea).then(()=>{
                setOpen(false);
            });
        }else{
            setOpen(false);
        }
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
                <div className="fab-btn_k">
                    <Fab variant="extended" color={"primary"}
                         onClick={handleClickOpen}>
                        <Add className={classes.extendedIcon}/>
                        New
                    </Fab>
                </div>
            </HideOnScroll>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <Close/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Add New
                        </Typography>
                        <IconButton autoFocus color="inherit" onClick={handleSave}>
                            <Mic/>
                        </IconButton>
                        <IconButton autoFocus color="inherit" onClick={handleSave}>
                            <Save/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12 px-0">
                            <textarea
                                value={note_s.textarea}
                                onChange={handleChange}
                                maxLength="1600"
                                id="note-textarea"
                                className="form-control textarea main-textarea char-counter"
                                placeholder="Create a new note by typing or using voice recognition."
                                data-autosuggest_index="1"/>
                                <div class="bg-light px-2 py-1 position-fixed charar_c" id="c_" style={{right:'0rem', bottom:'1rem', opacity: '70%'}}>
                                    0 / 1600
                                </div>
                        </div>
                    </div>
                </div>
            </Dialog>
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
