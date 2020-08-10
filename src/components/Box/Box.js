import React, {useEffect} from 'react';
import './Box.css';
import Paper from '@material-ui/core/Paper';
import getFromServer from "../../js/utils/server/get-from-server";
import speak from "../../js/utils/speech/speak";
import IconButton from "@material-ui/core/IconButton";
import {Delete, VolumeUp} from '@material-ui/icons';
import {deleteNote} from "../../js/utils/server/delete-from-server";
import {makeStyles} from "@material-ui/core/styles";
import ContentEditable from "../ContentEditable/ContentEditable";
import {user_id} from '../../js/utils/init/user_id';
import {useDialog} from 'muibox'
import Typography from "@material-ui/core/Typography";

let notesPromise = getFromServer(user_id);

function showDialog__() {
}

export default function Box(props) {
    const useStyles = makeStyles((theme) => ({
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        }
    }));
    const classes = useStyles;
    const [state, setState] = React.useState({
        preloader: 'd-block',
        showContentEditable: false,
    });

    const dialog = useDialog();
    const [notes, setNotes] = React.useState('');
    const contentEditable_paper = (e) => {
        e.contentEditable = true;
        console.log(e.closest('.note-heading'));
//    e.closest('h4').remove();
        /*
            document.getElementById(`#${e}`).contentEditable=true;
            document.getElementById(`#${e}`).closest('h3').remove();
        */
    };
    useEffect(() => {

        console.log(user_id);
        renderPosts()
    }, []);
    const listen_note = (c) => {
        speak(c, () => {
        })
    };


    const delete_note = (d) => {
        deleteNote(d.date, user_id, d.noteId);
        document.getElementById(`note_${d.noteId}`).remove();
        //console.log(d.e.target.parentNode.parentNode.parentNode.parentNode.closest('.col-md-4').remove())
//        document.querySelector(`#${d.noteId}`).remove();
    };
    const showPrompt = (d) => {
        const header = (<span className="note-focus-dialog-header">
            <span className="d-none id">{d.uniqid}</span>
            <IconButton onClick={() => {
                listen_note(d.title + '\n' + d.body)
            }} color={'primary'}>
                <VolumeUp/>
            </IconButton>
            <IconButton color={'primary'} onClick={(e) => {
                delete_note({date: d.date, noteId: d.uniqid, e: e})
            }}>
                <Delete/>
            </IconButton>
        </span>);

        const config = {
            title: <div className={'k-dialog-body-title text-truncate'}>{d.title} <span><Typography
                variant={'subtitle2'} className={'text-muted'}><small>{d.date}{header}</small></Typography></span>
            </div> || 'Nothing Here!',
            message: <div className={'k-dialog-body-inner'}>{d.body}</div> || 'Nothing Here!',
            cancel: "Cancel",
            continue: "Save",
            nested: true,
            ok: {
                text: 'Close',
                color: 'primary'
            },
            callback: function () {

            }
        };
        dialog.alert(config)
//        Prompt.ask("view-note", config);
    };


    const c_e_helper = (note) => {
        /*
        this.setState({
            showContentEditable: true,
        });

         */
        //render(ContentEditable({content: note.content, date: note.date, uniqid: note.uniqid}));
    };

    //   classes = useStyles();
    async function renderPosts() {
        try {
            let posts = await notesPromise;
            //let posts = [{"date":"8\/3\/2020, 1:51:33 PM","content":"Registered Sex Offender","uniqid":"5f27d0158fdf3c","user_id":"123456"},{"date":"8\/3\/2020, 2:11:41 PM","content":"localStorage.getItem(&#039;draft&#039;)","uniqid":"5f27d4cdf74bc8","user_id":"123456"}];
            // this will re render the view with new data
            if (posts.length) {
                setNotes((prevState) => posts.map((note, i) => {
                    let nc = note.content;
                    let heading = note.content.split('\n')[0]; // lines is an array of strings
                    let body = note.content.substring(heading.length);

                    return (
                        <div key={i} className={'col-md-4 p-0 m-0'} id={`note_${note.uniqid}`}>
                            <Paper onDoubleClick={() => {
                                return (<ContentEditable content={nc} date={note.date} uniqid={note.uniqid}/>);
                            }}
                                   className={"mb-3 mr-2 ml-1 text-body p-0 text-break " + note.uniqid}>
                                <p className="header d-flex p-0 justify-content-around">
                                    <span className="d-none id">{note.uniqid}</span>
                                    <span className="date p-3">{note.date}</span>
                                    <IconButton onClick={() => {
                                        listen_note(heading + '\n' + body)
                                        }} color={'primary'}>
                                            <VolumeUp/>
                                        </IconButton>
                                        <IconButton color={'primary'} onClick={(e) => {
                                            delete_note({date: note.date, noteId: note.uniqid, e: e})
                                        }}>
                                            <Delete/>
                                        </IconButton>
                                    </p>
                                <div class="note-inner p-2 m-3 text-break" id={note.uniqid} onClick={() => {
                                    showPrompt({title: heading, body: body, date: note.date, uniqid: note.uniqid})
                                }}>
                                    <h4 class="note-heading text-break">{heading}</h4>
                                    <div class="note-content text-break pb-3">{body}</div>
                                </div>

                            </Paper>
                        </div>
                    )
                }));
            } else {
                let x =
                    <div className={'w-100 h-100'}>
                        <div className={"d-flex justify-content-center"}>
                            <div square style={{marginTop: '15vh', backgroundColor: 'transparent'}}
                                 className={"d-flex justify-content-center rounded-circle"} elevation={0}>
                                <img style={{width: '10rem', opacity: '80%'}} src={'assets/icons/ic_launcher.png'}/>
                            </div>
                        </div>
                        <div className={'text-center text-muted'}>Notes Will Appear Here!</div>
                    </div>;
                setNotes((x));
            }
        } catch (err) {
            console.log(err);
        }
        setState({preloader: 'd-none'})
    }

    return (
        <div class="container-fluid px-1">
            <div class="row">
                <div style={{marginTop: '8rem'}} className={` preload_spinner ${state.preloader}`}>
                    <div className={'d-flex justify-content-center'}>
                        <svg className="spinner_" width="65px" height="65px" viewBox="0 0 66 66"
                             xmlns="http://www.w3.org/2000/svg">
                            <circle className="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33"
                                    cy="33" r="30"/>
                        </svg>
                    </div>
                </div>
                {notes}
            </div>
        </div>
    );
}

function refresh_() {
}

Box.propTypes = {};

Box.defaultProps = {};

