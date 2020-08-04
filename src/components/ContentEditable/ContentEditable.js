import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {Close, Mic, Save} from '@material-ui/icons';
import Slide from '@material-ui/core/Slide';
import saveNote from "../../js/main/save-notes";
import {refresh_} from "../Box/Box";
import {saveDraft} from "../../js/utils/local/draft";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import PropTypes from "prop-types";

export default function ContentEditable(props) {
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

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    //const [value, setValue] = React.useState('Controlled');
    let note_s = {};
    note_s.textarea = props.content;
    note_s.date = props.date;
    note_s.uniqid = props.uniqid;

    const handleChange = (event) => {
        note_s.textarea = event.target.value;
        document.getElementById('c_').innerHTML = `${note_s.textarea.length} / 1600`
    };
    const handleClickOpen = (m = true) => {
        setOpen(m);
    };
    const handleSave = () => {
        let noteContentJSON = {
            content: note_s.textarea,
            uniqid: note_s.uniqid,
        };
        if (note_s.textarea.length) {
            saveNote(note_s.date, noteContentJSON, () => {
                console.log('Fuck u donna');
                handleClickOpen(false);
            });
        } else {
            console.log('Empty Note Discarded');
            handleClickOpen(false);
        }
    };
    const handleClose = () => {
        if (note_s.textarea.length) {
            saveDraft(note_s.textarea).then(() => {
                setOpen(false);
            });
        } else {
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
                            <div class="bg-light px-2 py-1 position-fixed charar_c" id="c_"
                                 style={{right: '0rem', bottom: '1rem', opacity: '70%'}}>
                                0 / 1600
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
