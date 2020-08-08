import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {Add, Close, Mic, MicOff, Save} from '@material-ui/icons';
import Slide from '@material-ui/core/Slide';
import Fab from "@material-ui/core/Fab";
import uniqid from "../../js/utils/uniqid";
import saveNote from "../../js/main/save-notes";
import {refresh_} from "../Box/Box";
import {saveDraft} from "../../js/utils/local/draft";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import PropTypes from "prop-types";
import record from "../../js/utils/record/record";
import getPredictiveText from "../../js/utils/ui/predictiveText";
import ChatBox from "../ChatBox/ChatBox";
import {useSnackbar} from 'notistack';

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
    const [title, setTitle] = React.useState('Add New');
    const [chars, setChars] = React.useState('0');
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    let note_s = {};
    note_s.textarea = undefined;
    note_s.smartCompose = [];
    const handleChange = (event) => {/*
        if ((event.target.value.split(/\n/g)[0].match(/\n/g)||[]).length){
            event.target.value = `-${event.target.value.split(/\n/g)[0]}`;
        }*/
        note_s.textarea = event.target.value;
        //document.getElementById('c_').innerHTML = `${note_s.textarea.length} / 1600`
    };
    const handleClickOpen = (m = true) => {
        if (localStorage.getItem('draft')) {
            note_s.textarea = localStorage.getItem('draft');
//            handleChange({target:{value:localStorage.getItem('draft')}});
        }
        setOpen(m);
    };
    //const {Component} = React;
    const textAreaCompRefs = React.createRef();
    const handleValChange = (v) => {
        console.log(v);
        //document.getElementById('note-textarea').value = v;
        note_s.textarea = v;
        textAreaCompRefs.current.logMic(v);
    };
    /*    getPredictiveText().then((x)=>{
            note_s.smartCompose = x;
        });
    */
    const initSmartCompose = () => {
        let smartCompose_settings = undefined;
        const setSmartCompose = () => {
            null == localStorage.getItem("smartcompose") ? localStorage.setItem("smartcompose", JSON.stringify("true")) : (smartCompose_settings = JSON.parse(JSON.parse(localStorage.getItem("smartcompose"))));
        };
        setSmartCompose();
        if (smartCompose_settings) {
            getPredictiveText().then(() => {

            });

        }
    };

    async function updateChars(v) {
        setChars(v);
    }

    //const [btnOnclick, setbtnOnclick] = React.useState(speech_recog.micOn);
    let speech_recog = {
        noteContent: '',
        recognition: record(handleValChange),
        micOn: function (e) {
            e.target.onClick = speech_recog.micOff;
            speech_recog.recognition.start();
            // setbtnOnclick(speech_recog.micOff);
        },
        micOff: function (e) {

//            chatBoxElement_.logMic('sex');
//            console.log(e.target.parentNode);
//            e.target.onClick = speech_recog.micOn;
            // setbtnOnclick(speech_recog.micOn);
            speech_recog.recognition.stop();
        }
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
                enqueueSnackbar('Note Saved!');
            });
        }else{
            console.log('Empty Note Discarded');
            handleClickOpen(false);
            enqueueSnackbar('Empty Note Discarded')
        }
    };
    const handleClose = () => {
        if (note_s.textarea !== undefined || null) {
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

    function setTitleFunc(v) {
        setTitle(v);
    }

    function logSmartCompose(v, state_) {
        document.getElementById('note-textarea').value = v;
        note_s.textarea = v;
        console.log(state_);
        document.getElementById('c_').innerHTML = `${note_s.textarea.length} / 1600`
    }

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
                        <Typography variant="h6" className={`${classes.title} text-truncate`}>
                            {title}
                        </Typography>
                        <IconButton autoFocus color="inherit" onClick={speech_recog.micOff}>
                            <MicOff/>
                        </IconButton>
                        <IconButton autoFocus color="inherit" onClick={speech_recog.micOn}>
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

                            <ChatBox ref={textAreaCompRefs}
                                     callback={logSmartCompose} titleSet={setTitleFunc} chars={updateChars}/>

                            <div class="bg-light px-2 py-1 position-fixed charar_c" id="c_"
                                 style={{right: '0rem', bottom: '1rem', opacity: '70%'}}>
                                {chars} / 1600
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

                                haystack={note_s.smartCompose}
                                onChange={(e)=>{setValue(e.currentTarget.value)}}
                                value={value}
                                onMatch={v => console.log(v)}
                                ignoreCase={true}


<AutoComplete
      id="simple-autocomplete-3"
      label="Inline Autocomplete"
      placeholder="Apple"
      data={fruits}
      autoComplete="inline"
    />
    npm install --save-dev node-sass
                            <textarea
                                value={note_s.textarea}
                                onChange={handleChange}
                                maxLength="1600"
                                id={'note-textarea'}
                                className="form-control textarea main-textarea char-counter"
                                placeholder="Create a new note by typing or using voice recognition."
                                data-autosuggest_index="1"/>
                                */
